import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { readData, writeData } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

// ==========================================
// 1. AUTHENTICATION API
// ==========================================
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readData('users') || [];
  
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Tài khoản hoặc mật khẩu không chính xác' });
  }

  // Safe user profile without password
  const { password: _, ...userProfile } = user;
  res.json({
    token: `token_${Date.now()}_${user.id}`,
    user: userProfile
  });
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password, name, email, phone } = req.body;
  if (!username || !password || !name) {
    return res.status(400).json({ error: 'Vui lòng điền họ tên, tên tài khoản và mật khẩu' });
  }

  const users = await readData('users') || [];
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(400).json({ error: 'Tên tài khoản này đã được sử dụng' });
  }

  const newUser = {
    id: String(Date.now()),
    username: username.trim(),
    password,
    name: name.trim(),
    email: (email || '').trim(),
    phone: (phone || '').trim(),
    role: 'Partner / Client',
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
    return res.json(userProfile);
  }
  res.status(404).json({ error: 'User not found' });
});

// ==========================================
// 2. DASHBOARD KPI STATS API
// ==========================================
app.get('/api/stats', async (req, res) => {
  const pillars = await readData('pillars') || [];
  const branches = await readData('branches') || [];
  const news = await readData('news') || [];
  const contacts = await readData('contacts') || [];
  const settings = await readData('settings') || {};

  const pendingContacts = contacts.filter(c => c.status === 'pending').length;

  res.json({
    totalPillars: pillars.length,
    totalBranches: branches.length,
    totalNews: news.length,
    totalContacts: contacts.length,
    pendingContacts,
    totalEngineers: settings.totalEngineers || 300,
    totalCustomers: settings.totalCustomers || 50000,
    satisfactionRate: settings.satisfactionRate || '99%'
  });
});

// ==========================================
// 3. PILLARS (5 TRỤ CỘT HỆ SINH THÁI) API
// ==========================================
app.get('/api/pillars', async (req, res) => {
  const data = await readData('pillars') || [];
  res.json(data);
});

app.put('/api/pillars/:id', async (req, res) => {
  const { id } = req.params;
  const pillars = await readData('pillars') || [];
  const index = pillars.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy trụ cột này' });
  }

  pillars[index] = { ...pillars[index], ...req.body };
  await writeData('pillars', pillars);
  res.json(pillars[index]);
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
// 8. STATIC FILES SERVING & SPA FALLBACK
// ==========================================
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// START SERVER
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Kim Sơn Ecosystem Server & Backend API running at http://localhost:${PORT}`);
});
