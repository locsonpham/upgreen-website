// Green Passport — dữ liệu mẫu. Mỗi mã sản phẩm (in trên tem / QR) ứng với 1 bản ghi.
// Trường văn bản có dạng { vi, en }; thiếu en sẽ hiển thị vi.
// Khi có backend, thay object này bằng API trả về cùng cấu trúc.
// QR có thể chứa trực tiếp mã (UG-RENO-001) hoặc link: https://<domain>/?passport=UG-RENO-001
window.PASSPORTS = {
  'UG-RENO-001': {
    name: { vi: 'Tủ trang trí RÉNO', en: 'RÉNO decorative cabinet' },
    collection: { vi: 'RÉNO collection', en: 'RÉNO collection' },
    image: 'images/products/reno-collection.webp',
    materials: [
      { name: { vi: 'Chai nhựa PET đã qua sử dụng', en: 'Used PET plastic bottles' }, share: 70 },
      { name: { vi: 'Nắp chai HDPE', en: 'HDPE bottle caps' }, share: 20 },
      { name: { vi: 'Sơn mài thủ công', en: 'Handcrafted lacquer' }, share: 10 }
    ],
    bottles: 320,
    plasticKg: 8.5,
    co2Kg: 12.8,
    journey: [
      { place: { vi: 'Điểm thu gom Quận 7, TP.HCM', en: 'Collection point, District 7, HCMC' }, date: '03/2026' },
      { place: { vi: 'Xưởng ép tấm nhựa ReForm Plastic', en: 'ReForm Plastic sheet-pressing workshop' }, date: '04/2026' },
      { place: { vi: 'Xưởng sản xuất UPGREEN', en: 'UPGREEN production workshop' }, date: '05/2026' },
      { place: { vi: 'Hoàn thiện & kiểm định chất lượng', en: 'Finishing & quality inspection' }, date: '06/2026' }
    ]
  },
  'UG-CHAIR-102': {
    name: { vi: 'Ghế ngoại thất tái chế', en: 'Recycled outdoor chair' },
    collection: { vi: 'Ngoại thất tái chế', en: 'Recycled outdoor furniture' },
    image: 'images/products/ngoai-that-tai-che.webp',
    materials: [
      { name: { vi: 'Chai nhựa PET đã qua sử dụng', en: 'Used PET plastic bottles' }, share: 55 },
      { name: { vi: 'Vỏ hộp giấy Tetra Pak', en: 'Tetra Pak cartons' }, share: 30 },
      { name: { vi: 'Túi nilon LDPE', en: 'LDPE plastic bags' }, share: 15 }
    ],
    bottles: 540,
    plasticKg: 14.2,
    co2Kg: 21.3,
    journey: [
      { place: { vi: 'Chương trình thu gom tại doanh nghiệp đối tác', en: 'Collection program at partner companies' }, date: '01/2026' },
      { place: { vi: 'Phân loại & làm sạch tại Long An', en: 'Sorting & cleaning in Long An' }, date: '02/2026' },
      { place: { vi: 'Xưởng sản xuất UPGREEN', en: 'UPGREEN production workshop' }, date: '03/2026' },
      { place: { vi: 'Giao đến khách hàng', en: 'Delivered to the customer' }, date: '04/2026' }
    ]
  },
  'UG-GIFT-205': {
    name: { vi: 'Bộ quà tặng lót ly & móc khóa', en: 'Coaster & keychain gift set' },
    collection: { vi: 'Sản phẩm quà tặng', en: 'Gift products' },
    image: 'images/products/qua-tang.webp',
    materials: [
      { name: { vi: 'Nắp chai nhựa HDPE', en: 'HDPE plastic bottle caps' }, share: 80 },
      { name: { vi: 'Chai nhựa PET đã qua sử dụng', en: 'Used PET plastic bottles' }, share: 20 }
    ],
    bottles: 45,
    plasticKg: 1.1,
    co2Kg: 1.7,
    journey: [
      { place: { vi: 'Workshop thu gom nắp chai cộng đồng', en: 'Community bottle-cap collection workshop' }, date: '05/2026' },
      { place: { vi: 'Nghiền hạt nhựa tái chế', en: 'Grinding into recycled plastic pellets' }, date: '06/2026' },
      { place: { vi: 'Ép khuôn thủ công', en: 'Hand-pressed molding' }, date: '06/2026' },
      { place: { vi: 'Đóng gói quà tặng doanh nghiệp', en: 'Packed as corporate gifts' }, date: '07/2026' }
    ]
  }
};
