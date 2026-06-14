/* ── LOADER ── */
const loader = document.getElementById('loader');
const loaderPct = document.getElementById('loaderPct');
let pct = 0;

function tickLoader() {
  const r = Math.random();
  let delta, delay;
  if (r < 0.07) {
    delta = -(Math.floor(Math.random() * 6) + 2);
    delay = Math.floor(Math.random() * 150) + 80;
  } else if (r < 0.22) {
    delta = 0;
    delay = Math.floor(Math.random() * 700) + 350;
  } else if (r < 0.38) {
    delta = Math.floor(Math.random() * 9) + 6;
    delay = Math.floor(Math.random() * 50) + 20;
  } else {
    delta = Math.floor(Math.random() * 3) + 1;
    delay = Math.floor(Math.random() * 220) + 100;
  }
  pct = Math.max(0, Math.min(99, pct + delta));
  loaderPct.textContent = String(pct).padStart(3, '0');
  setTimeout(tickLoader, delay);
}

const MIN_LOADER_MS = 2000;
const loaderStart = Date.now();

window.addEventListener('load', () => {
  const elapsed = Date.now() - loaderStart;
  const wait = Math.max(0, MIN_LOADER_MS - elapsed);
  setTimeout(() => {
    pct = 100;
    loaderPct.textContent = '100';
    setTimeout(() => loader.classList.add('hidden'), 400);
  }, wait);
});

tickLoader();

/* ── GALERÍA ── */
const fotos = [
  { src: 'photo33.webp',           alt: 'Fotografía 033',          num: '033',  clase: 'tall' },
  { src: 'photo46.webp',           alt: 'Fotografía 046',          num: '046'                },
  { src: 'photo74.webp',           alt: 'Fotografía 074',          num: '074',  clase: 'wide' },
  { src: 'photo4.webp',            alt: 'Fotografía 004',          num: '004'                },
  { src: 'photo67.webp',           alt: 'Fotografía 067',          num: '067',  clase: 'tall' },
  { src: 'photo50.webp',           alt: 'Fotografía 050',          num: '050'                },
  { src: 'photo86.webp',           alt: 'Fotografía 086',          num: '086'                },
  { src: '_CSC1687.webp',          alt: 'Fotografía 1687',         num: '1687', clase: 'wide' },
  { src: 'photo91.webp',           alt: 'Fotografía 091',          num: '091',  clase: 'tall' },
  { src: 'photo6.webp',            alt: 'Fotografía 006',          num: '006'                },
  { src: 'photo89.webp',           alt: 'Fotografía 089',          num: '089'                },
  { src: 'photo92.webp',           alt: 'Fotografía 092',          num: '092'                },
  { src: 'photo9.webp',            alt: 'Fotografía 009',          num: '009',  clase: 'tall' },
  { src: 'DSC_0005.webp',          alt: 'Fotografía DSC0005',      num: '0005'               },
  { src: '_CSC0802.webp',          alt: 'Fotografía CSC0802',      num: '0802'               },
  { src: 'garibaldi059.webp',      alt: 'Fotografía Garibaldi 059',num: 'G059', clase: 'wide' },
  { src: '_CSC2067.webp',          alt: 'Fotografía CSC2067',      num: '2067', clase: 'tall' },
  { src: 'DSC_0136.webp',          alt: 'Fotografía DSC0136',      num: '0136'               },
  { src: 'IMG_0097.webp',          alt: 'Fotografía IMG0097',      num: '0097'               },
  { src: 'DSC_1458.webp',          alt: 'Fotografía DSC1458',      num: '1458'               },
  { src: '_CSC9057.webp',          alt: 'Fotografía CSC9057',      num: '9057', clase: 'tall' },
  { src: 'DSC_0242.webp',          alt: 'Fotografía DSC0242',      num: '0242'               },
  { src: 'DSC_0374-Editar-2.webp', alt: 'Fotografía DSC0374',      num: '0374', clase: 'wide' },
  { src: '_CSC1651.webp',          alt: 'Fotografía CSC1651',      num: '1651'               },
  { src: 'garibaldi110.webp',      alt: 'Fotografía Garibaldi 110',num: 'G110'               },
  { src: 'DSC_0250.webp',          alt: 'Fotografía DSC0250',      num: '0250', clase: 'tall' },
  { src: '_CSC1735.webp',          alt: 'Fotografía CSC1735',      num: '1735'               },
  { src: 'DSC_0383.webp',          alt: 'Fotografía DSC0383',      num: '0383'               },
  { src: 'segundatanda.webp',      alt: 'Fotografía Segunda Tanda',num: 'S·T',  clase: 'wide' },
  { src: '_CSC2131.webp',          alt: 'Fotografía CSC2131',      num: '2131'               },
  { src: 'DSC_0388.webp',          alt: 'Fotografía DSC0388',      num: '0388'               },
  { src: '_CSC5271.webp',          alt: 'Fotografía CSC5271',      num: '5271', clase: 'tall' },
  { src: '_CSC2178.webp',          alt: 'Fotografía CSC2178',      num: '2178'               },
  { src: 'DSC_0392-Editar.webp',   alt: 'Fotografía DSC0392',      num: '0392', clase: 'wide' },
  { src: '_CSC2188.webp',          alt: 'Fotografía CSC2188',      num: '2188'               },
  { src: 'final33.webp',           alt: 'Fotografía Final 33',     num: 'F33'                },
  { src: '_CSC5698.webp',          alt: 'Fotografía CSC5698',      num: '5698', clase: 'tall' },
  { src: 'DSC_0567.webp',          alt: 'Fotografía DSC0567',      num: '0567'               },
  { src: 'IMG_0582.webp',          alt: 'Fotografía IMG0582',      num: '0582'               },
  { src: '_CSC8493.webp',          alt: 'Fotografía CSC8493',      num: '8493'               },
  { src: 'DSC_7568.webp',          alt: 'Fotografía DSC7568',      num: '7568', clase: 'wide' },
  { src: '_CSC8699.webp',          alt: 'Fotografía CSC8699',      num: '8699'               },
  { src: '_CSC8498-6.webp',        alt: 'Fotografía CSC8498',      num: '8498', clase: 'tall' },
  { src: 'DSC_1483.webp',          alt: 'Fotografía DSC1483',      num: '1483'               },
];

function renderGrid() {
  const grid = document.getElementById('galeria-grid');
  grid.innerHTML = fotos.map(({ src, alt, num, clase }) => `
    <div class="grid-item${clase ? ' ' + clase : ''}">
      <img src="img/fotos/${src}" alt="${alt}" loading="lazy">
      <div class="grid-overlay"><span class="grid-num">${num}</span></div>
    </div>
  `).join('');
}

function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.grid-item').forEach((item, i) => {
    item.style.transitionDelay = `${(i % 4) * 70}ms`;
    observer.observe(item);
  });
}

renderGrid();
initCursor();
initScrollReveal();

const currentYear = new Date().getFullYear();
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = currentYear;
const galeriaYearEl = document.getElementById('galeria-year');
if (galeriaYearEl) galeriaYearEl.textContent = currentYear;
