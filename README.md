# DPG Seguros — sitio web

Implementación del diseño Figma *Landing DPG* como sitio estático, siguiendo el
SEO Checklist 2026. El mapeo ítem por ítem está en [SEO-CHECKLIST.md](SEO-CHECKLIST.md).

## Stack

Next.js 16 (App Router) con `output: 'export'`. Cada ruta se emite como HTML
completo: los crawlers y los agentes de IA leen el contenido sin ejecutar JS.
No hay Tailwind ni librería de UI — CSS Modules y variables tomadas de las
variables del archivo de Figma.

## Comandos

```bash
npm install
npm run dev                   # desarrollo en :3000
npm run build                 # exporta a out/
npm run check:seo             # audita el HTML de out/ contra el checklist
```

`check:seo` sale con código 1 si algo falla, así que sirve tal cual en CI.
Verifica por página: un solo title y un solo H1, longitudes de title y meta
description, H1 distinto del title, canonical, hreflang, jerarquía de
encabezados, alt en todas las imágenes, mínimo 5 enlaces internos, JSON-LD
parseable, conteo de palabras, enlace `tel:` y CTA. Y a nivel de sitio:
robots.txt, sitemap con imágenes, llms.txt y peso de las imágenes.

## Estructura

```
src/lib/site.ts        NAP, catálogo de rutas y keyword por página
src/lib/seo.ts         metadata + generadores de JSON-LD
src/lib/content.ts     productos, FAQs, pilares, aseguradoras, testimonios, SME
src/app/               una carpeta por ruta + sitemap.ts + robots.ts
src/components/        secciones de la landing
scripts/check-seo.mjs  auditoría del HTML exportado
public/img/            hero (WebP), Aria (SVG), 18 logos de aseguradoras (WebP)
```

`site.ts` es la fuente única: cambiar la dirección o el teléfono ahí actualiza
footer, schema local, enlaces `tel:` y las páginas legales a la vez.

## Configuración antes de desplegar

Copia `.env.example` a `.env.local`:

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical, hreflang, sitemap y OG. **Obligatoria** |
| `NEXT_PUBLIC_FORM_ENDPOINT` | destino del formulario de contacto |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager; sin ella no se inyecta nada |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | verificación de Search Console |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | verificación de Bing Webmaster |
| `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_PHONE_DISPLAY` | teléfono real del negocio |

## Despliegue

`npm run build` deja el sitio en `out/`. Sirve esa carpeta desde cualquier
hosting estático. Dos reglas que el checklist exige y que no puede resolver el
código, hay que configurarlas en el hosting o el CDN:

- HTTP → HTTPS en todo el sitio.
- Una sola versión canónica de dominio: `www` o sin `www`, la otra redirige 301.

## Decisiones que se apartan del Figma

1. **H1 del hero.** El titular del diseño ("Un día cualquiera, protegido de sol a
   luna") no contiene la keyword, y el checklist la exige en el H1. Se añadió
   dentro del mismo `<h1>` una línea de apoyo, más pequeña, con "Seguros en
   Armenia, Quindío". Si se prefiere el titular limpio, se quita el `<span
   className={styles.kicker}>` de [src/components/Hero.tsx](src/components/Hero.tsx).

2. **Hero día/noche.** El diseño tiene tres variantes de cielo y la transición va
   ligada al scroll. La sección mide 260vh con el contenido sticky; un listener
   pasivo escribe `--t` (0→1) y el cielo, el astro, las estrellas, el filtro del
   paisaje y el color del texto se interpolan en CSS. Se sirve una sola imagen
   del paisaje: cargar las tres costaba peticiones extra sobre el LCP.

3. **Anillo de aseguradoras en HTML.** En lugar de la imagen plana del Figma
   (675 KB, un solo `alt`), son 18 `<img>` de ~3 KB posicionados con una fórmula
   polar. Cada aseguradora lleva su propio `alt` y en móvil el anillo colapsa a
   grilla.

4. **Chat de Aria.** El diseño muestra un campo "Escríbeme lo que quieras…". No
   hay backend de chat, así que el campo es un formulario GET que abre la página
   de asesoría con lo que escribiste, en vez de simular un asistente que no
   responde.

6. **CTA del hero.** El diseño no lleva botones en el hero. Se añadió uno
   ("Pedir asesoría gratuita") porque el checklist exige CTA visible; el segundo
   botón se quitó por falta de contraste sobre la ilustración.

7. **Componentes interactivos.** Tres piezas del diseño son componentes con
   variantes y se implementaron como tales, sin JavaScript: los pilares D/P/G son
   un acordeón, las seis razones de "Por qué DPG" son pestañas que cambian el
   remate del titular, su color y la palabra de fondo, y ambos usan radios con
   selectores `:checked`.

5. **Testimonios.** Los del Figma son *Lorem ipsum*. Se dejan como texto de
   muestra explícito y el schema `Review`/`AggregateRating` está desactivado
   (`REVIEWS_SON_REALES` en `content.ts`) hasta que haya reseñas reales.
