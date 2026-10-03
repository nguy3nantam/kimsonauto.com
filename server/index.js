import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { readData, writeData } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static uploads folder with caching
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir, { maxAge: '7d' }));

// Password Hashing Helper using native PBKDF2
const hashPassword = (password) => {
  if (!password) return '';
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `$pbkdf2$${salt}$${hash}`;
};

const verifyPassword = (inputPassword, storedPassword) => {
  if (!storedPassword || !inputPassword) return false;
  if (storedPassword.startsWith('$pbkdf2$')) {
    const [, , salt, hash] = storedPassword.split('$');
    const inputHash = crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512').toString('hex');
    return inputHash === hash;
  }
  // Backward compatibility with existing plain text passwords
  return storedPassword === inputPassword;
};

// ==========================================
// 1. AUTHENTICATION & ROLE MANAGEMENT API
// ==========================================
const normalizeRole = (role) => {
  if (!role) return 'User';
  const r = String(role).trim().toLowerCase();
  if (r === 'admin' || r === 'super admin' || r === 'quản trị viên' || r === 'quan tri vien') return 'Admin';
  if (r === 'leader' || r === 'trưởng bộ phận' || r === 'truong bo phan' || r === 'trưởng phòng' || r === 'truong phong' || r === 'quản lý') return 'Leader';
  return 'User';
};

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readData('users') || [];
  
  const userIndex = users.findIndex(u => u.username === username && verifyPassword(password, u.password));
  if (userIndex === -1) {
    return res.status(401).json({ error: 'Tài khoản hoặc mật khẩu không chính xác' });
  }

  const user = users[userIndex];
  if (user.status === 'inactive') {
    return res.status(403).json({ error: 'Tài khoản đã bị tạm khóa. Vui lòng liên hệ quản trị viên.' });
  }

  // Transparently migrate plaintext password to hashed format
  if (user.password && !user.password.startsWith('$pbkdf2$')) {
    users[userIndex].password = hashPassword(password);
    await writeData('users', users);
  }

  // Safe user profile with normalized role
  const role = normalizeRole(user.role);
  const { password: _, ...userProfile } = {
    ...user,
    role,
    fullName: user.fullName || user.name || user.username
  };

  res.json({
    token: `token_${Date.now()}_${user.id}`,
    user: userProfile
  });
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password, fullName, name, email, phone, unit, department } = req.body;
  const displayName = (fullName || name || '').trim();

  if (!username || !password || !displayName) {
    return res.status(400).json({ error: 'Vui lòng điền họ tên, tên tài khoản và mật khẩu' });
  }

  const users = await readData('users') || [];
  if (users.some(u => u.username.toLowerCase() === username.trim().toLowerCase())) {
    return res.status(400).json({ error: 'Tên tài khoản này đã được sử dụng' });
  }

  const newUser = {
    id: String(Date.now()),
    fullName: displayName,
    name: displayName,
    unit: (unit || 'VF Biên Hòa').trim(),
    department: (department || 'Kinh Doanh').trim(),
    email: (email || '').trim(),
    phone: (phone || '').trim(),
    username: username.trim(),
    password: hashPassword(password),
    role: 'User',
    status: 'active',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  await writeData('users', users);

  const { password: _, ...userProfile } = newUser;
  res.status(201).json({
    token: `token_${Date.now()}_${newUser.id}`,
    user: userProfile,
    message: 'Đăng ký tài khoản thành công!'
  });
});

app.get('/api/auth/me', async (req, res) => {
  const users = await readData('users') || [];
  if (users.length > 0) {
    const { password: _, ...userProfile } = users[0];
    return res.json({
      ...userProfile,
      role: normalizeRole(userProfile.role)
    });
  }
  res.status(404).json({ error: 'User not found' });
});

// ==========================================
// 1.1 USERS & REGISTRATIONS MANAGEMENT API
// ==========================================
const normStr = (s) => (s ? String(s).trim().toLowerCase() : '');

app.get('/api/users', async (req, res) => {
  const { unit, department, search, requesterRole, requesterUnit, requesterDepartment } = req.query;
  const users = await readData('users') || [];
  
  let filtered = users.map(({ password: _, ...u }) => ({
    ...u,
    fullName: u.fullName || u.name || u.username,
    role: normalizeRole(u.role),
    unit: u.unit || 'VF Biên Hòa',
    department: u.department || 'Kinh Doanh',
    status: u.status || 'active'
  }));

  // Leader permission restriction: can only view users in their unit and department
  if (requesterRole === 'Leader') {
    if (requesterUnit) {
      filtered = filtered.filter(u => normStr(u.unit) === normStr(requesterUnit));
    }
    if (requesterDepartment) {
      filtered = filtered.filter(u => normStr(u.department) === normStr(requesterDepartment));
    }
  }

  if (unit && unit !== 'all') {
    filtered = filtered.filter(u => normStr(u.unit) === normStr(unit));
  }

  if (department && department !== 'all') {
    filtered = filtered.filter(u => normStr(u.department) === normStr(department));
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(u => 
      (u.fullName && u.fullName.toLowerCase().includes(q)) ||
      (u.username && u.username.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q)) ||
      (u.unit && u.unit.toLowerCase().includes(q)) ||
      (u.department && u.department.toLowerCase().includes(q))
    );
  }

  res.json(filtered);
});

app.post('/api/users', async (req, res) => {
  const { username, password, fullName, name, email, phone, unit, department, role, status, requesterRole, requesterUnit, requesterDepartment } = req.body;
  const displayName = (fullName || name || '').trim();

  if (!username || !password || !displayName) {
    return res.status(400).json({ error: 'Vui lòng điền họ tên, tên tài khoản và mật khẩu' });
  }

  const users = await readData('users') || [];
  if (users.some(u => u.username.toLowerCase() === username.trim().toLowerCase())) {
    return res.status(400).json({ error: 'Tên tài khoản này đã tồn tại' });
  }

  let finalUnit = (unit || 'VF Biên Hòa').trim();
  let finalDepartment = (department || 'Kinh Doanh').trim();
  let finalRole = normalizeRole(role || 'User');

  // Enforce Leader scope restrictions
  if (requesterRole === 'Leader') {
    if (requesterUnit) finalUnit = requesterUnit;
    if (requesterDepartment) finalDepartment = requesterDepartment;
    finalRole = 'User'; // Leader can only create subordinate Users
  }

  const newUser = {
    id: String(Date.now()),
    fullName: displayName,
    name: displayName,
    unit: finalUnit,
    department: finalDepartment,
    email: (email || '').trim(),
    phone: (phone || '').trim(),
    username: username.trim(),
    password: hashPassword(password),
    role: finalRole,
    status: status || 'active',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  await writeData('users', users);

  const { password: _, ...userProfile } = newUser;
  res.status(201).json(userProfile);
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const users = await readData('users') || [];
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy người dùng' });
  }

  const existing = users[index];
  const { password, requesterRole, requesterUnit, requesterDepartment, ...updateData } = req.body;
  
  // Protect Admin account from being modified by Leader
  if (existing.id === '1' || existing.username === 'admin' || existing.role === 'Admin') {
    if (requesterRole && requesterRole !== 'Admin') {
      return res.status(403).json({ error: 'Bạn không có quyền chỉnh sửa tài khoản Quản Trị Viên' });
    }
  }

  // Leader restriction: can only modify users in their own branch and department
  if (requesterRole === 'Leader') {
    const leaderUnit = normStr(requesterUnit);
    const leaderDept = normStr(requesterDepartment);
    const userUnit = normStr(existing.unit);
    const userDept = normStr(existing.department);

    if ((leaderUnit && userUnit && leaderUnit !== userUnit) || 
        (leaderDept && userDept && leaderDept !== userDept)) {
      return res.status(403).json({ error: 'Bạn chỉ có quyền quản lý nhân viên thuộc chi nhánh và bộ phận của mình' });
    }
    // Leader cannot change user's unit or department or promote role
    if (requesterUnit) updateData.unit = requesterUnit;
    if (requesterDepartment) updateData.department = requesterDepartment;
    updateData.role = 'User';
  } else if (updateData.role) {
    updateData.role = normalizeRole(updateData.role);
  }

  users[index] = {
    ...existing,
    ...updateData,
    fullName: updateData.fullName || updateData.name || existing.fullName || existing.name,
    password: password ? (password.startsWith('$pbkdf2$') ? password : hashPassword(password)) : existing.password,
    updatedAt: new Date().toISOString()
  };

  await writeData('users', users);
  const { password: _, ...userProfile } = users[index];
  res.json(userProfile);
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { requesterRole, requesterUnit, requesterDepartment } = req.query;

  if (id === '1') {
    return res.status(403).json({ error: 'Không thể xóa tài khoản Quản Trị Viên Mặc Định' });
  }

  const users = await readData('users') || [];
  const targetUser = users.find(u => u.id === id);

  if (!targetUser) {
    return res.status(404).json({ error: 'Không tìm thấy người dùng' });
  }

  if (targetUser.username === 'admin' || targetUser.role === 'Admin') {
    return res.status(403).json({ error: 'Không thể xóa tài khoản Quản Trị Viên' });
  }

  // Leader restriction
  if (requesterRole === 'Leader') {
    const leaderUnit = normStr(requesterUnit);
    const leaderDept = normStr(requesterDepartment);
    const userUnit = normStr(targetUser.unit);
    const userDept = normStr(targetUser.department);

    if ((leaderUnit && userUnit && leaderUnit !== userUnit) || 
        (leaderDept && userDept && leaderDept !== userDept)) {
      return res.status(403).json({ error: 'Bạn chỉ có quyền xóa nhân viên thuộc chi nhánh và bộ phận của mình' });
    }
  }

  const filtered = users.filter(u => u.id !== id);
  await writeData('users', filtered);
  res.json({ message: 'Xóa người dùng thành công' });
});

// ==========================================
// 1.2 ANNOUNCEMENTS (THÔNG BÁO NỘI BỘ) API
// ==========================================
app.get('/api/announcements', async (req, res) => {
  const { category, department, unit, search } = req.query;
  let items = await readData('announcements') || [];

  if (category && category !== 'all') {
    items = items.filter(i => i.category === category);
  }
  if (department && department !== 'all') {
    items = items.filter(i => !i.targetDepartment || i.targetDepartment === 'all' || i.targetDepartment === department || i.targetDepartment === 'Tất Cả' || i.targetDepartment === 'Tất Cả Bộ Phận');
  }
  if (unit && unit !== 'all') {
    items = items.filter(i => !i.targetUnit || i.targetUnit === 'all' || i.targetUnit === unit || i.targetUnit === 'Tất Cả' || i.targetUnit === 'Tất Cả Đơn Vị');
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(i => 
      (i.title && i.title.toLowerCase().includes(q)) ||
      (i.content && i.content.toLowerCase().includes(q)) ||
      (i.author && i.author.toLowerCase().includes(q))
    );
  }

  res.json(items);
});

app.post('/api/announcements', async (req, res) => {
  const { title, content, category, priority, targetUnit, targetDepartment, author, pinned } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Vui lòng nhập tiêu đề và nội dung thông báo' });
  }

  const items = await readData('announcements') || [];
  const newItem = {
    id: String(Date.now()),
    title: title.trim(),
    content: content.trim(),
    category: category || 'Chính Sách & Quy Định',
    priority: priority || 'normal',
    targetUnit: targetUnit || 'Tất Cả Đơn Vị',
    targetDepartment: targetDepartment || 'Tất Cả Bộ Phận',
    author: author || 'Ban Điều Hành Kim Sơn',
    pinned: !!pinned,
    createdAt: new Date().toISOString()
  };

  items.unshift(newItem);
  await writeData('announcements', items);
  res.status(201).json(newItem);
});

app.delete('/api/announcements/:id', async (req, res) => {
  const { id } = req.params;
  const items = await readData('announcements') || [];
  const filtered = items.filter(i => i.id !== id);
  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'Không tìm thấy thông báo' });
  }
  await writeData('announcements', filtered);
  res.json({ message: 'Xóa thông báo thành công' });
});

// ==========================================
// 1.3 SHARED FILES (FILE DÙNG CHUNG) API
// ==========================================
app.get('/api/shared-files', async (req, res) => {
  const { category, department, search } = req.query;
  let items = await readData('shared-files') || [];

  if (category && category !== 'all') {
    items = items.filter(i => i.category === category);
  }
  if (department && department !== 'all') {
    items = items.filter(i => !i.targetDepartment || i.targetDepartment === 'all' || i.targetDepartment === department || i.targetDepartment === 'Tất Cả');
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(i => 
      (i.name && i.name.toLowerCase().includes(q)) ||
      (i.description && i.description.toLowerCase().includes(q)) ||
      (i.fileType && i.fileType.toLowerCase().includes(q))
    );
  }

  res.json(items);
});

app.post('/api/shared-files', async (req, res) => {
  const { name, description, category, fileSize, fileType, targetDepartment, uploadedBy } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Vui lòng nhập tên tài liệu' });
  }

  const items = await readData('shared-files') || [];
  const newItem = {
    id: String(Date.now()),
    name: name.trim(),
    description: (description || '').trim(),
    category: category || 'Biểu Mẫu Hành Chính',
    fileSize: fileSize || '1.0 MB',
    fileType: fileType || 'PDF',
    targetDepartment: targetDepartment || 'Tất Cả',
    uploadedBy: uploadedBy || 'Ban Quản Trị Kim Sơn',
    createdAt: new Date().toISOString(),
    downloads: 0
  };

  items.unshift(newItem);
  await writeData('shared-files', items);
  res.status(201).json(newItem);
});

app.delete('/api/shared-files/:id', async (req, res) => {
  const { id } = req.params;
  const items = await readData('shared-files') || [];
  const filtered = items.filter(i => i.id !== id);
  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'Không tìm thấy file tài liệu' });
  }
  await writeData('shared-files', filtered);
  res.json({ message: 'Xóa tài liệu thành công' });
});

// ==========================================
// 1.4 HOME SLIDERS API
// ==========================================
app.get('/api/sliders', async (req, res) => {
  const { all } = req.query;
  let items = await readData('sliders') || [];
  if (!all) {
    items = items.filter(s => s.active !== false);
  }
  items.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  res.json(items);
});

app.post('/api/sliders', async (req, res) => {
  const { title, subtitle, description, image, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink, order, active } = req.body;
  if (!title || !image) {
    return res.status(400).json({ error: 'Vui lòng nhập tiêu đề và link hình ảnh cho slider' });
  }

  const items = await readData('sliders') || [];
  const newItem = {
    id: String(Date.now()),
    title: title.trim(),
    subtitle: (subtitle || 'TẬP ĐOÀN HỆ SINH THÁI Ô TÔ KIM SƠN').trim(),
    description: (description || '').trim(),
    image: image.trim(),
    primaryButtonText: (primaryButtonText || 'Khám Phá Thêm').trim(),
    primaryButtonLink: (primaryButtonLink || '/mang-luoi').trim(),
    secondaryButtonText: (secondaryButtonText || 'Liên Hệ').trim(),
    secondaryButtonLink: (secondaryButtonLink || '/lien-he').trim(),
    order: Number(order) || (items.length + 1),
    active: active !== false,
    createdAt: new Date().toISOString()
  };

  items.push(newItem);
  await writeData('sliders', items);
  res.status(201).json(newItem);
});

app.put('/api/sliders/:id', async (req, res) => {
  const { id } = req.params;
  const items = await readData('sliders') || [];
  const index = items.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy slide' });
  }

  items[index] = {
    ...items[index],
    ...req.body,
    order: req.body.order !== undefined ? Number(req.body.order) : items[index].order,
    active: req.body.active !== undefined ? Boolean(req.body.active) : items[index].active,
    updatedAt: new Date().toISOString()
  };

  await writeData('sliders', items);
  res.json(items[index]);
});

app.delete('/api/sliders/:id', async (req, res) => {
  const { id } = req.params;
  const items = await readData('sliders') || [];
  const filtered = items.filter(s => s.id !== id);

  if (filtered.length === items.length) {
    return res.status(404).json({ error: 'Không tìm thấy slide' });
  }

  await writeData('sliders', filtered);
  res.json({ message: 'Xóa slide thành công' });
});

// ==========================================
// 2. DASHBOARD KPI STATS API
// ==========================================
app.get('/api/stats', async (req, res) => {
  const branches = await readData('branches') || [];
  const news = await readData('news') || [];
  const contacts = await readData('contacts') || [];
  const users = await readData('users') || [];
  const settings = await readData('settings') || {};

  const pendingContacts = contacts.filter(c => c.status === 'pending').length;

  res.json({
    totalBranches: branches.length,
    totalNews: news.length,
    totalContacts: contacts.length,
    totalUsers: users.length,
    pendingContacts,
    totalEngineers: settings.totalEngineers || 300,
    totalCustomers: settings.totalCustomers || 50000,
    satisfactionRate: settings.satisfactionRate || '99%'
  });
});

// ==========================================
// 4. BRANCHES (MẠNG LƯỚI CHI NHÁNH) API
// ==========================================
app.get('/api/branches', async (req, res) => {
  const data = await readData('branches') || [];
  res.json(data);
});

app.post('/api/branches', async (req, res) => {
  const branches = await readData('branches') || [];
  const newBranch = {
    id: `branch-${Date.now()}`,
    ...req.body
  };
  branches.push(newBranch);
  await writeData('branches', branches);
  res.status(201).json(newBranch);
});

app.put('/api/branches/:id', async (req, res) => {
  const { id } = req.params;
  const branches = await readData('branches') || [];
  const index = branches.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy chi nhánh này' });
  }

  branches[index] = { ...branches[index], ...req.body };
  await writeData('branches', branches);
  res.json(branches[index]);
});

app.delete('/api/branches/:id', async (req, res) => {
  const { id } = req.params;
  let branches = await readData('branches') || [];
  branches = branches.filter(b => b.id !== id);
  await writeData('branches', branches);
  res.json({ success: true, message: 'Đã xóa chi nhánh thành công' });
});

// ==========================================
// 5. NEWS & PRESS API
// ==========================================
app.get('/api/news', async (req, res) => {
  const data = await readData('news') || [];
  res.json(data);
});

app.post('/api/news', async (req, res) => {
  const news = await readData('news') || [];
  const newArticle = {
    id: String(Date.now()),
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '3 phút đọc',
    status: 'published',
    ...req.body
  };
  news.unshift(newArticle);
  await writeData('news', news);
  res.status(201).json(newArticle);
});

app.put('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  const news = await readData('news') || [];
  const index = news.findIndex(n => String(n.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy bài viết' });
  }

  news[index] = { ...news[index], ...req.body };
  await writeData('news', news);
  res.json(news[index]);
});

app.delete('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  let news = await readData('news') || [];
  news = news.filter(n => String(n.id) !== String(id));
  await writeData('news', news);
  res.json({ success: true, message: 'Đã xóa bài viết thành công' });
});

// ==========================================
// 6. CONTACTS & B2B LEADS API
// ==========================================
app.get('/api/contacts', async (req, res) => {
  const data = await readData('contacts') || [];
  res.json(data);
});

app.post('/api/contacts', async (req, res) => {
  const contacts = await readData('contacts') || [];
  const newLead = {
    id: `lead-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...req.body
  };
  contacts.unshift(newLead);
  await writeData('contacts', contacts);
  res.status(201).json({ success: true, lead: newLead });
});

app.put('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contacts = await readData('contacts') || [];
  const index = contacts.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy yêu cầu liên hệ' });
  }

  contacts[index] = { ...contacts[index], ...req.body };
  await writeData('contacts', contacts);
  res.json(contacts[index]);
});

app.delete('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  let contacts = await readData('contacts') || [];
  contacts = contacts.filter(c => c.id !== id);
  await writeData('contacts', contacts);
  res.json({ success: true, message: 'Đã xóa yêu cầu thành công' });
});

// ==========================================
// 7. ESG & SETTINGS API
// ==========================================
app.get('/api/esg', async (req, res) => {
  const data = await readData('esg') || [];
  res.json(data);
});

app.put('/api/esg/:id', async (req, res) => {
  const { id } = req.params;
  const esg = await readData('esg') || [];
  const index = esg.findIndex(e => e.id === id);
  if (index !== -1) {
    esg[index] = { ...esg[index], ...req.body };
    await writeData('esg', esg);
    return res.json(esg[index]);
  }
  res.status(404).json({ error: 'ESG record not found' });
});

app.get('/api/settings', async (req, res) => {
  const data = await readData('settings') || {};
  res.json(data);
});

app.put('/api/settings', async (req, res) => {
  let settings = await readData('settings') || {};
  settings = { ...settings, ...req.body };
  await writeData('settings', settings);
  res.json(settings);
});

// ==========================================
// 7.1 IMAGE UPLOAD (LOGO / FAVICON / ASSETS)
// ==========================================
app.post('/api/upload', async (req, res) => {
  try {
    const { name, data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Không tìm thấy dữ liệu hình ảnh' });
    }

    const matches = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    let buffer;
    let ext = '.png';
    if (matches && matches.length === 3) {
      buffer = Buffer.from(matches[2], 'base64');
      const mime = matches[1];
      if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
      else if (mime.includes('svg')) ext = '.svg';
      else if (mime.includes('x-icon') || mime.includes('ico') || mime.includes('icon')) ext = '.ico';
      else if (mime.includes('webp')) ext = '.webp';
    } else {
      buffer = Buffer.from(data, 'base64');
    }

    if (name && path.extname(name)) {
      ext = path.extname(name);
    }

    const cleanBaseName = name ? path.basename(name, ext).replace(/[^a-zA-Z0-9_-]/g, '_') : 'asset';
    const fileName = `${cleanBaseName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.promises.writeFile(filePath, buffer);
    res.json({ url: `/uploads/${fileName}`, name: fileName });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Lỗi tải ảnh lên: ' + err.message });
  }
});

// ==========================================
// 8. HEALTH CHECK
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// ==========================================
// 9. STATIC FILES SERVING & SPA FALLBACK
// ==========================================
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(distPath, 'index.html'));
});

// START SERVER
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Kim Sơn Ecosystem Server & Backend API running at http://localhost:${PORT}`);
});
