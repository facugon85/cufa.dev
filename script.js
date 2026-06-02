/* ── LOADER ── */
const loader = document.getElementById('loader');
const loaderPct = document.getElementById('loaderPct');
let pct = 0;

function tickLoader() {
  const r = Math.random();
  let delta, delay;

  if (r < 0.07) {
    // retroceso brusco
    delta = -(Math.floor(Math.random() * 6) + 2);
    delay = Math.floor(Math.random() * 150) + 80;
  } else if (r < 0.22) {
    // congelado
    delta = 0;
    delay = Math.floor(Math.random() * 700) + 350;
  } else if (r < 0.38) {
    // salto rápido
    delta = Math.floor(Math.random() * 9) + 6;
    delay = Math.floor(Math.random() * 50) + 20;
  } else {
    // avance lento normal
    delta = Math.floor(Math.random() * 3) + 1;
    delay = Math.floor(Math.random() * 220) + 100;
  }

  pct = Math.max(0, Math.min(99, pct + delta));
  loaderPct.textContent = String(pct).padStart(3, '0');
  setTimeout(tickLoader, delay);
}

const MIN_LOADER_MS = 2500;
const loaderStart = Date.now();

window.addEventListener('load', () => {
  const elapsed = Date.now() - loaderStart;
  const wait = Math.max(0, MIN_LOADER_MS - elapsed);
  setTimeout(() => {
    pct = 100;
    loaderPct.textContent = '100';
    setTimeout(() => {
      loader.classList.add('hidden');
      document.querySelector('.hero-content').classList.add('hero-loaded');
    }, 400);
  }, wait);
});

tickLoader();

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

/* ── LANGUAGE TOGGLE ── */
const translations = {
  es: {
    'nav.casos': 'Casos',
    'nav.galeria': 'Galería',
    'nav.stack': 'Stack',
    'nav.cta': 'Hablemos →',
    'hero.eyebrow': 'Creador Digital',
    'hero.tagline': 'Desarrollo web · Automatización<br>Producción visual · SaaS escalable<br>Buenos Aires, Argentina',
    'hero.hora': 'Hora',
    'hero.estado.label': 'Estado',
    'hero.estado.value': 'Disponible para proyectos',
    'hero.btn.proyectos': 'Ver Proyectos ↓',
    'hero.scroll': 'Scroll',
    'propuesta.label': 'Propuesta de valor',
    'propuesta.titulo': 'Dev que<br><span>entiende</span><br>el visual.',
    'propuesta.desc': 'No solo construyo lo que me pedís — diseño soluciones digitales que funcionan y se ven bien. La combinación de criterio visual, capacidad técnica y automatización es lo que diferencia un proyecto promedio de uno memorable.',
    'propuesta.01.title': 'Frontend de alto impacto',
    'propuesta.01.desc': 'React, Vite, animaciones fluidas. Interfaces que convierten y que los usuarios disfrutan usar.',
    'propuesta.02.title': 'SaaS & sistemas complejos',
    'propuesta.02.desc': 'Plataformas multitenant, paneles admin, integraciones API. Arquitecturas que escalan.',
    'propuesta.03.title': 'Automatización inteligente',
    'propuesta.03.desc': 'Flujos con IA, integraciones con n8n, Zapier, APIs. Procesos que corren solos.',
    'propuesta.04.title': 'Criterio visual de productor',
    'propuesta.04.desc': 'Años de fotografía aplicados al producto digital. Sé lo que se ve bien y por qué.',
    'casos.label': 'Casos de estudio',
    'casos.titulo': 'Ecosistemas<br><span>completos.</span>',
    'casos.desc': 'No vendo servicios sueltos — armo el ecosistema digital completo para cada cliente. Web, identidad, fotografía y automatización bajo una sola visión.',
    'caso.001.industry': 'Cervecería',
    'caso.002.industry': 'Estudios profesionales',
    'caso.003.industry': 'Startups',
    'caso.003.loading': 'Captura próximamente',
    'caso.004.industry': 'Entretenimiento',
    'caso.005.industry': 'Gastronomía',
    'caso.006.industry': 'SaaS / Construcción',
    'caso.007.industry': 'Producto personal',
    'caso.008.industry': 'Gastronomía',
    'caso.001.eco': '<li>Web institucional para cervecería artesanal</li><li>Identidad digital y comunicación de marca</li><li>Catálogo de productos y punto de contacto</li><li>Sistema de alquiler de choperas para eventos</li><li>Compra de birras sin hacer colas vía QR</li>',
    'caso.002.eco': '<li>Plataforma SaaS con gestión de casos</li><li>Panel administrativo completo</li><li>Sesión de fotos para la web</li>',
    'caso.003.eco': '<li>Landing de conversión + plataforma</li><li>Integración de pagos Stripe</li><li>Dashboard de métricas</li>',
    'caso.004.eco': '<li>Web para sala de arcade y entretenimiento</li><li>Catálogo de máquinas y reservas online</li><li>Blog de cultura gamer y novedades</li><li>Identidad digital y producción visual</li>',
    'caso.005.eco': '<li>Web completa con menú y e-commerce</li><li>Sistema de pedidos online</li><li>Sesión fotográfica de productos y espacio</li><li>Identidad digital y redes sociales</li>',
    'caso.006.eco': '<li>App de cotización de materiales para construcción en seco</li><li>Cálculo automático por tipo y dimensión de obra</li><li>Deploy en Vercel con actualizaciones en tiempo real</li>',
    'caso.007.eco': '<li>Anotador digital para Truco, Chinchón, Escoba y Generala</li><li>Diseño brutalista — tipografía pesada, grillas rotas, sin ornamentos</li><li>Producto propio, open source</li>',
    'caso.008.eco': '<li>Landing pre-lanzamiento con countdown activo</li><li>Sistema de pedidos online</li><li>Captación de emails y lista de espera</li><li>Identidad visual para panadería artesanal BA</li>',
    'caso.link': 'Ver proyecto',
    'galeria.label': 'Ojo visual',
    'galeria.titulo': 'Foto<br><span>grafía</span>',
    'galeria.desc': 'La misma sensibilidad que aplico a la fotografía callejera, gastronómica y documental la traigo al producto digital. El ojo que distingue una buena composición también distingue una buena interfaz.',
    'stack.label': 'Stack técnico',
    'contacto.label': 'Siguiente paso',
    'contacto.label.footer': 'Contacto',
    'contacto.titulo': 'Hable<br><span>mos.</span>',
    'contacto.meta': 'Buenos Aires, Argentina<br>Disponible para proyectos remotos<br>y presenciales · <span id="contact-year">' + new Date().getFullYear() + '</span>',
    'footer.copy': '© <span id="footer-year">' + new Date().getFullYear() + '</span> CUFA · Hecho con 🧉 en Buenos Aires · <span style="font-family:var(--mono);opacity:0.4;font-size:10px;">v2.0</span>',
  },
  en: {
    'nav.casos': 'Cases',
    'nav.galeria': 'Gallery',
    'nav.stack': 'Stack',
    'nav.cta': "Let's talk →",
    'hero.eyebrow': 'Digital Creator',
    'hero.tagline': 'Web development · Automation<br>Visual production · Scalable SaaS<br>Buenos Aires, Argentina',
    'hero.hora': 'Time',
    'hero.estado.label': 'Status',
    'hero.estado.value': 'Available for projects',
    'hero.btn.proyectos': 'View Projects ↓',
    'hero.scroll': 'Scroll',
    'propuesta.label': 'Value proposition',
    'propuesta.titulo': 'Dev that<br><span>gets</span><br>the visual.',
    'propuesta.desc': "I don't just build what you ask — I design digital solutions that work and look good. The combination of visual judgment, technical skill, and automation is what separates an average project from a memorable one.",
    'propuesta.01.title': 'High-impact Frontend',
    'propuesta.01.desc': 'React, Vite, smooth animations. Interfaces that convert and that users enjoy using.',
    'propuesta.02.title': 'SaaS & complex systems',
    'propuesta.02.desc': 'Multitenant platforms, admin panels, API integrations. Architectures that scale.',
    'propuesta.03.title': 'Smart automation',
    'propuesta.03.desc': 'AI-powered workflows, integrations with n8n, Zapier, APIs. Processes that run themselves.',
    'propuesta.04.title': "Producer's visual eye",
    'propuesta.04.desc': 'Years of photography applied to digital products. I know what looks good and why.',
    'casos.label': 'Case studies',
    'casos.titulo': 'Complete<br><span>ecosystems.</span>',
    'casos.desc': "I don't sell isolated services — I build the complete digital ecosystem for each client. Web, identity, photography, and automation under a single vision.",
    'caso.001.industry': 'Brewery',
    'caso.002.industry': 'Professional Offices',
    'caso.003.industry': 'Startups',
    'caso.003.loading': 'Screenshot coming soon',
    'caso.004.industry': 'Entertainment',
    'caso.005.industry': 'Gastronomy',
    'caso.006.industry': 'SaaS / Construction',
    'caso.007.industry': 'Personal Product',
    'caso.008.industry': 'Gastronomy',
    'caso.001.eco': '<li>Institutional website for craft brewery</li><li>Digital identity and brand communication</li><li>Product catalog and contact point</li><li>Beer tap rental system for events</li><li>Queue-free beer purchase via QR</li>',
    'caso.002.eco': '<li>SaaS platform with case management</li><li>Complete admin panel</li><li>Photo session for the website</li>',
    'caso.003.eco': '<li>Conversion landing + platform</li><li>Stripe payment integration</li><li>Metrics dashboard</li>',
    'caso.004.eco': '<li>Website for arcade and entertainment venue</li><li>Machine catalog and online reservations</li><li>Gamer culture blog and news</li><li>Digital identity and visual production</li>',
    'caso.005.eco': '<li>Full website with menu and e-commerce</li><li>Online ordering system</li><li>Product and space photo session</li><li>Digital identity and social media</li>',
    'caso.006.eco': '<li>Materials quoting app for dry construction</li><li>Automatic calculation by project type and dimensions</li><li>Vercel deploy with real-time updates</li>',
    'caso.007.eco': '<li>Digital scorekeeper for Truco, Chinchón, Escoba and Generala</li><li>Brutalist design — heavy typography, broken grids, no ornaments</li><li>Own product, open source</li>',
    'caso.008.eco': '<li>Pre-launch landing with active countdown</li><li>Online ordering system</li><li>Email capture and waitlist</li><li>Visual identity for BA artisan bakery</li>',
    'caso.link': 'View project',
    'galeria.label': 'Visual eye',
    'galeria.titulo': 'Photo<br><span>graphy</span>',
    'galeria.desc': 'The same sensibility I apply to street, gastronomic, and documentary photography I bring to the digital product. The eye that distinguishes a good composition also distinguishes a good interface.',
    'stack.label': 'Technical stack',
    'contacto.label': 'Next step',
    'contacto.label.footer': 'Contact',
    'contacto.titulo': "Let's<br><span>talk.</span>",
    'contacto.meta': 'Buenos Aires, Argentina<br>Available for remote and in-person<br>projects · <span id="contact-year">' + new Date().getFullYear() + '</span>',
    'footer.copy': '© <span id="footer-year">' + new Date().getFullYear() + '</span> CUFA · Made with 🧉 in Buenos Aires · <span style="font-family:var(--mono);opacity:0.4;font-size:10px;">v2.0</span>',
  }
};

let currentLang = 'es';

function applyLang(lang) {
  const els = document.querySelectorAll('[data-i18n]');
  els.forEach(el => el.classList.add('lang-out'));
  setTimeout(() => {
    els.forEach(el => {
      const val = translations[lang][el.dataset.i18n];
      if (val !== undefined) el.innerHTML = val;
    });
    document.getElementById('lang-label').textContent = lang === 'es' ? 'EN' : 'ES';
    document.documentElement.lang = lang;
    currentLang = lang;
    els.forEach(el => el.classList.remove('lang-out'));
  }, 350);
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  applyLang(currentLang === 'es' ? 'en' : 'es');
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
