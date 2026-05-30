# CUFA.DEV — Contexto del Proyecto

> Este archivo es la fuente de verdad del proyecto. Leelo completo antes de tocar cualquier archivo.

---

## Identidad de marca

| Campo | Valor |
|-------|-------|
| Marca | CUFA |
| Nombre real | Facundo González |
| URL | cufa.dev |
| Ubicación | Buenos Aires, Argentina |
| Email | facundomi.gonzalez@gmail.com |
| WhatsApp | +54 9 11 6889-0563 |
| Instagram | @cufa.dev |

### Propuesta de valor
No soy un dev que sabe sacar fotos. Soy una agencia de uno (con equipo cuando el proyecto lo requiere) que entrega el ecosistema digital completo de un cliente: desarrollo web, fotografía de producto/eventos, automatización con IA y producción de contenido.

**Industrias target:**
- Gastronomía (menús digitales, fotografía de platos, identidad)
- Eventos (casamientos, corporativos — cabina digital, save the date, cobertura)
- Estudios profesionales (jurídicos, contables, médicos)
- Startups y SaaS

---

## Stack técnico del CLIENTE (lo que ofrezco)

- Frontend: React, Vite, HTML/CSS/JS vanilla
- Backend: Node.js, Python (Flask / FastAPI)
- Bases de datos: Supabase, MongoDB, MySQL
- Automatización: n8n, Zapier, APIs, LLMs
- Fotografía: producto, eventos, retrato, gastronomía
- Producción visual: identidad, contenido, cabina fotográfica

---

## Stack técnico del PORTFOLIO (este proyecto)

```
cufa.dev/
├── index.html        # estructura y marcado semántico
├── css/
│   └── styles.css    # todos los estilos, sin excepción
├── js/
│   └── main.js       # toda la lógica JS, sin excepción
└── assets/
    ├── img/          # fotos y screenshots
    ├── og-image.jpg  # 1200x630 para Open Graph
    └── favicon/      # generado en realfavicongenerator.net
```

> **Regla absoluta:** cero inline styles en el HTML salvo atributos de accesibilidad.
> Todo CSS va en `styles.css`. Todo JS va en `main.js`.

---

## Design system

### Colores
```css
--bg:          #0a0a0a   /* fondo principal */
--surface:     #111111   /* superficies (cards, nav) */
--surface2:    #1a1a1a   /* superficies secundarias */
--orange:      #ff4d00   /* acento principal */
--orange-dim:  #cc3d00   /* acento hover */
--text:        #f0ede8   /* texto principal */
--text-muted:  #888880   /* texto secundario */
--text-dim:    #444440   /* texto terciario / placeholders */
--border:      rgba(255,255,255,0.07)
```

### Tipografía
| Rol | Fuente | Uso |
|-----|--------|-----|
| Display | Bebas Neue | Títulos de sección, hero name |
| Mono | Space Mono | Labels, tags, metadata, eyebrows |
| Body | DM Sans | Párrafos, descripciones |

### Escala tipográfica
- Hero name: `clamp(5rem, 10vw, 9rem)`
- Section title: `clamp(3rem, 6vw, 6rem)`
- Subsection: 16–18px / weight 500
- Body: 15px / weight 400 / line-height 1.6–1.8
- Labels/tags: 9–11px / Space Mono / letter-spacing 0.15–0.2em / uppercase

### Espaciado
- Secciones: `padding: 6rem 3rem` (desktop) / `4rem 1.5rem` (mobile)
- Cards: `padding: 1.5rem`
- Gap entre elementos: 1px (grids con línea separadora), 12–16px (gap normal)

### Bordes y radios
- Sin border-radius (estética brutalista/editorial)
- Separadores: `1px solid var(--border)`
- Líneas decorativas: `0.5px` o `1px`

---

## Arquitectura de secciones

```
1. NAV          — fixed, logo + links + CTA
2. HERO         — split: foto B&N izq / contenido der + reloj en vivo
3. MARQUEE      — strip animado con keywords
4. PROPUESTA    — "Dev que entiende el visual" + 4 items
5. CASOS        — grid 12col con casos de estudio por industria
6. FOTOGRAFIA   — galería curada como evidencia visual
7. STACK        — tecnologías
8. CONTACTO     — split: título izq / links contacto der
9. FOOTER
```

---

## Sistema de animaciones (ya implementado — NO modificar)

| Elemento | Clase / ID | Descripción |
|----------|-----------|-------------|
| Loader | `#loader` | Pantalla de entrada con glitch + barra de progreso |
| Partículas | `#particles` | Canvas fijo con 80 partículas flotantes |
| Cursor | `#cursor` + `#cursorRing` | Cursor custom con lag ring |
| Scanline | `hero::before` | Línea naranja que recorre el hero |
| Marquee | `.marquee-track` | Loop de keywords entre secciones |
| Scroll reveal | `.reveal` | fadeUp al entrar en viewport (IntersectionObserver) |
| Stagger grid | `.reveal-grid` | Hijos aparecen en cascada con delay |
| Magnetic | `.btn-primary`, `.btn-ghost`, `.nav-cta` | Botones siguen el mouse |
| Glitch logo | `.nav-logo:hover` | Efecto RGB split en hover |
| Nav scroll | `nav` | Cambia a sólido al bajar 60px |

**Para agregar elementos animados:**
- Elemento que entra solo → agregar clase `.reveal`
- Grid cuyos hijos entran en cascada → agregar clase `.reveal-grid` al contenedor

---

## Nomenclatura de clases CSS

Patrón: `[sección]-[elemento]__[modificador]`

```
.hero-content
.hero-name
.caso-card
.caso-card.large        ← modificador de tamaño
.caso-thumb
.caso-info
.caso-tag
.foto-item
.foto-item.tall         ← ocupa 2 filas en grid
.stack-item
.contacto-link
```

**Prefijos por sección:**
`hero-` / `nav-` / `propuesta-` / `caso-` / `foto-` / `stack-` / `contacto-` / `footer-`

---

## Grid de proyectos/casos (12 columnas)

```css
/* Tamaños disponibles */
.caso-card.large   → grid-column: span 7
.caso-card.small   → grid-column: span 5
.caso-card.medium  → grid-column: span 6
.caso-card.wide    → grid-column: span 12

/* Mobile: todos span 12 */
```

---

## SEO — lo que está implementado (NO tocar el head)

- Title / description / keywords / canonical / theme-color
- Open Graph completo (FB, LinkedIn, WhatsApp)
- Twitter/X Card summary_large_image
- Schema.org JSON-LD: Person + WebSite + ProfessionalService + BreadcrumbList
- Atributos semánticos: aria-label, aria-labelledby, itemscope, itemprop, roles

**Pendiente (tarea del owner, no del agente):**
- Subir `og-image.jpg` 1200×630
- Generar favicons en realfavicongenerator.net
- Actualizar sameAs con URLs reales

---

## Reglas de trabajo para el agente

### Antes de cada tarea
1. Indicar qué archivo se va a modificar
2. Indicar qué bloque exacto se va a tocar
3. Explicar qué cambia y por qué

### Modificaciones
- Trabajar con bloques quirúrgicos — nunca reescribir archivos completos
- Si el cambio afecta más del 30% de un archivo, pedir confirmación antes
- No tocar el `<head>` salvo que la tarea lo requiera explícitamente
- No tocar el sistema de animaciones salvo que la tarea lo requiera explícitamente
- No agregar librerías externas sin consultarlo primero

### CSS
- Todo en `styles.css`, organizado por sección con comentarios de bloque:
  ```css
  /* ══════════════════════════════════
     NOMBRE DE SECCIÓN
  ══════════════════════════════════ */
  ```
- Variables siempre desde `:root`, nunca hardcodear colores
- Mobile-first dentro de cada sección nueva

### JS
- Todo en `main.js`, funciones nombradas y agrupadas por feature
- Sin `console.log` en producción
- Preferir `const` / `let`, nunca `var`
- IntersectionObserver para cualquier animación basada en scroll

### HTML
- Cero inline styles
- Alt text descriptivo en todas las `<img>`
- Mantener la jerarquía de headings: un solo `<h1>` (hero), `<h2>` por sección, `<h3>` en cards

---

## Casos de estudio — estructura tipo

Cada caso debe documentar el ecosistema completo entregado:

```
Nombre del cliente / proyecto
├── Industria
├── Servicios entregados (de la lista abajo)
├── Tecnologías usadas
├── Screenshot o foto destacada
└── Resultado / métrica si existe
```

**Servicios posibles por caso:**
`Fotografía de producto` / `Fotografía de eventos` / `Cabina fotográfica` /
`Save the date` / `Identidad visual` / `Menú digital` / `Landing page` /
`Plataforma web` / `Panel admin` / `Automatización` / `Integración de pagos`

---

*Última actualización: Mayo 2025*
