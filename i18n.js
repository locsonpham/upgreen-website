// Đa ngôn ngữ VI / EN.
// - Nội dung tiếng Việt nằm sẵn trong HTML; phần tử cần dịch được gắn data-i18n="key"
//   (thay innerHTML) hoặc data-i18n-attr="placeholder:key;aria-label:key2" (thay thuộc tính).
// - EN bên dưới là bản dịch của các key đó. Key thiếu bản dịch sẽ giữ nguyên tiếng Việt.
// - STRINGS chứa chuỗi do JS sinh ra (Green Passport, thông báo…), cần đủ cả vi và en.
// - Ngôn ngữ chọn theo ?lang=en, sau đó tới lựa chọn đã lưu, mặc định là vi.
//   Khi đổi ngôn ngữ sẽ phát sự kiện "langchange" trên document.
(() => {
  const EN = {
    // header
    'nav.home': 'Home',
    'nav.intro': 'About',
    'nav.products': 'Products',
    'nav.cat1': 'Category 1',
    'nav.cat2': 'Category 2',
    'nav.cat3': 'Category 3',
    'nav.cat4': 'Category 4',
    'nav.services': 'Services',
    'nav.passport': 'Green Passport',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'search.label': 'Search',
    'search.placeholder': 'Enter keywords...',
    'common.prev': 'Previous',
    'common.next': 'Next',

    // hero
    'hero.1.kicker': 'Green brand',
    'hero.1.title': 'Live green<br>every day',
    'hero.1.btn': 'Explore',
    'hero.2.kicker': 'Recycled products',
    'hero.2.title': 'From waste<br>to value',
    'hero.2.btn': 'View products',
    'hero.3.kicker': 'ESG / CSR',
    'hero.3.title': 'Partnering with<br>businesses',
    'hero.3.btn': 'Services',
    'hero.4.kicker': 'Green lifestyle',
    'hero.4.title': 'Spreading<br>sustainable values',
    'hero.4.btn': 'News',

    // banners
    'banner.1': 'Promo banner 1',
    'banner.2': 'Promo banner 2',
    'banner.3': 'Promo banner 3',
    'banner.4': 'Promo banner 4',

    // intro
    'intro.kicker': 'Brand name',
    'intro.title': 'Featured collection',
    'intro.p1': 'A short introduction to the brand and its collection. Replace this with your own story: your mission, core values and what makes your products different.',
    'intro.p2': 'A second paragraph can describe the materials, the sustainable production process or your commitment to the community and the environment.',
    'common.more': 'Learn more',

    // process
    'process.kicker': 'How we work',
    'process.title': 'Our process in 05 key steps',
    'process.desc': 'A short description of how the brand operates, from collecting raw materials to delivering products to customers.',
    'process.1.title': 'Collection',
    'process.1.desc': 'Describe the material collection step.',
    'process.2.title': 'Sorting',
    'process.2.desc': 'Describe the sorting and cleaning step.',
    'process.3.title': 'Processing',
    'process.3.desc': 'Describe the material processing step.',
    'process.4.title': 'Design',
    'process.4.desc': 'Describe the product design step.',
    'process.5.title': 'Finishing',
    'process.5.desc': 'Describe the production and delivery step.',

    // green passport
    'gp.title': 'Your product’s green passport',
    'gp.desc': 'Enter the code printed on your product or scan its QR code to see what it was recycled from and the journey behind it.',
    'gp.placeholder': 'Enter product code, e.g. UG-RENO-001',
    'gp.inputLabel': 'Product code',
    'gp.search': 'Look up',
    'gp.scan': 'Scan QR',
    'gp.samples': 'Sample codes:',
    'gp.pickImage': 'Choose QR image',
    'gp.close': 'Close',

    // products
    'products.title': 'Product lines',
    'products.a': 'Collection A',
    'products.b': 'Collection B',
    'products.gifts': 'Corporate gifts',
    'products.materials': 'Recycled materials',
    'products.keychains': 'Keychains',
    'products.coasters': 'Coasters',
    'products.accessories': 'Accessories',
    'products.furniture': 'Furniture',
    'products.decor': 'Décor',
    'products.eventGifts': 'Event gifts',
    'products.logoPrint': 'Logo printing',
    'products.sheets': 'Plastic sheets',
    'products.pellets': 'Plastic pellets',
    'common.viewAll': 'View all',

    // services
    'services.title': 'ESG / CSR services',
    'services.desc': 'A short introduction to our consulting services and sustainability programs for businesses.',
    'services.1': 'ESG strategy consulting',
    'services.2': 'CSR events',
    'services.3': 'Recycling workshops',
    'services.4': 'Green gifts',
    'services.itemDesc': 'A short description of the service.',
    'common.details': 'Details',

    // partners, stats, team
    'partners.title': '&amp; Our leading partners',
    'stats.title': 'Our <span>achievements</span>',
    'stats.1': 'Distribution points',
    'stats.2': 'Partner businesses',
    'stats.3': 'Tons of plastic recycled',
    'stats.4': 'Events organized',
    'team.title': 'Our team',
    'team.name': 'Full name',
    'team.role': 'Position',

    // collaboration
    'collab.title': 'Partnering with leading brands',
    'collab.1': 'Partnership project 1',
    'collab.2': 'Partnership project 2',
    'collab.3': 'Partnership project 3',
    'collab.itemDesc': 'A short description of the partnership project.',
    'collab.feature': 'Featured project',
    'collab.featureDesc': 'A description of our most notable project.',

    // news + faq
    'news.title': 'Featured events',
    'news.mainTitle': 'Featured article title',
    'news.mainExcerpt': 'A short excerpt of the article appears here...',
    'news.2': 'Article title 2',
    'news.3': 'Article title 3',
    'news.4': 'Article title 4',
    'faq.title': 'Frequently asked questions',
    'faq.q1': 'What materials are the products made from?',
    'faq.q2': 'Do you accept bulk orders?',
    'faq.q3': 'Can you print our company logo on the products?',
    'faq.q4': 'How long does delivery take?',
    'faq.q5': 'What is your return policy?',
    'faq.answer': 'Sample answer. Replace with actual content.',

    // footer
    'footer.company': 'YOUR COMPANY NAME',
    'footer.about': 'A short description of the company and its field of business.',
    'footer.policies': 'Policies',
    'footer.privacy': 'Privacy policy',
    'footer.returns': 'Return policy',
    'footer.shipping': 'Shipping policy',
    'footer.guide': 'Shopping guide',
    'footer.contact': 'Contact',
    'footer.address': 'Company address',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc': 'Get the latest product and event updates.',
    'footer.email': 'Your email',
    'footer.send': 'Send',
    'toTop': 'Back to top'
  };

  const STRINGS = {
    vi: {
      'newsletter.thanks': 'Cảm ơn bạn đã đăng ký!',
      'gp.step1': 'Thu gom & phân loại',
      'gp.step2': 'Xử lý thành vật liệu tái chế',
      'gp.step3': 'Sản xuất',
      'gp.step4': 'Sản phẩm UpGreen',
      'gp.notFound': 'Không tìm thấy mã sản phẩm',
      'gp.notFoundDesc': 'Mã <b>{code}</b> không có trong hệ thống. Vui lòng kiểm tra lại mã in trên sản phẩm hoặc quét lại mã QR.',
      'gp.valid': 'Mã hợp lệ',
      'gp.code': 'Mã',
      'gp.impact': 'Tác động tái chế',
      'gp.madeFrom': 'Sản phẩm được tái chế từ những gì?',
      'gp.bottles': 'chai nhựa được tái sinh',
      'gp.plastic': 'nhựa không ra bãi rác',
      'gp.co2': 'CO₂ giảm phát thải',
      'gp.journey': 'Hành trình đằng sau sản phẩm',
      'gp.scanOpening': 'Đang mở camera…',
      'gp.scanPoint': 'Đưa mã QR vào khung hình…',
      'gp.noCamera': 'Trình duyệt không hỗ trợ camera (cần HTTPS)',
      'gp.cameraError': 'Không thể mở camera: {msg}. Bạn có thể chọn ảnh chứa mã QR.',
      'gp.reading': 'Đang đọc ảnh…',
      'gp.noQr': 'Không tìm thấy mã QR trong ảnh. Hãy thử ảnh khác.',
      'gp.readError': 'Không đọc được ảnh: {msg}',
      'gp.libError': 'Không tải được thư viện quét QR'
    },
    en: {
      'newsletter.thanks': 'Thank you for subscribing!',
      'gp.step1': 'Collection & sorting',
      'gp.step2': 'Processing into recycled material',
      'gp.step3': 'Manufacturing',
      'gp.step4': 'UpGreen product',
      'gp.notFound': 'Product code not found',
      'gp.notFoundDesc': 'The code <b>{code}</b> is not in our system. Please check the code printed on the product or scan the QR code again.',
      'gp.valid': 'Valid code',
      'gp.code': 'Code',
      'gp.impact': 'Recycling impact',
      'gp.madeFrom': 'What is this product recycled from?',
      'gp.bottles': 'plastic bottles given a new life',
      'gp.plastic': 'of plastic kept out of landfill',
      'gp.co2': 'of CO₂ emissions avoided',
      'gp.journey': 'The journey behind the product',
      'gp.scanOpening': 'Opening camera…',
      'gp.scanPoint': 'Point the camera at a QR code…',
      'gp.noCamera': 'Your browser does not support the camera (HTTPS required)',
      'gp.cameraError': 'Could not open the camera: {msg}. You can choose an image containing the QR code instead.',
      'gp.reading': 'Reading image…',
      'gp.noQr': 'No QR code found in this image. Please try another one.',
      'gp.readError': 'Could not read the image: {msg}',
      'gp.libError': 'Could not load the QR scanning library'
    }
  };

  const LANGS = ['vi', 'en'];
  const STORE_KEY = 'lang';
  const original = new Map(); // phần tử -> nội dung tiếng Việt gốc, để chuyển ngược lại

  const store = {
    get() { try { return localStorage.getItem(STORE_KEY); } catch { return null; } },
    set(v) { try { localStorage.setItem(STORE_KEY, v); } catch { /* ignore */ } }
  };

  const fromUrl = new URLSearchParams(location.search).get('lang');
  let lang = [fromUrl, store.get()].find(l => LANGS.includes(l)) || 'vi';

  function t(key, vars = {}) {
    const s = STRINGS[lang]?.[key] ?? STRINGS.vi[key] ?? key;
    return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  }

  // id: 'html' hoặc tên thuộc tính, để 1 phần tử có thể dịch cả nội dung lẫn thuộc tính
  function translate(el, id, key, get, set) {
    let orig = original.get(el);
    if (!orig) original.set(el, orig = {});
    if (!(id in orig)) orig[id] = get();
    set(lang === 'vi' ? orig[id] : (EN[key] ?? orig[id]));
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      translate(el, 'html', key, () => el.innerHTML, v => { el.innerHTML = v; });
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        translate(el, attr, key, () => el.getAttribute(attr), v => el.setAttribute(attr, v));
      });
    });
    document.querySelectorAll('[data-lang]').forEach(a => a.classList.toggle('on', a.dataset.lang === lang));
  }

  function setLang(next) {
    if (!LANGS.includes(next) || next === lang) return;
    lang = next;
    store.set(lang);
    const url = new URL(location.href);
    lang === 'vi' ? url.searchParams.delete('lang') : url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
    apply();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  document.querySelectorAll('[data-lang]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    setLang(a.dataset.lang);
  }));

  window.i18n = { t, setLang, get lang() { return lang; } };
  apply();
})();
