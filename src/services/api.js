// API client for Kim Sơn Backend
const BASE_URL = '';

export async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Lỗi máy chủ' }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`API call ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const api = {
  // Auth
  login: (credentials) => fetchApi('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => fetchApi('/api/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => fetchApi('/api/auth/me'),

  // Users / Registrations
  getUsers: (params = '') => fetchApi(`/api/users${params ? `?${params}` : ''}`),
  createUser: (data) => fetchApi('/api/users', { method: 'POST', body: JSON.stringify(data) }),
  updateUser: (id, data) => fetchApi(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: (id) => fetchApi(`/api/users/${id}`, { method: 'DELETE' }),

  // Stats
  getStats: () => fetchApi('/api/stats'),

  // Pillars
  getPillars: () => fetchApi('/api/pillars'),
  updatePillar: (id, data) => fetchApi(`/api/pillars/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Branches
  getBranches: () => fetchApi('/api/branches'),
  createBranch: (data) => fetchApi('/api/branches', { method: 'POST', body: JSON.stringify(data) }),
  updateBranch: (id, data) => fetchApi(`/api/branches/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBranch: (id) => fetchApi(`/api/branches/${id}`, { method: 'DELETE' }),

  // News
  getNews: () => fetchApi('/api/news'),
  createNews: (data) => fetchApi('/api/news', { method: 'POST', body: JSON.stringify(data) }),
  updateNews: (id, data) => fetchApi(`/api/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNews: (id) => fetchApi(`/api/news/${id}`, { method: 'DELETE' }),

  // Contacts
  getContacts: () => fetchApi('/api/contacts'),
  submitContact: (data) => fetchApi('/api/contacts', { method: 'POST', body: JSON.stringify(data) }),
  updateContact: (id, data) => fetchApi(`/api/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteContact: (id) => fetchApi(`/api/contacts/${id}`, { method: 'DELETE' }),

  // Settings
  getSettings: () => fetchApi('/api/settings'),
  updateSettings: (data) => fetchApi('/api/settings', { method: 'PUT', body: JSON.stringify(data) }),
};
