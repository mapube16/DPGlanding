#!/usr/bin/env node
// Verificador del HTML ya exportado en out/.
// Comprueba los ítems del checklist que se pueden auditar sin herramientas
// externas. Los que dependen de Semrush, Screaming Frog o Search Console van en
// SEO-CHECKLIST.md como tarea manual.
//
//   npm run build && npm run check:seo
//
// Sale con código 1 si algo falla, para poder colgarlo de un CI.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const OUT = 'out'
let fallos = 0
let avisos = 0

const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`)
const fail = (m) => {
  fallos++
  console.log(`  \x1b[31m✗\x1b[0m ${m}`)
}
const warn = (m) => {
  avisos++
  console.log(`  \x1b[33m!\x1b[0m ${m}`)
}

if (!existsSync(OUT)) {
  console.error('No existe out/. Corre `npm run build` primero.')
  process.exit(1)
}

/** Todos los .html exportados. */
function htmls(dir = OUT, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) htmls(p, acc)
    else if (e.endsWith('.html')) acc.push(p)
  }
  return acc
}

const count = (h, re) => (h.match(re) || []).length
const text = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')

const paginas = htmls().filter((p) => !/404|_not-found/.test(p))

console.log(`\nAuditando ${paginas.length} páginas en ${OUT}/\n`)

for (const file of paginas) {
  const ruta = '/' + relative(OUT, file).replace(/\\/g, '/').replace(/index\.html$/, '')
  const h = readFileSync(file, 'utf8')
  const t = text(h)
  console.log(`\x1b[1m${ruta}\x1b[0m`)

  // --- Un solo title y un solo H1 ---
  const titles = count(h, /<title[ >]/g)
  titles === 1 ? ok('un único <title>') : fail(`${titles} etiquetas <title> (debe ser 1)`)

  const h1s = count(h, /<h1[ >]/g)
  h1s === 1 ? ok('un único <h1>') : fail(`${h1s} etiquetas <h1> (debe ser 1)`)

  // --- Longitudes de title y meta description ---
  const title = (h.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1]?.trim() || ''
  title.length >= 30 && title.length <= 65
    ? ok(`title de ${title.length} caracteres`)
    : warn(`title de ${title.length} caracteres (ideal 30-65): "${title}"`)

  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''
  if (!desc) fail('sin meta description')
  else if (desc.length < 110 || desc.length > 165)
    warn(`meta description de ${desc.length} caracteres (ideal 110-165)`)
  else ok(`meta description de ${desc.length} caracteres`)

  // --- H1 distinto del title ---
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || ''
  const h1txt = text(h1).trim()
  h1txt && h1txt !== title ? ok('H1 distinto del title') : fail('H1 idéntico al title (o vacío)')

  // --- Canonical y hreflang ---
  count(h, /rel="canonical"/gi) === 1 ? ok('un canonical') : fail('canonical ausente o duplicado')
  if (/hreflang="es-CO"/i.test(h)) ok('hreflang es-CO')
  else fail('sin hreflang')

  // --- Jerarquía de encabezados: no saltar niveles ---
  const niveles = [...h.matchAll(/<h([1-6])[ >]/g)].map((m) => Number(m[1]))
  const salto = niveles.find((n, i) => i > 0 && n - niveles[i - 1] > 1)
  salto ? fail(`salto de encabezado hasta h${salto}`) : ok('jerarquía de encabezados correcta')

  // --- Imágenes con alt ---
  // alt="" es válido y deseable en imágenes decorativas (las que viven dentro
  // de un contenedor aria-hidden). Lo que falla es que no exista el atributo.
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
  const sinAlt = imgs.filter((i) => !/\balt=/.test(i))
  const decorativas = imgs.filter((i) => /\balt=""/.test(i)).length
  if (sinAlt.length) fail(`${sinAlt.length} de ${imgs.length} imágenes sin atributo alt`)
  else
    ok(
      `${imgs.length} imágenes con alt` +
        (decorativas ? ` (${decorativas} decorativas con alt="")` : ''),
    )

  // --- Enlaces internos (excluyendo nav y footer) ---
  const cuerpo = h
    .replace(/<header[\s\S]*?<\/header>/g, '')
    .replace(/<footer[\s\S]*?<\/footer>/g, '')
  const internos = new Set(
    [...cuerpo.matchAll(/href="(\/[^"#][^"]*)"/g)].map((m) => m[1].split('#')[0]),
  )
  internos.size >= 5
    ? ok(`${internos.size} enlaces internos únicos en el contenido`)
    : fail(`${internos.size} enlaces internos únicos (mínimo 5)`)

  // --- Datos estructurados ---
  const ld = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  let tipos = []
  for (const [, raw] of ld) {
    try {
      const d = JSON.parse(raw.replace(/\\u003c/g, '<'))
      tipos.push(d['@type'])
    } catch {
      fail('un bloque JSON-LD no parsea')
    }
  }
  tipos.length ? ok(`JSON-LD: ${tipos.join(', ')}`) : fail('sin datos estructurados')

  // --- Conteo de palabras ---
  const palabras = t.trim().split(/\s+/).length
  if (ruta.includes('politica') || ruta.includes('terminos')) {
    ok(`${palabras} palabras (página legal)`)
  } else if (palabras < 300) {
    fail(`contenido delgado: ${palabras} palabras`)
  } else {
    ok(`${palabras} palabras`)
  }

  // --- Teléfono pulsable en móvil ---
  if (/href="tel:/.test(h)) ok('teléfono pulsable (tel:)')
  else fail('sin enlace tel:')

  // --- CTA presente (las páginas legales quedan exentas) ---
  const legal = ruta.includes('politica') || ruta.includes('terminos')
  if (legal) ok('CTA no aplica (página legal)')
  else if (/class="[^"]*btn/.test(h)) ok('CTA presente')
  else fail('sin llamada a la acción')

  console.log('')
}

// --- Archivos globales ---
console.log('\x1b[1mArchivos del sitio\x1b[0m')
for (const f of ['robots.txt', 'sitemap.xml', 'llms.txt', 'sitemap_index.xml', 'favicon.svg']) {
  existsSync(join(OUT, f)) ? ok(f) : fail(`falta ${f}`)
}

const robots = existsSync(join(OUT, 'robots.txt')) ? readFileSync(join(OUT, 'robots.txt'), 'utf8') : ''
if (/Sitemap:/i.test(robots)) ok('robots.txt declara el sitemap')
else fail('robots.txt sin Sitemap')
if (/GPTBot/.test(robots)) ok('robots.txt permite agentes de IA')
else fail('robots.txt sin agentes de IA')

const sm = existsSync(join(OUT, 'sitemap.xml')) ? readFileSync(join(OUT, 'sitemap.xml'), 'utf8') : ''
const urls = count(sm, /<loc>/g)
urls >= paginas.length ? ok(`sitemap con ${urls} URLs`) : fail(`sitemap con ${urls} URLs, hay ${paginas.length} páginas`)
if (/image:image/.test(sm)) ok('sitemap incluye imágenes')
else fail('sitemap sin etiquetas de imagen')

// --- Peso de los assets ---
console.log('\n\x1b[1mPeso de imágenes\x1b[0m')
function pesadas(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    const s = statSync(p)
    if (s.isDirectory()) pesadas(p, acc)
    else if (/\.(png|jpe?g|webp|avif|svg)$/i.test(e) && s.size > 250 * 1024)
      acc.push([relative(OUT, p), Math.round(s.size / 1024)])
  }
  return acc
}
const gordas = pesadas(OUT)
gordas.length === 0
  ? ok('ninguna imagen supera 250 KB')
  : gordas.forEach(([f, kb]) => warn(`${f} pesa ${kb} KB`))

console.log(
  `\n${fallos === 0 ? '\x1b[32mSin fallos\x1b[0m' : `\x1b[31m${fallos} fallos\x1b[0m`}` +
    `, ${avisos} avisos.\n`,
)
process.exit(fallos === 0 ? 0 : 1)
