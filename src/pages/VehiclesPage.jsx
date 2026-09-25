import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Car, 
  BatteryCharging, 
  Gauge, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  Calculator, 
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { carsData, carBrands, carSegments, fuelTypes } from '../data/cars';

export default function VehiclesPage({ onOpenBooking, selectedCar, setSelectedCar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Tất Cả');
  const [selectedSegment, setSelectedSegment] = useState('Tất Cả');
  const [selectedFuel, setSelectedFuel] = useState('Tất Cả');
  const [maxPrice, setMaxPrice] = useState(2500000000);

  // Loan calculator state
  const [prepayPercent, setPrepayPercent] = useState(20);
  const [loanYears, setLoanYears] = useState(5);
  const interestRate = 0.085; // 8.5% / year average

  // Filter cars logic
  const filteredCars = useMemo(() => {
    return carsData.filter((car) => {
      const matchSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBrand = selectedBrand === 'Tất Cả' || car.brand === selectedBrand;
      const matchSegment = selectedSegment === 'Tất Cả' || car.segment === selectedSegment;
      const matchFuel = selectedFuel === 'Tất Cả' || car.fuelType === selectedFuel;
      const matchPrice = car.price <= maxPrice;

      return matchSearch && matchBrand && matchSegment && matchFuel && matchPrice;
    });
  }, [searchQuery, selectedBrand, selectedSegment, selectedFuel, maxPrice]);

  // Loan calculation for modal
  const loanCalculation = useMemo(() => {
    if (!selectedCar) return null;
    const price = selectedCar.price;
    const prepayAmount = (price * prepayPercent) / 100;
    const loanAmount = price - prepayAmount;
    const totalMonths = loanYears * 12;
    // Estimated monthly principal + interest:
    const monthlyPrincipal = loanAmount / totalMonths;
    const monthlyInterest = (loanAmount * (interestRate / 12));
    const estimatedMonthlyPayment = monthlyPrincipal + monthlyInterest;

    return {
      prepayAmount,
      loanAmount,
      estimatedMonthlyPayment,
    };
  }, [selectedCar, prepayPercent, loanYears]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">SHOWROOM KIM SƠN AUTOMOBILES</span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2 mb-4">
            Bảng Giá & Danh Mục Xe Ô Tô
          </h1>
          <p className="text-base text-slate-600">
            Khám phá các dòng xe điện VinFast tương lai và các dòng xe ô tô lướt đã qua kiểm định kỹ thuật 160 bước khắt khe từ chuyên gia Kim Sơn.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 mb-10 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm mẫu xe: VF 3, VF 5, VF 7, Navara, Colorado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white outline-none"
            />
          </div>

          {/* Filter Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Brand */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Hãng Xe</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                {carBrands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Loại Động Cơ</label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                {fuelTypes.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Segment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Phân Khúc Xe</label>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                {carSegments.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filters counter & Reset */}
          <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Tìm thấy <strong className="text-primary font-bold text-sm">{filteredCars.length}</strong> mẫu xe phù hợp</span>
            {(searchQuery || selectedBrand !== 'Tất Cả' || selectedSegment !== 'Tất Cả' || selectedFuel !== 'Tất Cả') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('Tất Cả');
                  setSelectedSegment('Tất Cả');
                  setSelectedFuel('Tất Cả');
                }}
                className="text-primary hover:underline font-semibold"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Cars Showcase Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div 
                key={car.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {car.tag && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                      {car.tag}
                    </span>
                  )}
                  <span className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {car.fuelType}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase">{car.brand} • {car.segment}</span>
                      <span className="text-xs text-slate-400">Đời {car.year}</span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {car.name}
                    </h3>

                    <div className="text-xl font-black text-primary mb-4">
                      {car.priceText}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {car.description}
                    </p>

                    {/* Specs Box */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 mb-4 bg-slate-50/50 rounded-xl px-2">
                      <div className="flex items-center gap-1.5">
                        <Gauge size={14} className="text-primary-light shrink-0" />
                        <span className="truncate">{car.specs.power}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BatteryCharging size={14} className="text-primary-light shrink-0" />
                        <span className="truncate">{car.specs.range || car.specs.fuelEconomy}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-primary-light shrink-0" />
                        <span>{car.specs.seating}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-primary-light shrink-0" />
                        <span>Bảo hành chính hãng</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                    >
                      Xem Thông Số
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        onOpenBooking('test-drive');
                      }}
                      className="w-full py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                    >
                      Lái Thử Xe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Car size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy mẫu xe phù hợp</h3>
            <p className="text-sm text-slate-500 mb-6">Vui lòng thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand('Tất Cả');
                setSelectedSegment('Tất Cả');
                setSelectedFuel('Tất Cả');
              }}
              className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs"
            >
              Xem tất cả xe
            </button>
          </div>
        )}
      </div>

      {/* Vehicle Detail & Installment Calculator Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-8">
            {/* Modal Header */}
            <div className="bg-secondary text-white p-6 relative flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-primary-light uppercase tracking-wider">{selectedCar.brand} • {selectedCar.segment}</span>
                <h3 className="text-2xl sm:text-3xl font-black mt-1">{selectedCar.name}</h3>
                <p className="text-xl font-extrabold text-primary-light mt-1">{selectedCar.priceText}</p>
              </div>
              <button
                onClick={() => setSelectedCar(null)}
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-8">
              {/* Image & Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    Đặc Điểm Nổi Bật
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {selectedCar.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Full Specs Table */}
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <Gauge size={18} className="text-primary" />
                  Bảng Thông Số Kỹ Thuật Chi Tiết
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(selectedCar.specs).map(([key, value]) => (
                    <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                      <span className="text-slate-500 font-semibold capitalize">{key}:</span>
                      <span className="font-bold text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Installment Calculator */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator size={20} className="text-primary-light" />
                  <h4 className="text-lg font-bold">Ước Tính Chi Phí Trả Góp Hàng Tháng</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Số tiền trả trước: <strong className="text-amber-400">{prepayPercent}%</strong> ({loanCalculation.prepayAmount.toLocaleString('vi-VN')} VNĐ)
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="70"
                      step="5"
                      value={prepayPercent}
                      onChange={(e) => setPrepayPercent(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Thời hạn vay ngân hàng: <strong className="text-amber-400">{loanYears} năm</strong> ({loanYears * 12} tháng)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={loanYears}
                      onChange={(e) => setLoanYears(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 border border-slate-700">
                  <div>
                    <p className="text-xs text-slate-400">Ước tính số tiền trả góp gốc + lãi tháng đầu:</p>
                    <p className="text-2xl font-black text-amber-400">
                      ~ {Math.round(loanCalculation.estimatedMonthlyPayment).toLocaleString('vi-VN')} VNĐ / tháng
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 text-center sm:text-right">
                    * Lãi suất tạm tính 8.5%/năm. Hỗ trợ vay tối đa 85% giá trị xe.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedCar(null)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold"
                >
                  Đóng Lại
                </button>
                <button
                  onClick={() => {
                    onOpenBooking('test-drive');
                  }}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold shadow-glow"
                >
                  Đăng Ký Lái Thử Mẫu Xe Này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
