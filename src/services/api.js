import { DEMO_CREDENTIALS, DEMO_SEED } from './demoData';

// API client for Kim Sơn Backend
const BASE_URL = '';
const DEMO_STORAGE_KEY = 'kimson_static_demo_store_v1';

const clone = (data) => JSON.parse(JSON.stringify(data));
const isBrowser = typeof window !== 'undefined';

export function isStaticDemoMode() {
  if (!isBrowser) return false;
  const { hostname, protocol } = window.location;
  const normalizedHost = String(hostname || '').toLowerCase();
  const isGitHubPagesHost = normalizedHost === 'github.io' || normalizedHost.endsWith('.github.io');
  return protocol === 'file:' || isGitHubPagesHost;
}

const normalizeRole = (role) => {
  if (!role) return 'User';
  const value = String(role).trim().toLowerCase();
  if (['admin', 'super admin', 'quản trị viên', 'quan tri vien'].includes(value)) return 'Admin';
  if (['leader', 'trưởng bộ phận', 'truong bo phan', 'trưởng phòng', 'truong phong', 'quản lý'].includes(value)) return 'Leader';
  return 'User';
};

const normStr = (value) => (value ? String(value).trim().toLowerCase() : '');

const serializeStore = (store) => {
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn('Could not persist static demo data:', error);
  }
};

const loadStore = () => {
  if (!isBrowser) return clone(DEMO_SEED);

  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.warn('Could not read static demo data:', error);
  }

  const seed = clone(DEMO_SEED);
  serializeStore(seed);
  return seed;
};

const saveStore = (store) => {
  serializeStore(store);
  return clone(store);
};

const buildToken = (userId) => `demo_${Date.now()}_${userId}`;
const buildId = (prefix = 'item') => `${prefix}_${Date.now()}`;

const sanitizeUser = (user) => {
  const { password: _password, ...userProfile } = user;
  return {
    ...userProfile,
    role: normalizeRole(userProfile.role),
    fullName: userProfile.fullName || userProfile.name || userProfile.username,
  };
};

const parseQueryLike = (params = '') => {
  if (!params) return new URLSearchParams();
  if (params instanceof URLSearchParams) return params;
  if (typeof params === 'string') {
    return new URLSearchParams(params.startsWith('?') ? params.slice(1) : params);
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') searchParams.set(key, value);
  });
  return searchParams;
};

const getStats = (store) => {
  const pendingContacts = store.contacts.filter((item) => item.status === 'pending').length;
  return {
    totalPillars: store.pillars.length,
    totalBranches: store.branches.length,
    totalNews: store.news.length,
    totalContacts: store.contacts.length,
    pendingContacts,
    totalUsers: store.users.length,
    totalEngineers: store.settings.totalEngineers || 0,
    totalCustomers: store.settings.totalCustomers || 0,
    satisfactionRate: store.settings.satisfactionRate || '0%',
  };
};

const getUsersForQuery = (store, params = {}) => {
  const query = parseQueryLike(params);
  const requesterRole = query.get('requesterRole');
  const requesterUnit = query.get('requesterUnit');
  const requesterDepartment = query.get('requesterDepartment');
  const unit = query.get('unit');
  const department = query.get('department');
  const search = query.get('search');

  let users = store.users.map(sanitizeUser);

  if (requesterRole === 'Leader') {
    if (requesterUnit) {
      users = users.filter((item) => normStr(item.unit) === normStr(requesterUnit));
    }
    if (requesterDepartment) {
      users = users.filter((item) => normStr(item.department) === normStr(requesterDepartment));
    }
  }

  if (unit && unit !== 'all') {
    users = users.filter((item) => normStr(item.unit) === normStr(unit));
  }

  if (department && department !== 'all') {
    users = users.filter((item) => normStr(item.department) === normStr(department));
  }

  if (search) {
    const queryText = search.toLowerCase();
    users = users.filter((item) =>
      [item.fullName, item.username, item.email, item.phone, item.unit, item.department]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(queryText))
    );
  }

  return users;
};

const demoApi = {
  login(credentials) {
    const { username, password } = credentials || {};
    const store = loadStore();
    const user = store.users.find((item) => item.username === username && item.password === password);
    if (!user) {
      throw new Error('Tài khoản hoặc mật khẩu không chính xác');
    }

    return {
      token: buildToken(user.id),
      user: sanitizeUser(user),
    };
  },

  register(userData) {
    const store = loadStore();
    const displayName = (userData?.fullName || userData?.name || '').trim();
    const username = (userData?.username || '').trim();
    const password = userData?.password || '';

    if (!username || !password || !displayName) {
      throw new Error('Vui lòng điền họ tên, tên tài khoản và mật khẩu');
    }

    if (store.users.some((item) => normStr(item.username) === normStr(username))) {
      throw new Error('Tên tài khoản này đã được sử dụng');
    }

    const newUser = {
      id: buildId('user'),
      fullName: displayName,
      name: displayName,
      unit: (userData?.unit || 'VF Biên Hòa').trim(),
      department: (userData?.department || 'Kinh Doanh').trim(),
      email: (userData?.email || '').trim(),
      phone: (userData?.phone || '').trim(),
      username,
      password,
      role: 'User',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    store.users.push(newUser);
    saveStore(store);

    return {
      token: buildToken(newUser.id),
      user: sanitizeUser(newUser),
      message: 'Đăng ký tài khoản thành công!',
    };
  },

  getMe() {
    const store = loadStore();
    return sanitizeUser(store.users[0]);
  },

  getUsers(params) {
    const store = loadStore();
    return getUsersForQuery(store, params);
  },

  createUser(data) {
    const store = loadStore();
    const displayName = (data?.fullName || data?.name || '').trim();
    const username = (data?.username || '').trim();
    const password = data?.password || '';

    if (!username || !password || !displayName) {
      throw new Error('Vui lòng điền họ tên, tên tài khoản và mật khẩu');
    }

    if (store.users.some((item) => normStr(item.username) === normStr(username))) {
      throw new Error('Tên tài khoản này đã tồn tại');
    }

    const isLeader = data?.requesterRole === 'Leader';
    const newUser = {
      id: buildId('user'),
      fullName: displayName,
      name: displayName,
      unit: ((isLeader ? data?.requesterUnit : data?.unit) || 'VF Biên Hòa').trim(),
      department: ((isLeader ? data?.requesterDepartment : data?.department) || 'Kinh Doanh').trim(),
      email: (data?.email || '').trim(),
      phone: (data?.phone || '').trim(),
      username,
      password,
      role: isLeader ? 'User' : normalizeRole(data?.role || 'User'),
      status: data?.status || 'active',
      createdAt: new Date().toISOString(),
    };

    store.users.push(newUser);
    saveStore(store);
    return sanitizeUser(newUser);
  },

  updateUser(id, data) {
    const store = loadStore();
    const index = store.users.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Không tìm thấy người dùng');

    const existing = store.users[index];
    const isLeader = data?.requesterRole === 'Leader';
    const isProtected = existing.id === '1' || existing.username === DEMO_CREDENTIALS.admin.username || normalizeRole(existing.role) === 'Admin';

    if (isLeader) {
      if (isProtected) throw new Error('Leader không thể chỉnh sửa tài khoản quản trị');
      if (
        (data?.requesterUnit && normStr(existing.unit) !== normStr(data.requesterUnit)) ||
        (data?.requesterDepartment && normStr(existing.department) !== normStr(data.requesterDepartment))
      ) {
        throw new Error('Bạn không có quyền chỉnh sửa thành viên ngoài phạm vi quản lý');
      }
    }

    const nextUser = {
      ...existing,
      ...data,
      fullName: (data?.fullName || data?.name || existing.fullName || existing.name || '').trim(),
      name: (data?.name || data?.fullName || existing.name || existing.fullName || '').trim(),
      unit: isLeader ? (data?.requesterUnit || existing.unit) : (data?.unit || existing.unit),
      department: isLeader ? (data?.requesterDepartment || existing.department) : (data?.department || existing.department),
      role: isLeader ? existing.role : normalizeRole(data?.role || existing.role),
      email: (data?.email ?? existing.email ?? '').trim(),
      phone: (data?.phone ?? existing.phone ?? '').trim(),
      username: (data?.username || existing.username).trim(),
      password: data?.password ? data.password : existing.password,
    };

    store.users[index] = nextUser;
    saveStore(store);
    return sanitizeUser(nextUser);
  },

  deleteUser(id, params) {
    const store = loadStore();
    const query = parseQueryLike(params);
    const index = store.users.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Không tìm thấy người dùng');

    const existing = store.users[index];
    const isProtected = existing.id === '1' || existing.username === DEMO_CREDENTIALS.admin.username || normalizeRole(existing.role) === 'Admin';
    if (isProtected) throw new Error('Không thể xóa tài khoản quản trị mặc định');

    if (query.get('requesterRole') === 'Leader') {
      if (
        normStr(existing.unit) !== normStr(query.get('requesterUnit')) ||
        normStr(existing.department) !== normStr(query.get('requesterDepartment'))
      ) {
        throw new Error('Bạn không có quyền xóa thành viên ngoài phạm vi quản lý');
      }
    }

    store.users.splice(index, 1);
    saveStore(store);
    return { success: true };
  },

  getStats() {
    return getStats(loadStore());
  },

  getPillars() {
    return loadStore().pillars;
  },

  updatePillar(id, data) {
    const store = loadStore();
    const index = store.pillars.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Pillar not found');
    store.pillars[index] = { ...store.pillars[index], ...data };
    saveStore(store);
    return store.pillars[index];
  },

  getBranches() {
    return loadStore().branches;
  },

  createBranch(data) {
    const store = loadStore();
    const branch = { id: buildId('branch'), ...data };
    store.branches.push(branch);
    saveStore(store);
    return branch;
  },

  updateBranch(id, data) {
    const store = loadStore();
    const index = store.branches.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Branch not found');
    store.branches[index] = { ...store.branches[index], ...data };
    saveStore(store);
    return store.branches[index];
  },

  deleteBranch(id) {
    const store = loadStore();
    store.branches = store.branches.filter((item) => item.id !== id);
    saveStore(store);
    return { success: true };
  },

  getNews() {
    return loadStore().news;
  },

  createNews(data) {
    const store = loadStore();
    const article = {
      id: buildId('news'),
      createdAt: new Date().toISOString(),
      status: 'published',
      ...data,
    };
    store.news.unshift(article);
    saveStore(store);
    return article;
  },

  updateNews(id, data) {
    const store = loadStore();
    const index = store.news.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('News not found');
    store.news[index] = { ...store.news[index], ...data };
    saveStore(store);
    return store.news[index];
  },

  deleteNews(id) {
    const store = loadStore();
    store.news = store.news.filter((item) => item.id !== id);
    saveStore(store);
    return { success: true };
  },

  getContacts() {
    return loadStore().contacts;
  },

  submitContact(data) {
    const store = loadStore();
    const contact = {
      id: buildId('lead'),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...data,
    };
    store.contacts.unshift(contact);
    saveStore(store);
    return contact;
  },

  updateContact(id, data) {
    const store = loadStore();
    const index = store.contacts.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Contact not found');
    store.contacts[index] = { ...store.contacts[index], ...data };
    saveStore(store);
    return store.contacts[index];
  },

  deleteContact(id) {
    const store = loadStore();
    store.contacts = store.contacts.filter((item) => item.id !== id);
    saveStore(store);
    return { success: true };
  },

  getAnnouncements() {
    return loadStore().announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createAnnouncement(data) {
    const store = loadStore();
    const announcement = {
      id: buildId('announcement'),
      createdAt: new Date().toISOString(),
      pinned: false,
      ...data,
    };
    store.announcements.unshift(announcement);
    saveStore(store);
    return announcement;
  },

  deleteAnnouncement(id) {
    const store = loadStore();
    store.announcements = store.announcements.filter((item) => item.id !== id);
    saveStore(store);
    return { success: true };
  },

  getSharedFiles() {
    return loadStore().sharedFiles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createSharedFile(data) {
    const store = loadStore();
    const file = {
      id: buildId('file'),
      createdAt: new Date().toISOString(),
      downloads: 0,
      ...data,
    };
    store.sharedFiles.unshift(file);
    saveStore(store);
    return file;
  },

  deleteSharedFile(id) {
    const store = loadStore();
    store.sharedFiles = store.sharedFiles.filter((item) => item.id !== id);
    saveStore(store);
    return { success: true };
  },

  getSliders(params = '') {
    const store = loadStore();
    const all = parseQueryLike(params).get('all') === 'true';
    const items = all ? store.sliders : store.sliders.filter((item) => item.active !== false);
    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  createSlider(data) {
    const store = loadStore();
    const slider = {
      id: buildId('slider'),
      createdAt: new Date().toISOString(),
      active: true,
      order: store.sliders.length + 1,
      ...data,
    };
    store.sliders.push(slider);
    saveStore(store);
    return slider;
  },

  updateSlider(id, data) {
    const store = loadStore();
    const index = store.sliders.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Slider not found');
    store.sliders[index] = { ...store.sliders[index], ...data };
    saveStore(store);
    return store.sliders[index];
  },

  deleteSlider(id) {
    const store = loadStore();
    store.sliders = store.sliders.filter((item) => item.id !== id);
    saveStore(store);
    return { success: true };
  },

  getSettings() {
    return loadStore().settings;
  },

  updateSettings(data) {
    const store = loadStore();
    store.settings = { ...store.settings, ...data };
    saveStore(store);
    return store.settings;
  },

  uploadImage(data) {
    const fileName = data?.name || `demo_asset_${Date.now()}.png`;
    return {
      url: data?.data || '',
      name: fileName,
    };
  },
};

export async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Lỗi máy chủ' }));
      throw Object.assign(new Error(err.error || `HTTP ${res.status}`), { status: res.status });
    }

    const data = await res.json();
    if (options.method && !['GET', 'HEAD'].includes(options.method.toUpperCase())) {
      const collection = endpoint.match(/^\/api\/(settings|pillars|branches|esg)(?:\/|\?|$)/)?.[1];
      if (collection) window.dispatchEvent(new CustomEvent('kimson-content-updated', { detail: collection }));
    }
    return data;
  } catch (error) {
    if (error.status !== 401) console.warn(`API call ${endpoint} failed:`, error.message);
    throw error;
  }
}

let currentUserRequest;
const getCurrentUser = () => {
  if (!currentUserRequest) {
    currentUserRequest = fetchApi('/api/auth/me').finally(() => { currentUserRequest = null; });
  }
  return currentUserRequest;
};

export const api = {
  // Auth
  login: async (credentials) => (
    isStaticDemoMode()
      ? demoApi.login(credentials)
      : fetchApi('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
  ),
  register: async (userData) => (
    isStaticDemoMode()
      ? demoApi.register(userData)
      : fetchApi('/api/auth/register', { method: 'POST', body: JSON.stringify(userData) })
  ),
  getMe: async () => (
    isStaticDemoMode()
      ? demoApi.getMe()
      : getCurrentUser()
  ),
  logout: async () => (
    isStaticDemoMode()
      ? { success: true }
      : fetchApi('/api/auth/logout', { method: 'POST' })
  ),

  // Users / Registrations
  getUsers: async (params = '') => {
    if (isStaticDemoMode()) return demoApi.getUsers(params);
    let query = '';
    if (typeof params === 'object' && params !== null) {
      const sp = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') sp.append(k, v);
      });
      const s = sp.toString();
      query = s ? `?${s}` : '';
    } else if (typeof params === 'string' && params) {
      query = params.startsWith('?') ? params : `?${params}`;
    }
    return fetchApi(`/api/users${query}`);
  },
  createUser: async (data) => (
    isStaticDemoMode()
      ? demoApi.createUser(data)
      : fetchApi('/api/users', { method: 'POST', body: JSON.stringify(data) })
  ),
  updateUser: async (id, data) => (
    isStaticDemoMode()
      ? demoApi.updateUser(id, data)
      : fetchApi(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  ),
  deleteUser: async (id, params = '') => {
    if (isStaticDemoMode()) return demoApi.deleteUser(id, params);
    let query = '';
    if (typeof params === 'object' && params !== null) {
      const sp = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') sp.append(k, v);
      });
      const s = sp.toString();
      query = s ? `?${s}` : '';
    } else if (typeof params === 'string' && params) {
      query = params.startsWith('?') ? params : `?${params}`;
    }
    return fetchApi(`/api/users/${id}${query}`, { method: 'DELETE' });
  },

  // Stats
  getStats: async () => (
    isStaticDemoMode()
      ? demoApi.getStats()
      : fetchApi('/api/stats')
  ),

  // Pillars
  getPillars: async () => (
    isStaticDemoMode()
      ? demoApi.getPillars()
      : fetchApi('/api/pillars')
  ),
  updatePillar: async (id, data) => (
    isStaticDemoMode()
      ? demoApi.updatePillar(id, data)
      : fetchApi(`/api/pillars/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  ),

  // Branches
  getBranches: async () => (
    isStaticDemoMode()
      ? demoApi.getBranches()
      : fetchApi('/api/branches')
  ),
  createBranch: async (data) => (
    isStaticDemoMode()
      ? demoApi.createBranch(data)
      : fetchApi('/api/branches', { method: 'POST', body: JSON.stringify(data) })
  ),
  updateBranch: async (id, data) => (
    isStaticDemoMode()
      ? demoApi.updateBranch(id, data)
      : fetchApi(`/api/branches/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  ),
  deleteBranch: async (id) => (
    isStaticDemoMode()
      ? demoApi.deleteBranch(id)
      : fetchApi(`/api/branches/${id}`, { method: 'DELETE' })
  ),

  // News
  getNews: async (all = false) => (
    isStaticDemoMode()
      ? demoApi.getNews()
      : fetchApi(`/api/news${all ? '?all=true' : ''}`)
  ),
  getArticle: async (id) => {
    if (isStaticDemoMode()) {
      const list = await demoApi.getNews();
      return list.find(n => String(n.id) === String(id)) || null;
    }
    return fetchApi(`/api/news/${encodeURIComponent(id)}`);
  },
  getEsg: () => fetchApi('/api/esg'),
  createNews: async (data) => (
    isStaticDemoMode()
      ? demoApi.createNews(data)
      : fetchApi('/api/news', { method: 'POST', body: JSON.stringify(data) })
  ),
  updateNews: async (id, data) => (
    isStaticDemoMode()
      ? demoApi.updateNews(id, data)
      : fetchApi(`/api/news/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  ),
  deleteNews: async (id) => (
    isStaticDemoMode()
      ? demoApi.deleteNews(id)
      : fetchApi(`/api/news/${id}`, { method: 'DELETE' })
  ),

  // Contacts
  getContacts: async () => (
    isStaticDemoMode()
      ? demoApi.getContacts()
      : fetchApi('/api/contacts')
  ),
  submitContact: async (data) => (
    isStaticDemoMode()
      ? demoApi.submitContact(data)
      : fetchApi('/api/contacts', { method: 'POST', body: JSON.stringify(data) })
  ),
  updateContact: async (id, data) => (
    isStaticDemoMode()
      ? demoApi.updateContact(id, data)
      : fetchApi(`/api/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  ),
  deleteContact: async (id) => (
    isStaticDemoMode()
      ? demoApi.deleteContact(id)
      : fetchApi(`/api/contacts/${id}`, { method: 'DELETE' })
  ),

  // Announcements (Thông Báo Nội Bộ)
  getAnnouncements: async (params = '') => (
    isStaticDemoMode()
      ? demoApi.getAnnouncements(params)
      : fetchApi(`/api/announcements${params ? `?${params}` : ''}`)
  ),
  createAnnouncement: async (data) => (
    isStaticDemoMode()
      ? demoApi.createAnnouncement(data)
      : fetchApi('/api/announcements', { method: 'POST', body: JSON.stringify(data) })
  ),
  deleteAnnouncement: async (id) => (
    isStaticDemoMode()
      ? demoApi.deleteAnnouncement(id)
      : fetchApi(`/api/announcements/${id}`, { method: 'DELETE' })
  ),

  // Shared Files (File Dùng Chung)
  getSharedFiles: async (params = '') => (
    isStaticDemoMode()
      ? demoApi.getSharedFiles(params)
      : fetchApi(`/api/shared-files${params ? `?${params}` : ''}`)
  ),
  createSharedFile: async (data) => (
    isStaticDemoMode()
      ? demoApi.createSharedFile(data)
      : fetchApi('/api/shared-files', { method: 'POST', body: JSON.stringify(data) })
  ),
  deleteSharedFile: async (id) => (
    isStaticDemoMode()
      ? demoApi.deleteSharedFile(id)
      : fetchApi(`/api/shared-files/${id}`, { method: 'DELETE' })
  ),

  // Sliders
  getSliders: async (params = '') => (
    isStaticDemoMode()
      ? demoApi.getSliders(params)
      : fetchApi(`/api/sliders${params ? `?${params}` : ''}`)
  ),
  reorderSliders: async (ids) => {
    if (isStaticDemoMode()) {
      const store = loadStore();
      ids.forEach((id, index) => {
        const item = store.sliders.find(s => s.id === id);
        if (item) item.order = index + 1;
      });
      saveStore(store);
      return { success: true };
    }
    return fetchApi('/api/sliders/reorder', { method: 'POST', body: JSON.stringify({ ids }) });
  },
  createSlider: async (data) => (
    isStaticDemoMode()
      ? demoApi.createSlider(data)
      : fetchApi('/api/sliders', { method: 'POST', body: JSON.stringify(data) })
  ),
  updateSlider: async (id, data) => (
    isStaticDemoMode()
      ? demoApi.updateSlider(id, data)
      : fetchApi(`/api/sliders/${id}`, { method: 'PUT', body: JSON.stringify(data) })
  ),
  deleteSlider: async (id) => (
    isStaticDemoMode()
      ? demoApi.deleteSlider(id)
      : fetchApi(`/api/sliders/${id}`, { method: 'DELETE' })
  ),

  // Settings & Branding
  getSettings: async () => (
    isStaticDemoMode()
      ? demoApi.getSettings()
      : fetchApi('/api/settings')
  ),
  updateSettings: async (data) => (
    isStaticDemoMode()
      ? demoApi.updateSettings(data)
      : fetchApi('/api/settings', { method: 'PUT', body: JSON.stringify(data) })
  ),
  uploadImage: async (data) => (
    isStaticDemoMode()
      ? demoApi.uploadImage(data)
      : fetchApi('/api/upload', { method: 'POST', body: JSON.stringify(data) })
  ),
};
