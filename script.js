/* ── LOADER ── */
const loader = document.getElementById('loader');
const loaderPct = document.getElementById('loaderPct');
let pct = 0;
const pctInterval = setInterval(() => {
  pct += Math.floor(Math.random() * 12) + 3;
  if (pct >= 100) {
    pct = 100;
    clearInterval(pctInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.querySelector('.hero-content').classList.add('hero-loaded');
    }, 300);
  }
  loaderPct.textContent = String(pct).padStart(3, '0');
}, 60);

/* ── PARTICLES ── */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 1.2 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.life = Math.random();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life += 0.003;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    const pulse = Math.sin(this.life * Math.PI * 2) * 0.5 + 0.5;
    ctx.globalAlpha = this.opacity * pulse;
    ctx.fillStyle = Math.random() > 0.95 ? '#ff4d00' : '#f0ede8';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
}
animParticles();

/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '6px'; cursor.style.height = '6px';
    ring.style.width = '52px'; ring.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px'; cursor.style.height = '10px';
    ring.style.width = '36px'; ring.style.height = '36px';
  });
});

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-primary, .btn-ghost, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ── CLOCK ── */
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
updateClock();
setInterval(updateClock, 1000);

/* ── SCROLL REVEAL + COUNTERS ── */
const reveals = document.querySelectorAll('.reveal, .reveal-grid');
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  const update = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(ease * target) + (el.dataset.suffix || '');
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.dataset.target));
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* ── AÑO DINÁMICO ── */
const currentYear = new Date().getFullYear();
document.querySelectorAll('#footer-year, #contact-year').forEach(el => {
  el.textContent = currentYear;
});

/* ── NAV scroll state ── */
const nav = document.querySelector('nav');
const heroScrollEl = document.querySelector('.hero-scroll');
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(10,10,10,0.97)'
    : 'linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)';
  if (heroScrollEl && heroSection) {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    heroScrollEl.style.opacity = heroBottom < 100 ? '0' : '1';
    heroScrollEl.style.pointerEvents = heroBottom < 100 ? 'none' : 'auto';
  }
});
