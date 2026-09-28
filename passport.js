// Green Passport: nhập mã / quét QR -> kiểm tra mã -> hiển thị tác động tái chế
(() => {
  const form = document.getElementById('gpForm');
  const input = document.getElementById('gpInput');
  const result = document.getElementById('gpResult');
  const scanner = document.getElementById('gpScanner');
  const video = document.getElementById('gpVideo');
  const scanStatus = document.getElementById('gpScanStatus');
  const data = window.PASSPORTS || {};

  const STEPS = [
    { title: 'Thu gom & phân loại', icon: 'fa-dumpster' },
    { title: 'Xử lý thành vật liệu tái chế', icon: 'fa-recycle' },
    { title: 'Sản xuất', icon: 'fa-industry' },
    { title: 'Sản phẩm UpGreen', icon: 'fa-leaf' }
  ];

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => n.toLocaleString('vi-VN');

  // QR có thể chứa mã thuần hoặc URL có ?passport= / ?code=
  function extractCode(raw) {
    const text = String(raw).trim();
    try {
      const u = new URL(text);
      const q = u.searchParams.get('passport') || u.searchParams.get('code');
      if (q) return q.trim().toUpperCase();
      return (u.pathname.split('/').filter(Boolean).pop() || '').toUpperCase();
    } catch { return text.toUpperCase(); }
  }

  function lookup(raw, { scroll = false } = {}) {
    const code = extractCode(raw);
    if (!code) { input.focus(); return; }
    input.value = code;
    const p = data[code];
    result.innerHTML = p ? renderPassport(code, p) : renderNotFound(code);
    const url = new URL(location.href);
    p ? url.searchParams.set('passport', code) : url.searchParams.delete('passport');
    history.replaceState(null, '', url);
    if (scroll) document.getElementById('passport').scrollIntoView({ behavior: 'smooth' });
  }

  function renderNotFound(code) {
    return `<div class="gp-card gp-notfound">
      <i class="fa-solid fa-circle-exclamation"></i>
      <div><h3>Không tìm thấy mã sản phẩm</h3>
      <p>Mã <b>${esc(code)}</b> không có trong hệ thống. Vui lòng kiểm tra lại mã in trên sản phẩm hoặc quét lại mã QR.</p></div>
    </div>`;
  }

  function renderPassport(code, p) {
    const materials = p.materials.map(m => `<li><span>${esc(m.name)}</span><b>${m.share}%</b>
      <i class="bar"><i style="width:${m.share}%"></i></i></li>`).join('');
    const journey = STEPS.map((s, i) => {
      const j = p.journey[i] || {};
      return `<li><span class="dot"><i class="fa-solid ${s.icon}"></i></span>
        <div><h5>${s.title}</h5>${j.place ? `<p>${esc(j.place)}</p>` : ''}${j.date ? `<small>${esc(j.date)}</small>` : ''}</div></li>`;
    }).join('');
    return `<article class="gp-card">
      <header class="gp-head">
        <div class="gp-thumb" style="background-image:url(${esc(p.image)})"></div>
        <div>
          <span class="gp-valid"><i class="fa-solid fa-circle-check"></i> Mã hợp lệ</span>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.collection)} · Mã: <b>${esc(code)}</b></p>
        </div>
      </header>
      <h4 class="gp-sub">Tác động tái chế</h4>
      <div class="gp-grid">
        <section class="gp-box">
          <h4><i class="fa-solid fa-bottle-water"></i> Sản phẩm được tái chế từ những gì?</h4>
          <ul class="gp-materials">${materials}</ul>
          <div class="gp-impact">
            <div><b>${fmt(p.bottles)}</b><span>chai nhựa được tái sinh</span></div>
            <div><b>${fmt(p.plasticKg)} kg</b><span>nhựa không ra bãi rác</span></div>
            <div><b>${fmt(p.co2Kg)} kg</b><span>CO₂ giảm phát thải</span></div>
          </div>
        </section>
        <section class="gp-box">
          <h4><i class="fa-solid fa-route"></i> Hành trình đằng sau sản phẩm</h4>
          <ol class="gp-journey">${journey}</ol>
        </section>
      </div>
    </article>`;
  }

  form.addEventListener('submit', e => { e.preventDefault(); lookup(input.value); });
  document.querySelectorAll('.gp-hint [data-code]').forEach(b => b.onclick = () => lookup(b.dataset.code));

  // ---- QR scanning: BarcodeDetector nếu trình duyệt hỗ trợ, ngược lại dùng jsQR ----
  let stream = null, raf = 0, detector = null;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  function loadJsQR() {
    if (window.jsQR) return Promise.resolve();
    return new Promise((ok, fail) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
      s.onload = ok; s.onerror = () => fail(new Error('Không tải được thư viện quét QR'));
      document.head.appendChild(s);
    });
  }

  async function getDecoder() {
    if (!detector && 'BarcodeDetector' in window) {
      try {
        if ((await BarcodeDetector.getSupportedFormats()).includes('qr_code')) detector = new BarcodeDetector({ formats: ['qr_code'] });
      } catch { /* fall back to jsQR */ }
    }
    if (detector) return async src => (await detector.detect(src))[0]?.rawValue;
    await loadJsQR();
    return async src => {
      const w = src.videoWidth || src.naturalWidth || src.width, h = src.videoHeight || src.naturalHeight || src.height;
      if (!w || !h) return null;
      canvas.width = w; canvas.height = h;
      ctx.drawImage(src, 0, 0, w, h);
      return jsQR(ctx.getImageData(0, 0, w, h).data, w, h)?.data;
    };
  }

  function stopScan() {
    cancelAnimationFrame(raf);
    stream?.getTracks().forEach(t => t.stop());
    stream = null;
    scanner.hidden = true;
  }

  function onDecoded(text) {
    stopScan();
    lookup(text);
  }

  async function startScan() {
    scanner.hidden = false;
    scanStatus.textContent = 'Đang mở camera…';
    try {
      const decode = await getDecoder();
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Trình duyệt không hỗ trợ camera (cần HTTPS)');
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      video.srcObject = stream;
      await video.play();
      scanStatus.textContent = 'Đưa mã QR vào khung hình…';
      let busy = false;
      const tick = async () => {
        if (!stream) return;
        if (!busy && video.readyState >= 2) {
          busy = true;
          try { const text = await decode(video); if (text) return onDecoded(text); } catch { /* keep scanning */ }
          busy = false;
        }
        raf = requestAnimationFrame(tick);
      };
      tick();
    } catch (err) {
      scanStatus.textContent = `Không thể mở camera: ${err.message}. Bạn có thể chọn ảnh chứa mã QR.`;
    }
  }

  document.getElementById('gpScanBtn').onclick = startScan;
  document.getElementById('gpScanClose').onclick = stopScan;
  document.getElementById('gpFile').onchange = async e => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    scanStatus.textContent = 'Đang đọc ảnh…';
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await img.decode();
      const text = await (await getDecoder())(img);
      URL.revokeObjectURL(img.src);
      text ? onDecoded(text) : (scanStatus.textContent = 'Không tìm thấy mã QR trong ảnh. Hãy thử ảnh khác.');
    } catch (err) {
      scanStatus.textContent = `Không đọc được ảnh: ${err.message}`;
    }
  };

  // Deep link từ QR in trên sản phẩm: ?passport=UG-RENO-001
  const initial = new URLSearchParams(location.search).get('passport');
  if (initial) lookup(initial, { scroll: true });
})();
