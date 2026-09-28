// Green Passport — dữ liệu mẫu. Mỗi mã sản phẩm (in trên tem / QR) ứng với 1 bản ghi.
// Khi có backend, thay object này bằng API trả về cùng cấu trúc.
// QR có thể chứa trực tiếp mã (UG-RENO-001) hoặc link: https://<domain>/?passport=UG-RENO-001
window.PASSPORTS = {
  'UG-RENO-001': {
    name: 'Tủ trang trí RÉNO',
    collection: 'RÉNO collection',
    image: 'images/products/reno-collection.webp',
    materials: [
      { name: 'Chai nhựa PET đã qua sử dụng', share: 70 },
      { name: 'Nắp chai HDPE', share: 20 },
      { name: 'Sơn mài thủ công', share: 10 }
    ],
    bottles: 320,
    plasticKg: 8.5,
    co2Kg: 12.8,
    journey: [
      { place: 'Điểm thu gom Quận 7, TP.HCM', date: '03/2026' },
      { place: 'Xưởng ép tấm nhựa ReForm Plastic', date: '04/2026' },
      { place: 'Xưởng sản xuất UPGREEN', date: '05/2026' },
      { place: 'Hoàn thiện & kiểm định chất lượng', date: '06/2026' }
    ]
  },
  'UG-CHAIR-102': {
    name: 'Ghế ngoại thất tái chế',
    collection: 'Ngoại thất tái chế',
    image: 'images/products/ngoai-that-tai-che.webp',
    materials: [
      { name: 'Chai nhựa PET đã qua sử dụng', share: 55 },
      { name: 'Vỏ hộp giấy Tetra Pak', share: 30 },
      { name: 'Túi nilon LDPE', share: 15 }
    ],
    bottles: 540,
    plasticKg: 14.2,
    co2Kg: 21.3,
    journey: [
      { place: 'Chương trình thu gom tại doanh nghiệp đối tác', date: '01/2026' },
      { place: 'Phân loại & làm sạch tại Long An', date: '02/2026' },
      { place: 'Xưởng sản xuất UPGREEN', date: '03/2026' },
      { place: 'Giao đến khách hàng', date: '04/2026' }
    ]
  },
  'UG-GIFT-205': {
    name: 'Bộ quà tặng lót ly & móc khóa',
    collection: 'Sản phẩm quà tặng',
    image: 'images/products/qua-tang.webp',
    materials: [
      { name: 'Nắp chai nhựa HDPE', share: 80 },
      { name: 'Chai nhựa PET đã qua sử dụng', share: 20 }
    ],
    bottles: 45,
    plasticKg: 1.1,
    co2Kg: 1.7,
    journey: [
      { place: 'Workshop thu gom nắp chai cộng đồng', date: '05/2026' },
      { place: 'Nghiền hạt nhựa tái chế', date: '06/2026' },
      { place: 'Ép khuôn thủ công', date: '06/2026' },
      { place: 'Đóng gói quà tặng doanh nghiệp', date: '07/2026' }
    ]
  }
};
