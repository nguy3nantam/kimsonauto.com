import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Briefcase, 
  Mail, 
  Phone, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ShieldCheck, 
  UserCheck, 
  RefreshCw,
  Eye
} from 'lucide-react';
import { api } from '../../services/api';

export const UNIT_OPTIONS = [
  'VF Biên Hòa',
  'VF Bửu Long',
  'VF Trảng Dài',
  'VF Long Thành',
  'VF Long Khánh',
  'VF Tân Hiệp',
  'VF Bình Thạnh',
  'VF GF Q2'
];

export const DEPARTMENT_OPTIONS = [
  'Kinh Doanh',
  'Dịch Vụ',
  'Kế Toán',
  'Nhân Sự',
  'Marketing'
];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterUnit, setFilterUnit] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    unit: 'VF Biên Hòa',
    department: 'Kinh Doanh',
    email: '',
    phone: '',
    role: 'Thành Viên',
    status: 'active'
  });
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setFormData({
      fullName: '',
      username: '',
      password: '',
      unit: 'VF Biên Hòa',
      department: 'Kinh Doanh',
      email: '',
      phone: '',
      role: 'Thành Viên',
      status: 'active'
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName || user.name || '',
      username: user.username || '',
      password: '',
      unit: user.unit || 'VF Biên Hòa',
      department: user.department || 'Kinh Doanh',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'Thành Viên',
      status: user.status || 'active'
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null);
    setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitting(true);

    try {
      if (editingUser) {
        // Update user
        const updatePayload = {
          fullName: formData.fullName,
          name: formData.fullName,
          unit: formData.unit,
          department: formData.department,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          status: formData.status
        };
        if (formData.password) {
          updatePayload.password = formData.password;
        }
        await api.updateUser(editingUser.id, updatePayload);
      } else {
        // Create user
        if (!formData.username || !formData.fullName) {
          throw new Error('Vui lòng nhập họ tên và tên tài khoản');
        }
        if (!formData.password) {
          throw new Error('Vui lòng nhập mật khẩu khởi tạo');
        }
        await api.createUser({
          ...formData,
          name: formData.fullName
        });
      }

      handleCloseModal();
      loadUsers();
    } catch (err) {
      setFormError(err.message || 'Thao tác không thành công');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (user) => {
    if (user.id === '1') {
      alert('Không thể xóa Quản Trị Viên Mặc Định của hệ thống!');
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa thành viên "${user.fullName || user.name}"?`)) {
      try {
        await api.deleteUser(user.id);
        loadUsers();
      } catch (err) {
        alert('Lỗi khi xóa người dùng: ' + err.message);
      }
    }
  };

  // Filter logic
  const filteredUsers = users.filter((u) => {
    const matchesUnit = filterUnit === 'all' || u.unit === filterUnit;
    const matchesDept = filterDepartment === 'all' || u.department === filterDepartment;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (u.fullName && u.fullName.toLowerCase().includes(q)) ||
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.username && u.username.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q)) ||
      (u.unit && u.unit.toLowerCase().includes(q)) ||
      (u.department && u.department.toLowerCase().includes(q));

    return matchesUnit && matchesDept && matchesSearch;
  });

  // Calculate stats
  const deptCounts = DEPARTMENT_OPTIONS.reduce((acc, dept) => {
    acc[dept] = users.filter((u) => u.department === dept).length;
    return acc;
  }, {});

  const unitCounts = UNIT_OPTIONS.reduce((acc, unit) => {
    acc[unit] = users.filter((u) => u.unit === unit).length;
    return acc;
  }, {});

  // Department color helper
  const getDeptBadgeClass = (dept) => {
    switch (dept) {
      case 'Kinh Doanh':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Dịch Vụ':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Kế Toán':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Nhân Sự':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Marketing':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Quản Lý Người Đăng Ký Hệ Thống
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              {users.length} thành viên
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Theo dõi và phân quyền danh sách đăng ký theo 8 Đơn Vị và 5 Bộ Phận trực thuộc Kim Sơn
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadUsers}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-primary hover:border-primary transition-colors shadow-xs"
            title="Tải lại danh sách"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-xs font-bold rounded-xl shadow-glow transition-all"
          >
            <Plus size={16} />
            <span>Thêm Thành Viên Mới</span>
          </button>
        </div>
      </div>

      {/* KPI Distribution Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {DEPARTMENT_OPTIONS.map((dept) => {
          const count = deptCounts[dept] || 0;
          return (
            <div 
              key={dept} 
              onClick={() => setFilterDepartment(filterDepartment === dept ? 'all' : dept)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                filterDepartment === dept 
                  ? 'bg-slate-900 text-white border-slate-800 shadow-md ring-2 ring-primary/40' 
                  : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${filterDepartment === dept ? 'text-primary-light' : 'text-slate-400'}`}>
                  Bộ phận
                </span>
                <Briefcase size={14} className={filterDepartment === dept ? 'text-primary-light' : 'text-slate-400'} />
              </div>
              <div className={`text-xl font-black tracking-tight ${filterDepartment === dept ? 'text-white' : 'text-slate-900'}`}>
                {count}
              </div>
              <div className={`text-xs font-bold mt-0.5 truncate ${filterDepartment === dept ? 'text-slate-200' : 'text-slate-700'}`}>
                {dept}
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo họ tên, tài khoản, email, số điện thoại..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary text-slate-800 transition-colors"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          {/* Đơn Vị Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 w-full sm:w-auto">
            <Building2 size={14} className="text-slate-400 shrink-0" />
            <select
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer w-full"
            >
              <option value="all">Tất cả đơn vị ({users.length})</option>
              {UNIT_OPTIONS.map((u) => (
                <option key={u} value={u}>
                  {u} ({unitCounts[u] || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Bộ Phận Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 w-full sm:w-auto">
            <Briefcase size={14} className="text-slate-400 shrink-0" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer w-full"
            >
              <option value="all">Tất cả bộ phận</option>
              {DEPARTMENT_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d} ({deptCounts[d] || 0})
                </option>
              ))}
            </select>
          </div>

          {(filterUnit !== 'all' || filterDepartment !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setFilterUnit('all');
                setFilterDepartment('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-primary hover:underline px-2 py-1"
            >
              Đặt lại
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100 font-bold">
              <tr>
                <th className="py-3 px-5">Họ và Tên / Tài Khoản</th>
                <th className="py-3 px-5">Đơn Vị</th>
                <th className="py-3 px-5">Bộ Phận</th>
                <th className="py-3 px-5">Liên Hệ (Email / SĐT)</th>
                <th className="py-3 px-5">Vai Trò</th>
                <th className="py-3 px-5">Ngày Đăng Ký</th>
                <th className="py-3 px-5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-primary" />
                    Đang tải danh sách người đăng ký...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    Không tìm thấy thành viên nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isDefaultAdmin = user.id === '1';
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name & Username */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-xs ${
                            isDefaultAdmin 
                              ? 'bg-gradient-to-br from-primary to-primary-dark text-white' 
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {(user.fullName || user.name || user.username || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{user.fullName || user.name}</span>
                              {isDefaultAdmin && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-primary/10 text-primary border border-primary/20">
                                  ADMIN
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Đơn Vị */}
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                          <Building2 size={13} className="text-primary" />
                          <span>{user.unit || 'Chưa thiết lập'}</span>
                        </span>
                      </td>

                      {/* Bộ Phận */}
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${getDeptBadgeClass(user.department)}`}>
                          <Briefcase size={13} />
                          <span>{user.department || 'Chưa thiết lập'}</span>
                        </span>
                      </td>

                      {/* Email / Phone */}
                      <td className="py-3.5 px-5 font-mono text-[11px]">
                        {user.email ? (
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Mail size={12} className="text-slate-400 shrink-0" />
                            <a href={`mailto:${user.email}`} className="hover:text-primary hover:underline truncate max-w-[180px]">
                              {user.email}
                            </a>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Chưa có email</span>
                        )}
                        {user.phone && (
                          <div className="flex items-center gap-1.5 text-slate-500 mt-0.5">
                            <Phone size={12} className="text-slate-400 shrink-0" />
                            <a href={`tel:${user.phone}`} className="hover:text-primary">
                              {user.phone}
                            </a>
                          </div>
                        )}
                      </td>

                      {/* Vai Trò */}
                      <td className="py-3.5 px-5">
                        <span className="text-xs font-semibold text-slate-700">
                          {user.role || 'Thành Viên'}
                        </span>
                      </td>

                      {/* Ngày Tạo */}
                      <td className="py-3.5 px-5 text-slate-500 text-[11px] whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          <span>
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Mặc định'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(user)}
                            className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                            title="Chỉnh sửa thông tin"
                          >
                            <Edit3 size={15} />
                          </button>

                          {!isDefaultAdmin && (
                            <button
                              onClick={() => handleDelete(user)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Xóa người dùng"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit User */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingUser ? 'Chỉnh Sửa Người Đăng Ký' : 'Thêm Người Dùng Mới'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingUser ? `Cập nhật thông tin tài khoản @${editingUser.username}` : 'Khởi tạo tài khoản và phân quyền đơn vị, bộ phận'}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleFormSubmit} className="p-5 sm:p-6 space-y-4">
              {formError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Họ và Tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>

              {/* Unit & Department Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Đơn Vị <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary cursor-pointer"
                    >
                      {UNIT_OPTIONS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Bộ Phận <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary cursor-pointer"
                    >
                      {DEPARTMENT_OPTIONS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@kimsonauto.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Số Điện Thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0908 xxx xxx"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Username & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tên Tài Khoản {editingUser ? '' : <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    disabled={!!editingUser}
                    required={!editingUser}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="ten.nguoidung"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {editingUser ? 'Mật Khẩu Mới (để trống nếu không đổi)' : 'Mật Khẩu Khởi Tạo'} {!editingUser && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="password"
                    required={!editingUser}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingUser ? '••••••••' : 'Nhập mật khẩu'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Role & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Vai Trò Phân Quyền
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="Thành Viên">Thành Viên</option>
                    <option value="Nhân Viên">Nhân Viên</option>
                    <option value="Trưởng Bộ Phận">Trưởng Bộ Phận</option>
                    <option value="Quản Trị Viên">Quản Trị Viên</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Trạng Thái Hoạt Động
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="active">Hoạt động (Active)</option>
                    <option value="inactive">Tạm khóa (Inactive)</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-xs font-bold shadow-glow transition-all disabled:opacity-50"
                >
                  {formSubmitting ? 'Đang lưu...' : editingUser ? 'Cập Nhật Thành Viên' : 'Tạo Thành Viên'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
