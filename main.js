// Mobile menu + search
const menu = document.getElementById('menu');
document.getElementById('burger').onclick = () => menu.classList.toggle('open');
menu.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
document.getElementById('searchToggle').onclick = () => document.getElementById('searchBar').classList.toggle('open');

// Hero slider
const track = document.getElementById('heroTrack');
const slides = track.children.length;
const dots = document.getElementById('heroDots');
let cur = 0, timer;
for (let i = 0; i < slides; i++) {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Slide ' + (i + 1));
  b.onclick = () => go(i);
  dots.appendChild(b);
}
function go(i) {
  cur = (i + slides) % slides;
  track.style.transform = `translateX(-${cur * 100}%)`;
  [...dots.children].forEach((d, k) => d.classList.toggle('on', k === cur));
  clearInterval(timer);
  timer = setInterval(() => go(cur + 1), 5000);
}
document.querySelectorAll('.hero-nav').forEach(b => b.onclick = () => go(cur + +b.dataset.dir));
go(0);

// Banner carousel
document.querySelectorAll('[data-carousel]').forEach(c => {
  const t = c.querySelector('.carousel-track');
  let idx = 0;
  const move = d => {
    const item = t.children[0];
    const step = item.offsetWidth + 20;
    const visible = Math.round(c.offsetWidth / step) || 1;
    const max = Math.max(0, t.children.length - visible);
    idx = idx + d > max ? 0 : idx + d < 0 ? max : idx + d;
    t.style.transform = `translateX(-${idx * step}px)`;
  };
  c.querySelector('.prev').onclick = () => move(-1);
  c.querySelector('.next').onclick = () => move(1);
  setInterval(() => move(1), 4500);
});

// Product accordion
document.querySelectorAll('.acc-item').forEach(item => {
  const activate = () => {
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  };
  item.addEventListener('mouseenter', activate);
  item.addEventListener('click', activate);
});

// Partner marquee (duplicated for seamless loop)
const partners = [
  ['bo-tnmt', 'Bộ Tài nguyên và Môi trường'], ['storii', 'Storii'], ['bo-nnptnt', 'Bộ Nông nghiệp và PTNT'],
  ['tetra-pak', 'Tetra Pak'], ['fwd', 'FWD'], ['coca-cola', 'Coca-Cola'], ['pepsico-food', 'Pepsico Food'],
  ['wwf', 'WWF'], ['suntory-pepsico', 'Suntory Pepsico'], ['audi', 'Audi'], ['mercedes', 'Mercedes'], ['unilever', 'Unilever']
];
['marquee', 'marquee2'].forEach((id, n) => {
  const el = document.getElementById(id);
  const list = n ? [...partners].reverse() : partners;
  el.innerHTML = [...list, ...list].map(([f, name]) =>
    `<div class="plogo"><img src="images/partners/${f}.webp" alt="${name}" title="${name}" loading="lazy"></div>`).join('');
});

// Reveal on scroll + counters
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-count]').forEach(el => {
    const end = +el.dataset.count, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / 1600, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  io.unobserve(e.target);
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Back to top
const toTop = document.getElementById('toTop');
addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 500));
