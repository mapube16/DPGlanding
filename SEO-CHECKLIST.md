# SEO Checklist 2026 → estado en este proyecto

Mapeo de las cuatro hojas del checklist contra lo que hay construido.

- **Hecho** — resuelto en el código; `npm run check:seo` lo verifica cuando aplica.
- **Config** — el código está listo pero necesita un dato o una cuenta del cliente.
- **Externo** — depende de una herramienta o de tráfico real; no se puede cerrar desde el repo.

---

## Hoja 1 · General Website

| Ítem | Estado | Dónde / qué falta |
|---|---|---|
| Sitemap (`sitemap_index.xml`) | Hecho | [src/app/sitemap.ts](src/app/sitemap.ts); `public/sitemap_index.xml` apunta a `/sitemap.xml` |
| Image sitemap | Hecho | mismo archivo, campo `images` por ruta |
| Rastreable e indexable + alta en Search Console y Bing | Config | el HTML es estático y rastreable sin JS; falta dar de alta las propiedades |
| `llms.txt` | Hecho | [public/llms.txt](public/llms.txt) |
| `robots.txt` declara sitemap y GPTBot → `/llms.txt` | Hecho | [src/app/robots.ts](src/app/robots.ts) |
| Permitir agentes de IA (OAI-SearchBot, ChatGPT-User, PerplexityBot, FirecrawlAgent, AndiBot, ExaBot) y buscadores (Googlebot, Bingbot) | Hecho | mismo archivo, 20 agentes declarados |
| Propiedad en HTTPS para usar disavow | Config | depende del hosting y del alta en Search Console |
| Mobile-friendly | Hecho | todas las secciones tienen breakpoints; el anillo colapsa a grilla |
| PageSpeed (perf > 65, resto > 90) | Config | HTML estático, fuentes autohospedadas, hero de 89 KB, cero JS de terceros salvo GTM. Medir en el dominio real |
| SSL / HTTPS | Config | lo da el hosting |
| Diseño moderno | Hecho | implementación del Figma "Landing DPG" |
| Sin interstitials agresivos | Hecho | no hay popups |
| Páginas de confianza (privacidad, términos) | Hecho | `/politica-de-privacidad/`, `/terminos-y-condiciones/` — **borradores, requieren revisión legal** |
| Biografías de autor detalladas | Config | bloque SME en cada página; falta confirmar nombre y credenciales reales en [src/lib/content.ts](src/lib/content.ts) |
| Un `<title>` y un `<h1>` por página | Hecho | verificado por `check:seo` |
| Canonical en páginas duplicadas | Hecho | [src/lib/seo.ts](src/lib/seo.ts) → `alternates.canonical` |
| Redirigir www / no-www y HTTP → HTTPS | Config | regla del hosting; ver README |
| Hreflang | Hecho | `es-CO` + `x-default` en todas las páginas |
| Breadcrumbs | Hecho | [src/components/Breadcrumbs.tsx](src/components/Breadcrumbs.tsx), visibles + `BreadcrumbList` |
| Datos estructurados (JSON-LD) | Hecho | `InsuranceAgency`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList` |
| Todo el tracking por GTM | Hecho | [src/components/Gtm.tsx](src/components/Gtm.tsx); no se inyecta si falta el ID |
| Desindexar paginadores y tags | N/A | no hay paginación ni tags |
| Profundidad de rastreo < 3 clics | Hecho | todas las páginas están a 1 clic desde la home |
| Contenido delgado (word count) | Hecho | `check:seo` falla por debajo de 300 palabras; el mínimo actual es 674 |
| Screaming Frog: redirect chains, 404 con backlinks, enlaces rotos | Externo | correr el crawl tras publicar |
| Semrush/Ahrefs: backlinks tóxicos, canibalización, páginas con backlinks sin tráfico | Externo | requiere el dominio en producción |
| Siteliner: contenido duplicado | Externo | — |
| GA4: engagement rate | Externo | requiere tráfico |
| Ortografía y gramática | Config | pasar el copy por Grammarly / Language Tool en español |

## Hoja 2 y 3 · On-page por página

Aplicado a las seis páginas indexables. Keyword principal por URL en [src/lib/site.ts](src/lib/site.ts):

| URL | Keyword |
|---|---|
| `/` | seguros en Armenia |
| `/seguro-de-viajes/` | seguro de viajes |
| `/seguro-de-arrendamiento/` | seguro de arrendamiento |
| `/seguro-por-kilometro/` | seguro por kilómetro |
| `/asesoria-en-seguros/` | asesoría en seguros |
| `/nosotros/` | corredor de seguros en Armenia |

| Ítem | Estado | Nota |
|---|---|---|
| Keyword en URL, con guiones y sin stop words | Hecho | |
| Keyword en title, meta description y H1 | Hecho | |
| H1 distinto del title | Hecho | verificado por `check:seo` |
| H1 sobre el pliegue | Hecho | |
| Un solo H1, jerarquía sin saltos | Hecho | verificado por `check:seo` |
| Keyword en la primera frase | Hecho | el párrafo de entrada de cada página abre con la keyword |
| Sinónimo en el primer H2 | Hecho | |
| Keyword en nombre de archivo y alt de la imagen principal | Hecho | ej. `hero-paisaje-seguros-dpg`, `aria-asesoria-personalizada-seguros.svg` |
| Todas las imágenes con alt descriptivo | Hecho | verificado por `check:seo`; los 18 logos llevan alt propio |
| Imágenes optimizadas | Hecho | hero de 5,5 MB a 89 KB; ninguna imagen supera 250 KB |
| Intención resuelta cuanto antes | Hecho | respuesta en el primer párrafo, antes de cualquier CTA |
| Párrafos de 3-4 líneas | Hecho | |
| FAQs de la keyword (primeras 4) | Hecho | 4 por página, con `FAQPage` |
| Schema correcto | Hecho | `Service` + `FAQPage` en productos y asesoría |
| ≥ 5 enlaces internos únicos fuera de la navegación | Hecho | entre 11 y 16 por página, verificado por `check:seo` |
| Anchor text optimizado y repartido | Hecho | enlaces dentro del texto, no agrupados al final |
| Enlace a pillar page y a página transaccional | Hecho | cada producto enlaza a `/nosotros/` y a `/asesoria-en-seguros/` |
| Sin páginas huérfanas | Hecho | todas enlazadas desde nav, footer y contenido |
| CTA claro | Hecho | verificado por `check:seo` |
| Página compartible (OG / Twitter card) | Hecho | `og-dpg-seguros.jpg`, 1200×630 |
| Sin canibalización | Hecho | una keyword por URL, sin solapamiento |
| Contenido original y no genérico | Config | escrito para este proyecto; pasar por Originality.ai si alguna página rinde mal |
| Semrush Writing Assistant > 9, Surfer/Rankability 71-90 | Externo | |
| CopyScape / Siteliner | Externo | |
| Revisado por un experto (SME) visible | Config | bloque presente; falta el nombre real |
| Mouseflow / heatmaps | Externo | instalar vía GTM cuando haya tráfico |
| Backlinks necesarios y DR de competidores | Externo | |

## Hoja 4 · Google Business Profile / SEO local

Lo que toca el sitio está hecho; el resto se gestiona dentro de Google Business Profile.

| Ítem | Estado | Nota |
|---|---|---|
| NAP consistente | Hecho | fuente única en [src/lib/site.ts](src/lib/site.ts), repetido en footer y schema |
| Schema `LocalBusiness` en cada página | Hecho | `InsuranceAgency` con `address`, `geo`, `openingHours`, `areaServed`, `hasMap` |
| Enlace al perfil de Google con anchor descriptivo | Hecho | footer y sección de testimonios |
| Teléfono pulsable (`tel:`) | Hecho | nav, footer, contacto y SME |
| Lenguaje conversacional y FAQs para búsqueda por voz | Hecho | las FAQs están escritas como preguntas habladas |
| CTAs con ciudad | Hecho | |
| Señales de confianza (años, aseguradoras, contacto claro) | Hecho | |
| Mapa embebido bajo el NAP | Config | hoy es un enlace a Google Maps; el iframe suma ~500 KB y peso en LCP. Decidir si se añade |
| Reseñas reales con schema | **Bloqueado** | los testimonios del Figma son de muestra. `REVIEWS_SON_REALES = false` impide emitir `Review`/`AggregateRating`: marcar reseñas inventadas es motivo de acción manual de Google |
| Horarios, categorías, fotos, ofertas, atributos, posts, UTMs en GBP | Externo | se hace dentro de Google Business Profile |
| Bing Places, Apple Maps, Yelp, Yahoo Local, Facebook | Externo | |
| Citaciones y NAP en directorios | Externo | usar el NAP de `site.ts` como referencia |

---

## Pendientes que bloquean publicar

1. **Teléfono real.** Hoy hay un marcador en `src/lib/site.ts` (`NAP.phone` / `NAP.phoneDisplay`). Aparece en `tel:`, en el schema local y debe coincidir con el de Google Business Profile.
2. **Dominio real.** Se asumió `https://www.dpgseguros.com`. Cambiar `NEXT_PUBLIC_SITE_URL`: de ahí salen canonical, hreflang, sitemap y OG.
3. **URLs de compra y cotización.** Los seis botones apuntan a `/asesoria-en-seguros/` como marcador (`PLACEHOLDER` en `src/lib/content.ts`).
4. **Endpoint del formulario.** `NEXT_PUBLIC_FORM_ENDPOINT` vacío; el formulario muestra un aviso con el correo en vez de fallar en silencio.
5. **Reseñas reales** de Google Business Profile, y poner `REVIEWS_SON_REALES = true`.
6. **Revisión legal** de la política de datos y los términos.
7. **SME real**: nombre, cargo y credenciales del asesor que firma el contenido.
