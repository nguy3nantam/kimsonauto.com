import { withBasePath } from '../utils/assets';

export const ecosystemData = {
  name: 'KIM SƠN ECOSYSTEM',
  legalName: 'HỆ SINH THÁI Ô TÔ KIM SƠN (KIM SƠN AUTOMOBILES)',
  foundingYear: 2014,
  headquarters: 'Số 643 Quốc Lộ 1, Khu Phố 27, Phường Long Bình, Thành Phố Đồng Nai',
  hotline: '0913 75 75 79',
  email: 'contact@kimsonauto.com',
  website: 'kimsonauto.com',
  slogan: 'Kiến Tạo Giá Trị - Nâng Tầm Trải Nghiệm Ô Tô Việt',
  
  stats: [
    { number: '12+', label: 'Năm Hình Thành & Phát Triển', desc: 'Từ nền tảng xưởng kỹ thuật năm 2014' },
    { number: '24/7', label: 'Hỗ Trợ & Cứu Hộ', desc: 'Đồng hành trên mọi hành trình' },
    { number: '11+', label: 'Cơ Sở & Showroom Dịch Vụ', desc: 'Bao phủ Đồng Nai & TP. Hồ Chí Minh' },
    { number: '300+', label: 'Kỹ Sư & Chuyên Viên Kỹ Thuật', desc: 'Đào tạo bài bản theo quy chuẩn quốc tế' },
    { number: '50.000+', label: 'Khách Hàng & Đối Tác Tin Chọn', desc: 'Đồng hành trên mọi nẻo đường' },
    { number: '99%', label: 'Chỉ Số Hài Lòng Dịch Vụ', desc: 'Cam kết chất lượng và minh bạch' },
  ],

  // Cột mốc lịch sử hình thành
  historyMilestones: [
    {
      year: '2014',
      title: 'Đặt Nền Móng Kỹ Thuật Ban Đầu',
      description: 'Khởi đầu với xưởng dịch vụ kỹ thuật cơ khí ô tô quy mô tại TP. Biên Hòa, tập trung chuyên sâu vào phục hồi thân vỏ và đại tu máy gầm chất lượng cao.'
    },
    {
      year: '2017',
      title: 'Đối Tác Ủy Quyền Chevrolet & Nissan',
      description: 'Mở rộng quy mô trở thành đối tác dịch vụ và phụ tùng ủy quyền của các thương hiệu ô tô Mỹ và Nhật Bản, chuẩn hóa quy trình dịch vụ theo chuẩn quốc tế.'
    },
    {
      year: '2020',
      title: 'Hình Thành Chuỗi Chi Nhánh Đa Điểm',
      description: 'Chiến lược mở rộng chuỗi trạm dịch vụ tại Bửu Long, Trảng Dài, Long Thành và Nhơn Trạch, tạo mạng lưới tiếp nhận xe khép kín tại tỉnh Đồng Nai.'
    },
    {
      year: '2023',
      title: 'Chuyển Đổi Xanh & Hợp Tác Cùng VinFast',
      description: 'Đón đầu xu thế di chuyển thông minh, Kim Sơn ký kết hợp tác chiến lược cùng VinFast, đầu tư hạ tầng trạm bảo dưỡng và nâng cấp chuyên môn về xe điện.'
    },
    {
      year: '2026',
      title: 'Hệ Sinh Thái Ô Tô Kim Sơn Toàn Diện',
      description: 'Chính thức định vị mô hình Hệ Sinh Thái Ô Tô toàn diện với chuỗi 11 chi nhánh và showroom trọng điểm kết nối giữa TP.HCM và Đồng Nai.'
    }
  ],

  // Cam kết Phát Triển Bền Vững (ESG)
  sustainability: [
    {
      title: 'Môi Trường & Năng Lượng Xanh',
      desc: 'Tích cực thúc đẩy phổ cập xe điện không phát thải, ứng dụng phòng sơn sấy lọc khí khép kín và xử lý chất thải dầu nhớt theo quy chuẩn bảo vệ môi trường cao nhất.'
    },
    {
      title: 'Phát Triển Nguồn Nhân Lực Chất Lượng Cao',
      desc: 'Liên tục tổ chức các khóa đào tạo nâng cao tay nghề kỹ sư về công nghệ pin ô tô, an toàn điện cao áp và quy tắc ứng xử tận tâm phục vụ khách hàng.'
    },
    {
      title: 'Trách Nhiệm Cộng Đồng & An Sinh Giao Thông',
      desc: 'Duy trì mạng lưới xe cứu hộ miễn phí trong các tình huống khẩn cấp bão lũ, tham gia tài trợ các hoạt động an toàn giao thông đường bộ tại địa phương.'
    }
  ],

  // Mạng lưới 11 chi nhánh & cơ sở thực tế Kim Sơn
  branches: [
    {
      id: 'vinfast-bien-hoa',
      name: 'VinFast Kim Sơn Biên Hòa',
      role: 'Showroom & Trung Tâm Dịch Vụ Xe Điện VinFast',
      address: '643 Quốc Lộ 1, KP. 27, P. Long Bình, TP. Biên Hòa, Tỉnh Đồng Nai',
      hotline: '0913 75 75 79',
      image: withBasePath('/vinfast-kimson-bienhoa.jpg'),
      features: ['Showroom Xe VinFast', 'Bảo Dưỡng Định Kỳ', 'Xưởng Kỹ Thuật', 'Trạm Sạc Nhanh'],
      isMain: true
    },
    {
      id: 'vinfast-buu-long',
      name: 'VinFast Bửu Long',
      role: 'Showroom & Trạm Dịch Vụ Nhanh Bửu Long',
      address: '1/1 Nguyễn Ái Quốc, P. Trấn Biên, TP. Biên Hòa, Tỉnh Đồng Nai',
      hotline: '0908 123 457',
      features: ['Trưng Bày Xe VinFast', 'Bảo Dưỡng Nhanh', 'Chăm Sóc & Spa Xe']
    },
    {
      id: 'vinfast-trang-dai',
      name: 'VinFast Trảng Dài',
      role: 'Showroom & Dịch Vụ Kỹ Thuật Trảng Dài',
      address: '179 Trần Văn Xã, Tổ 2, KP. 5, P. Trảng Dài, TP. Biên Hòa, Tỉnh Đồng Nai',
      hotline: '0908 123 458',
      features: ['Showroom Xe Điện', 'Sửa Chữa Điện - Lạnh', 'Bảo Dưỡng Định Kỳ']
    },
    {
      id: 'xuong-tan-hiep',
      name: 'Xưởng Dịch Vụ Tân Hiệp',
      role: 'Trung Tâm Kỹ Thuật Công Nghệ Cao Tân Hiệp',
      address: 'H17, Khu phố 5, P. Tam Hiệp, TP. Biên Hòa, Tỉnh Đồng Nai',
      hotline: '0908 123 459',
      features: ['Đại Tu Động Cơ & Hộp Số', 'Phòng Sơn Sấy Hấp Chuẩn', 'Cân Chỉnh Thước Lái 3D', 'Chẩn Đoán Pin Cao Áp']
    },
    {
      id: 'vinfast-trang-bom',
      name: 'VinFast Trảng Bom',
      role: 'Showroom & Trung Tâm Tiếp Nhận Dịch Vụ Trảng Bom',
      address: '125-127 Đường 29/4, KP. 5, Xã Trảng Bom, Huyện Trảng Bom, Tỉnh Đồng Nai',
      hotline: '0908 123 460',
      features: ['Showroom Xe VinFast', 'Bảo Dưỡng Xe Định Kỳ', 'Phụ Tùng Chính Hãng']
    },
    {
      id: 'vinfast-long-khanh',
      name: 'VinFast Long Khánh',
      role: 'Showroom & Trung Tâm Dịch Vụ Cửa Ngõ Long Khánh',
      address: 'Quốc Lộ 1A, Tổ 6, Nông Doanh, P. Hàng Gòn, TP. Long Khánh, Tỉnh Đồng Nai',
      hotline: '0908 123 461',
      features: ['Showroom VinFast', 'Xưởng Bảo Dưỡng', 'Cứu Hộ Giao Thông 24/7']
    },
    {
      id: 'vinfast-long-thanh-1',
      name: 'VinFast Long Thành',
      role: 'Tổ Hợp Dịch Vụ & Tiếp Nhận Long Thành 1',
      address: 'Quốc Lộ 51, Tổ 1, Ấp Long Phú, Xã Phước Thái, Huyện Long Thành, Tỉnh Đồng Nai',
      hotline: '0908 123 462',
      features: ['Showroom VinFast', 'Trạm Cứu Hộ Quốc Lộ 51', 'Bảo Dưỡng Kỹ Thuật']
    },
    {
      id: 'vinfast-long-thanh-2',
      name: 'VinFast Long Thành 2',
      role: 'Trung Tâm Dịch Vụ & Trải Nghiệm Xe Long Thành 2',
      address: 'Tổ 29 Trường Chinh, Khu Phước Hải, Huyện Long Thành, Tỉnh Đồng Nai',
      hotline: '0908 123 463',
      features: ['Showroom Trưng Bày', 'Bảo Dưỡng Xe Điện', 'Trạm Sạc Nhanh']
    },
    {
      id: 'vinfast-long-thanh-3',
      name: 'VinFast Long Thành 3',
      role: 'Chi Nhánh Kỹ Thuật & Dịch Vụ Nhơn Trạch',
      address: 'Đường Hùng Vương, KP. Phước Lai, Huyện Nhơn Trạch, Tỉnh Đồng Nai',
      hotline: '0908 123 464',
      features: ['Bảo Dưỡng Xe Doanh Nghiệp', 'Đồng Sơn Nhanh', 'Cứu Hộ Giao Thông 24/7']
    },
    {
      id: 'vinfast-binh-thanh',
      name: 'VinFast Bình Thạnh',
      role: 'Showroom & Trung Tâm Dịch Vụ Trọng Điểm Bình Thạnh',
      address: '182_184_188 Quốc Lộ 13, Khu phố 53, Phường Bình Thạnh, TP.HCM',
      hotline: '0908 123 465',
      features: ['Showroom Xe Điện VinFast', 'Trung Tâm Bảo Dưỡng Tiêu Chuẩn', 'Cung Ứng Phụ Tùng']
    },
    {
      id: 'gf-kim-son-hcm',
      name: 'GF Kim Sơn Hồ Chí Minh',
      role: 'Văn Phòng Điều Hành Hệ Sinh Thái Kim Sơn (Green Future)',
      address: 'Đường Số 37, Khu đô thị An Phú An Khánh, Bình Trưng, TP.Hồ Chí Minh',
      hotline: '0913 75 75 79',
      features: ['Văn Phòng Điều Hành', 'Trung Tâm Điều Phối Hệ Sinh Thái', 'Dự Án Chuyển Đổi Xanh'],
      isMain: false
    }
  ],

  // Tin tức tập đoàn & Truyền thông
  news: [
    {
      id: '1',
      title: 'Kim Sơn Automobiles Công Bố Chiến Lược Hệ Sinh Thái Ô Tô Giai Đoạn 2026 - 2030',
      category: 'Thông Cáo Báo Chí',
      date: '25/09/2026',
      readTime: '4 phút đọc',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=900',
      summary: 'Tiếp tục mở rộng mạng lưới showroom và trạm dịch vụ, đón đầu các hạ tầng giao thông trọng điểm phía Nam.'
    },
    {
      id: '2',
      title: 'Đẩy Mạnh Chuyển Đổi Xanh: Kim Sơn Nâng Cấp 100% Xưởng Kỹ Thuật Đạt Chuẩn Xe Điện',
      category: 'Phát Triển Bền Vững',
      date: '20/09/2026',
      readTime: '5 phút đọc',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=900',
      summary: 'Trang bị trạm chẩn đoán chuyên dụng, thiết bị bảo hộ pin cao áp và đào tạo chuyên sâu cho toàn bộ kỹ sư theo tiêu chuẩn toàn cầu.'
    },
    {
      id: '3',
      title: 'Kim Sơn Đưa Vào Hoạt Động Trạm Cứu Hộ Giao Thông Đón Đầu Sân Bay Quốc Tế Long Thành',
      category: 'Hạ Tầng & Cơ Sở',
      date: '15/09/2026',
      readTime: '3 phút đọc',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=900',
      summary: 'Đội xe cứu hộ chuyên dụng sàn trượt hiện đại túc trực 24/7 sẵn sàng hỗ trợ kỹ thuật và giải tỏa sự cố trên các tuyến cao tốc huyết mạch.'
    }
  ]
};
