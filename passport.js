// Green Passport: nhập mã / quét QR -> kiểm tra mã -> hiển thị tác động tái chế
(() => {
  const form = document.getElementById('gpForm');
  const input = document.getElementById('gpInput');
  const result = document.getElementById('gpResult');
  const scanner = document.getElementById('gpScanner');
  const video = document.getElementById('gpVideo');
  const scanStatus = document.getElementById('gpScanStatus');
  const data = window.PASSPORTS || {};
  const { t } = window.i18n;
  let lastCode = null;

  const STEP_ICONS = ['fa-dumpster', 'fa-recycle', 'fa-industry', 'fa-leaf'];

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => n.toLocaleString(i18n.lang === 'en' ? 'en-US' : 'vi-VN');
  // Trường dữ liệu song ngữ { vi, en } -> chuỗi theo ngôn ngữ hiện tại
  const L = v => (v && typeof v === 'object') ? (v[i18n.lang] ?? v.vi) : v;

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
    lastCode = code;
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
      <div><h3>${t('gp.notFound')}</h3>
      <p>${t('gp.notFoundDesc', { code: esc(code) })}</p></div>
    </div>`;
  }

  function renderPassport(code, p) {
    const materials = p.materials.map(m => `<li><span>${esc(L(m.name))}</span><b>${m.share}%</b>
      <i class="bar"><i style="width:${m.share}%"></i></i></li>`).join('');
    const journey = STEP_ICONS.map((icon, i) => {
      const j = p.journey[i] || {};
      return `<li><span class="dot"><i class="fa-solid ${icon}"></i></span>
        <div><h5>${t('gp.step' + (i + 1))}</h5>${j.place ? `<p>${esc(L(j.place))}</p>` : ''}${j.date ? `<small>${esc(j.date)}</small>` : ''}</div></li>`;
    }).join('');
    return `<article class="gp-card">
      <header class="gp-head">
        <div class="gp-thumb" style="background-image:url(${esc(p.image)})"></div>
        <div>
          <span class="gp-valid"><i class="fa-solid fa-circle-check"></i> ${t('gp.valid')}</span>
          <h3>${esc(L(p.name))}</h3>
          <p>${esc(L(p.collection))} · ${t('gp.code')}: <b>${esc(code)}</b></p>
        </div>
      </header>
      <h4 class="gp-sub">${t('gp.impact')}</h4>
      <div class="gp-grid">
        <section class="gp-box">
          <h4><i class="fa-solid fa-bottle-water"></i> ${t('gp.madeFrom')}</h4>
          <ul class="gp-materials">${materials}</ul>
          <div class="gp-impact">
            <div><b>${fmt(p.bottles)}</b><span>${t('gp.bottles')}</span></div>
            <div><b>${fmt(p.plasticKg)} kg</b><span>${t('gp.plastic')}</span></div>
            <div><b>${fmt(p.co2Kg)} kg</b><span>${t('gp.co2')}</span></div>
          </div>
        </section>
        <section class="gp-box">
          <h4><i class="fa-solid fa-route"></i> ${t('gp.journey')}</h4>
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
      s.onload = ok; s.onerror = () => fail(new Error(t('gp.libError')));
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
    scanStatus.textContent = t('gp.scanOpening');
    try {
      const decode = await getDecoder();
      if (!navigator.mediaDevices?.getUserMedia) throw new Error(t('gp.noCamera'));
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      video.srcObject = stream;
      await video.play();
      scanStatus.textContent = t('gp.scanPoint');
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
      scanStatus.textContent = t('gp.cameraError', { msg: err.message });
    }
  }

  document.getElementById('gpScanBtn').onclick = startScan;
  document.getElementById('gpScanClose').onclick = stopScan;
  document.getElementById('gpFile').onchange = async e => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    scanStatus.textContent = t('gp.reading');
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await img.decode();
      const text = await (await getDecoder())(img);
      URL.revokeObjectURL(img.src);
      text ? onDecoded(text) : (scanStatus.textContent = t('gp.noQr'));
    } catch (err) {
      scanStatus.textContent = t('gp.readError', { msg: err.message });
    }
  };

  // Đổi ngôn ngữ: vẽ lại kết quả đang hiển thị
  document.addEventListener('langchange', () => { if (lastCode) lookup(lastCode); });

  // Deep link từ QR in trên sản phẩm: ?passport=UG-RENO-001
  const initial = new URLSearchParams(location.search).get('passport');
  if (initial) lookup(initial, { scroll: true });
})();
