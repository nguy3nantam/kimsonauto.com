import { useState, useEffect } from 'react';
import { 
  Bell, 
  FolderOpen, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Calendar, 
  User, 
  Building2, 
  Briefcase, 
  FileSpreadsheet, 
  FileArchive, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Pin,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/api';
import { UNIT_OPTIONS, DEPARTMENT_OPTIONS } from '../../data/orgOptions';

export default function AdminPortalHub() {
  const [activeTab, setActiveTab] = useState('announcements'); // 'announcements' | 'files'
  const [currentUser, setCurrentUser] = useState(null);

  // Announcements state
  const [announcements, setAnnouncements] = useState([]);
  const [announcementFilterDept, setAnnouncementFilterDept] = useState('all');
  const [announcementFilterCategory, setAnnouncementFilterCategory] = useState('all');
  const [announcementSearch, setAnnouncementSearch] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    category: 'Chính Sách & Quy Định',
    priority: 'normal',
    targetUnit: 'Tất Cả Đơn Vị',
    targetDepartment: 'Tất Cả Bộ Phận',
    pinned: false
  });

  // Shared Files state
  const [sharedFiles, setSharedFiles] = useState([]);
  const [fileFilterCategory, setFileFilterCategory] = useState('all');
  const [fileFilterType, setFileFilterType] = useState('all');
  const [fileSearch, setFileSearch] = useState('');
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [newFile, setNewFile] = useState({
    name: '',
    description: '',
    category: 'Biểu Mẫu Hành Chính',
    fileSize: '2.5 MB',
    fileType: 'PDF',
    targetDepartment: 'Tất Cả'
  });

  useEffect(() => {
    const userStr = localStorage.getItem('kimson_admin_user');
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Failed to parse current user:', e);
      }
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [annData, fileData] = await Promise.all([
        api.getAnnouncements().catch(() => []),
        api.getSharedFiles().catch(() => [])
      ]);
      setAnnouncements(annData);
      setSharedFiles(fileData);
    } catch (err) {
      console.error('Failed to load portal data:', err);
    }
  };

  const userRole = currentUser?.role || ((currentUser?.id === '1' || currentUser?.username === 'admin') ? 'Admin' : 'User');
  const isAdmin = userRole === 'Admin' || currentUser?.id === '1' || currentUser?.username === 'admin';
  const isLeader = userRole === 'Leader';
  const isUser = !isAdmin && !isLeader;
  const canCreate = isAdmin || isLeader;

  const canDeleteAnnouncement = (item) => {
    if (isAdmin) return true;
    if (isLeader) {
      return item.author === (currentUser?.fullName || currentUser?.name) ||
             item.targetUnit === currentUser?.unit ||
             item.targetDepartment === currentUser?.department;
    }
    return false;
  };

  const canDeleteFile = (item) => {
    if (isAdmin) return true;
    if (isLeader) {
      return item.uploadedBy === (currentUser?.fullName || currentUser?.name) ||
             item.targetDepartment === currentUser?.department;
    }
    return false;
  };

  // -------------------------------------------------------------
  // Announcements Handlers
  // -------------------------------------------------------------
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) {
      alert('Vui lòng điền đầy đủ tiêu đề và nội dung');
      return;
    }
    try {
      await api.createAnnouncement({
        ...newAnnouncement,
        targetUnit: isLeader ? (currentUser?.unit || 'VF Biên Hòa') : newAnnouncement.targetUnit,
        targetDepartment: isLeader ? (currentUser?.department || 'Kinh Doanh') : newAnnouncement.targetDepartment,
        author: currentUser?.fullName || currentUser?.name || (isLeader ? 'Leader Chi Nhánh' : 'Ban Quản Trị Kim Sơn')
      });
      setIsAnnouncementModalOpen(false);
      setNewAnnouncement({
        title: '',
        content: '',
        category: 'Chính Sách & Quy Định',
        priority: 'normal',
        targetUnit: isLeader ? (currentUser?.unit || 'VF Biên Hòa') : 'Tất Cả Đơn Vị',
        targetDepartment: isLeader ? (currentUser?.department || 'Kinh Doanh') : 'Tất Cả Bộ Phận',
        pinned: false
      });
      loadData();
    } catch (err) {
      alert('Lỗi tạo thông báo: ' + err.message);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
      try {
        await api.deleteAnnouncement(id);
        if (selectedAnnouncement?.id === id) setSelectedAnnouncement(null);
        loadData();
      } catch (err) {
        alert('Lỗi: ' + err.message);
      }
    }
  };

  // -------------------------------------------------------------
  // Shared Files Handlers
  // -------------------------------------------------------------
  const handleCreateSharedFile = async (e) => {
    e.preventDefault();
    if (!newFile.name) {
      alert('Vui lòng nhập tên file tài liệu');
      return;
    }
    try {
      await api.createSharedFile({
        ...newFile,
        targetDepartment: isLeader ? (currentUser?.department || 'Kinh Doanh') : newFile.targetDepartment,
        uploadedBy: currentUser?.fullName || currentUser?.name || (isLeader ? 'Leader Chi Nhánh' : 'Ban Quản Trị Kim Sơn')
      });
      setIsFileModalOpen(false);
      setNewFile({
        name: '',
        description: '',
        category: 'Biểu Mẫu Hành Chính',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        targetDepartment: isLeader ? (currentUser?.department || 'Kinh Doanh') : 'Tất Cả'
      });
      loadData();
    } catch (err) {
      alert('Lỗi thêm file: ' + err.message);
    }
  };

  const handleDeleteSharedFile = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa file dùng chung này?')) {
      try {
        await api.deleteSharedFile(id);
        loadData();
      } catch (err) {
        alert('Lỗi: ' + err.message);
      }
    }
  };

  const handleDownloadSimulation = (file) => {
    setDownloadSuccess(`Đang tải xuống: ${file.name}`);
    setTimeout(() => {
      setDownloadSuccess('');
    }, 3000);
  };

  // -------------------------------------------------------------
  // Filters
  // -------------------------------------------------------------
  const filteredAnnouncements = announcements.filter((item) => {
    const matchCat = announcementFilterCategory === 'all' || item.category === announcementFilterCategory;
    const matchDept = announcementFilterDept === 'all' || item.targetDepartment === 'all' || item.targetDepartment === 'Tất Cả Bộ Phận' || item.targetDepartment === announcementFilterDept;
    const q = announcementSearch.toLowerCase();
    const matchSearch = !announcementSearch || 
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.content && item.content.toLowerCase().includes(q)) ||
      (item.author && item.author.toLowerCase().includes(q));

    return matchCat && matchDept && matchSearch;
  });

  const filteredFiles = sharedFiles.filter((item) => {
    const matchCat = fileFilterCategory === 'all' || item.category === fileFilterCategory;
    const matchType = fileFilterType === 'all' || item.fileType === fileFilterType;
    const q = fileSearch.toLowerCase();
    const matchSearch = !fileSearch || 
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q));

    return matchCat && matchType && matchSearch;
  });

  const getFileIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'PDF':
        return <FileText className="text-red-500" size={28} />;
      case 'XLSX':
      case 'XLS':
        return <FileSpreadsheet className="text-emerald-500" size={28} />;
      case 'ZIP':
      case 'RAR':
        return <FileArchive className="text-primary" size={28} />;
      default:
        return <FileText className="text-blue-500" size={28} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Download Alert Notification */}
      {downloadSuccess && (
        <div className="fixed top-16 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold border border-emerald-400">
            <CheckCircle2 size={18} />
            <span>{downloadSuccess}</span>
          </div>
        </div>
      )}

      {/* User Welcome Banner with Unit & Department */}
      <div className="bg-gradient-to-r from-slate-900 via-secondary to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-[11px] font-bold tracking-wide">
              <Sparkles size={13} />
              <span>CỔNG THÔNG TIN NỘI BỘ • KIM SƠN AUTOMOBILES</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Xin chào, {currentUser?.fullName || currentUser?.name || 'Thành Viên'}!
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
                <Building2 size={14} className="text-primary-light" />
                <span>Đơn vị: <strong className="text-white">{currentUser?.unit || 'VF Biên Hòa'}</strong></span>
              </div>
              
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
                <Briefcase size={14} className="text-primary-light" />
                <span>Bộ phận: <strong className="text-white">{currentUser?.department || 'Kinh Doanh'}</strong></span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Vai trò: <strong className="text-white">{currentUser?.role || 'Thành Viên'}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-2xl font-black text-white">{announcements.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-300">Thông Báo</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-primary-light">{sharedFiles.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-300">File Tài Liệu</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Mode Tabs Switcher: Thông Báo vs File Dùng Chung */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'announcements'
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Bell size={17} />
            <span>Thông Báo Nội Bộ</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'announcements' ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-700'
            }`}>
              {announcements.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'files'
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <FolderOpen size={17} />
            <span>File Dùng Chung</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'files' ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-700'
            }`}>
              {sharedFiles.length}
            </span>
          </button>
        </div>

        {/* Action Button for Admins & Leaders */}
        {canCreate && (
          <div className="flex items-center gap-2">
            {activeTab === 'announcements' ? (
              <button
                onClick={() => setIsAnnouncementModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-xs font-bold rounded-xl shadow-glow transition-all"
              >
                <Plus size={16} />
                <span>{isLeader ? 'Đăng Thông Báo Chi Nhánh' : 'Đăng Thông Báo Mới'}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsFileModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-xs font-bold rounded-xl shadow-glow transition-all"
              >
                <Plus size={16} />
                <span>{isLeader ? 'Tải Lên Tệp Chi Nhánh' : 'Chia Sẻ File Tài Liệu Mới'}</span>
              </button>
            )}
          </div>
        )}

        {/* Read-only indicator for regular User */}
        {isUser && (
          <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Chế độ xem tài liệu & thông báo</span>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: THÔNG BÁO NỘI BỘ                               */}
      {/* ========================================================= */}
      {activeTab === 'announcements' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Filters & Search Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={announcementSearch}
                onChange={(e) => setAnnouncementSearch(e.target.value)}
                placeholder="Tìm kiếm thông báo theo tiêu đề, nội dung, người ban hành..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
                <Filter size={14} className="text-slate-400 shrink-0" />
                <select
                  value={announcementFilterCategory}
                  onChange={(e) => setAnnouncementFilterCategory(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">Tất cả chuyên mục</option>
                  <option value="Chính Sách & Quy Định">Chính Sách & Quy Định</option>
                  <option value="Vận Hành & Dịch Vụ">Vận Hành & Dịch Vụ</option>
                  <option value="Kinh Doanh & Bán Hàng">Kinh Doanh & Bán Hàng</option>
                  <option value="Khen Thưởng & Sự Kiện">Khen Thưởng & Sự Kiện</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
                <Briefcase size={14} className="text-slate-400 shrink-0" />
                <select
                  value={announcementFilterDept}
                  onChange={(e) => setAnnouncementFilterDept(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">Tất cả bộ phận</option>
                  {DEPARTMENT_OPTIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Announcements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAnnouncements.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200/90 p-8 text-slate-400">
                <Bell size={32} className="mx-auto mb-3 text-slate-300" />
                <p className="text-sm font-semibold">Chưa có thông báo nào phù hợp với bộ lọc hiện tại.</p>
              </div>
            ) : (
              filteredAnnouncements.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all hover:shadow-md flex flex-col justify-between ${
                    item.priority === 'urgent'
                      ? 'border-red-300 ring-1 ring-red-200/80 bg-red-50/10'
                      : item.priority === 'high'
                      ? 'border-primary/40'
                      : 'border-slate-200/90'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.pinned && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-primary/10 text-primary border border-primary/20">
                            <Pin size={11} className="rotate-45" />
                            <span>Ghim</span>
                          </span>
                        )}

                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.priority === 'urgent'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : item.priority === 'high'
                            ? 'bg-primary/10 text-primary border border-primary/30'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.priority === 'urgent' ? 'Khẩn Cấp' : item.priority === 'high' ? 'Quan Trọng' : 'Thông Thường'}
                        </span>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-subtle text-primary-dark border border-primary/30">
                          {item.category}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <Briefcase size={12} className="text-primary" />
                      <span>{item.targetDepartment || 'Toàn hệ thống'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedAnnouncement(item)}
                        className="px-3 py-1.5 rounded-lg bg-primary-subtle hover:bg-primary hover:text-white text-primary text-xs font-bold transition-all"
                      >
                        Đọc Chi Tiết →
                      </button>

                      {canDeleteAnnouncement(item) && (
                        <button
                          onClick={() => handleDeleteAnnouncement(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Xóa thông báo"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: FILE DÙNG CHUNG                                */}
      {/* ========================================================= */}
      {activeTab === 'files' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* File Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={fileSearch}
                onChange={(e) => setFileSearch(e.target.value)}
                placeholder="Tìm file theo tên tài liệu, nội dung tóm tắt..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
                <FolderOpen size={14} className="text-slate-400 shrink-0" />
                <select
                  value={fileFilterCategory}
                  onChange={(e) => setFileFilterCategory(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">Tất cả danh mục file</option>
                  <option value="Biểu Mẫu Hành Chính">Biểu Mẫu Hành Chính</option>
                  <option value="Catalog & Bảng Giá">Catalog & Bảng Giá</option>
                  <option value="Tài Liệu Kỹ Thuật">Tài Liệu Kỹ Thuật</option>
                  <option value="Hợp Đồng & Pháp Lý">Hợp Đồng & Pháp Lý</option>
                  <option value="Nhận Diện Thương Hiệu">Nhận Diện Thương Hiệu</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
                <FileText size={14} className="text-slate-400 shrink-0" />
                <select
                  value={fileFilterType}
                  onChange={(e) => setFileFilterType(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">Tất cả định dạng</option>
                  <option value="PDF">PDF Document</option>
                  <option value="DOCX">Word (.docx)</option>
                  <option value="XLSX">Excel (.xlsx)</option>
                  <option value="ZIP">Nén (.zip)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200/90 p-8 text-slate-400">
                <FolderOpen size={32} className="mx-auto mb-3 text-slate-300" />
                <p className="text-sm font-semibold">Chưa có file tài liệu nào trong danh mục này.</p>
              </div>
            ) : (
              filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Header Icon & Type */}
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-primary-subtle/50 transition-colors">
                        {getFileIcon(file.fileType)}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                          {file.fileType}
                        </span>
                        {canDeleteFile(file) && (
                          <button
                            onClick={() => handleDeleteSharedFile(file.id)}
                            className="p-1 text-slate-300 hover:text-red-600 rounded-md transition-colors"
                            title="Xóa tài liệu"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* File Title */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                        {file.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {file.description || 'Tài liệu nội bộ ban hành sử dụng chung.'}
                      </p>
                    </div>

                    {/* Category & Dept Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-primary-subtle text-primary-dark border border-primary/30">
                        {file.category}
                      </span>
                      {file.targetDepartment && file.targetDepartment !== 'Tất Cả' && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {file.targetDepartment}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="text-[11px] text-slate-400">
                      <span>{file.fileSize}</span>
                      <span className="mx-1">•</span>
                      <span>{file.downloads || 0} lượt tải</span>
                    </div>

                    <button
                      onClick={() => handleDownloadSimulation(file)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white hover:bg-primary-dark font-bold text-xs shadow-xs transition-all"
                    >
                      <Download size={13} />
                      <span>Tải Xuống</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ĐỌC CHI TIẾT THÔNG BÁO                             */}
      {/* ========================================================= */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                  {selectedAnnouncement.category}
                </span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                  {selectedAnnouncement.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <User size={13} className="text-primary" />
                  <span>Ban hành: <strong>{selectedAnnouncement.author}</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={13} />
                  <span>{new Date(selectedAnnouncement.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase size={13} className="text-primary" />
                  <span>Bộ phận áp dụng: <strong>{selectedAnnouncement.targetDepartment || 'Toàn bộ'}</strong></span>
                </div>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedAnnouncement.content}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ĐĂNG THÔNG BÁO MỚI                                 */}
      {/* ========================================================= */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Ban Hành Thông Báo Mới</h3>
                <p className="text-xs text-slate-500">Gửi thông báo tới các đơn vị và phòng ban hệ sinh thái</p>
              </div>
              <button
                onClick={() => setIsAnnouncementModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tiêu Đề Thông Báo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="Nhập tiêu đề thông báo..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Chuyên Mục
                  </label>
                  <select
                    value={newAnnouncement.category}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Chính Sách & Quy Định">Chính Sách & Quy Định</option>
                    <option value="Vận Hành & Dịch Vụ">Vận Hành & Dịch Vụ</option>
                    <option value="Kinh Doanh & Bán Hàng">Kinh Doanh & Bán Hàng</option>
                    <option value="Khen Thưởng & Sự Kiện">Khen Thưởng & Sự Kiện</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Mức Độ Ưu Tiên
                  </label>
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="normal">Thông Thường</option>
                    <option value="high">Quan Trọng</option>
                    <option value="urgent">Khẩn Cấp</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Đơn Vị Nhận
                  </label>
                  <select
                    value={newAnnouncement.targetUnit}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, targetUnit: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Tất Cả Đơn Vị">Tất Cả 8 Đơn Vị</option>
                    {UNIT_OPTIONS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Bộ Phận Nhận
                  </label>
                  <select
                    value={newAnnouncement.targetDepartment}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, targetDepartment: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Tất Cả Bộ Phận">Tất Cả 5 Bộ Phận</option>
                    {DEPARTMENT_OPTIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Nội Dung Chi Tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  placeholder="Soạn thảo nội dung thông báo..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinNotice"
                  checked={newAnnouncement.pinned}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, pinned: e.target.checked })}
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
                <label htmlFor="pinNotice" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Ghim thông báo lên đầu danh sách
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAnnouncementModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-xl text-xs font-bold shadow-glow"
                >
                  Xuất Bản Thông Báo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CHIA SẺ FILE MỚI                                   */}
      {/* ========================================================= */}
      {isFileModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Chia Sẻ File Dùng Chung Mới</h3>
                <p className="text-xs text-slate-500">Tải lên tài liệu, biểu mẫu, catalog dùng chung nội bộ</p>
              </div>
              <button
                onClick={() => setIsFileModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSharedFile} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tên File / Tài Liệu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newFile.name}
                  onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                  placeholder="Ví dụ: Bang_Gia_Dich_Vu_KimSon_2026.pdf"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Mô Tả Tài Liệu
                </label>
                <textarea
                  rows={2}
                  value={newFile.description}
                  onChange={(e) => setNewFile({ ...newFile, description: e.target.value })}
                  placeholder="Tóm tắt công dụng hoặc hướng dẫn sử dụng tài liệu..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Danh Mục Tài Liệu
                  </label>
                  <select
                    value={newFile.category}
                    onChange={(e) => setNewFile({ ...newFile, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Biểu Mẫu Hành Chính">Biểu Mẫu Hành Chính</option>
                    <option value="Catalog & Bảng Giá">Catalog & Bảng Giá</option>
                    <option value="Tài Liệu Kỹ Thuật">Tài Liệu Kỹ Thuật</option>
                    <option value="Hợp Đồng & Pháp Lý">Hợp Đồng & Pháp Lý</option>
                    <option value="Nhận Diện Thương Hiệu">Nhận Diện Thương Hiệu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Định Dạng File
                  </label>
                  <select
                    value={newFile.fileType}
                    onChange={(e) => setNewFile({ ...newFile, fileType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">Microsoft Word (.docx)</option>
                    <option value="XLSX">Microsoft Excel (.xlsx)</option>
                    <option value="ZIP">Tập tin nén (.zip)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Dung Lượng Ước Tính
                  </label>
                  <input
                    type="text"
                    value={newFile.fileSize}
                    onChange={(e) => setNewFile({ ...newFile, fileSize: e.target.value })}
                    placeholder="Ví dụ: 3.5 MB"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Bộ Phận Sử Dụng
                  </label>
                  <select
                    value={newFile.targetDepartment}
                    onChange={(e) => setNewFile({ ...newFile, targetDepartment: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Tất Cả">Tất Cả Bộ Phận</option>
                    {DEPARTMENT_OPTIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFileModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-xl text-xs font-bold shadow-glow"
                >
                  Lưu & Chia Sẻ File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
