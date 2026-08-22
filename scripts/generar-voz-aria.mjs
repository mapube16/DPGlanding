// Genera la voz de Aria con Deepgram Aura (TTS) para el componente flotante.
//
//   node scripts/generar-voz-aria.mjs --list    → voces disponibles en la cuenta
//   node scripts/generar-voz-aria.mjs           → genera los mp3 que falten
//   node scripts/generar-voz-aria.mjs --force   → regenera todos
//
// Necesita DEEPGRAM_API_KEY (en el entorno o en .env.local). El texto sale de
// src/lib/aria-mensajes.json, el mismo archivo que lee el componente, así que
// cambiar un mensaje y volver a correr esto es todo lo que hace falta.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')

// Node no lee .env.local por su cuenta y este script corre fuera de Next.
function env(nombre) {
  if (process.env[nombre]) return process.env[nombre]
  try {
    const linea = readFileSync(join(raiz, '.env.local'), 'utf8')
      .split('\n')
      .find((l) => l.startsWith(`${nombre}=`))
    return linea
      ?.slice(nombre.length + 1)
      .trim()
      .replace(/^["']|["']$/g, '')
  } catch {
    return undefined
  }
}

const KEY = env('DEEPGRAM_API_KEY')
// Voz por defecto: femenina, español colombiano (la del perfil de Aria).
const VOZ = env('DEEPGRAM_VOZ') || 'aura-2-celeste-es'

if (!KEY) {
  console.error('Falta DEEPGRAM_API_KEY. Añádela a .env.local y vuelve a correr esto.')
  process.exit(1)
}

const auth = { Authorization: `Token ${KEY}` }

if (process.argv.includes('--list')) {
  const res = await fetch('https://api.deepgram.com/v1/models', { headers: auth })
  if (!res.ok) {
    console.error('Deepgram', res.status, await res.text())
    process.exit(1)
  }
  const { tts = [] } = await res.json()
  for (const m of tts) {
    const nombre = m.canonical_name ?? m.name
    console.log(`${nombre}\t${(m.languages ?? []).join(', ')}\t${m.metadata?.accent ?? ''}`)
  }
  process.exit(0)
}

const mensajes = JSON.parse(readFileSync(join(raiz, 'src/lib/aria-mensajes.json'), 'utf8'))
const destino = join(raiz, 'public/audio/aria')
mkdirSync(destino, { recursive: true })
const forzar = process.argv.includes('--force')

for (const { id, texto } of mensajes) {
  const archivo = join(destino, `${id}.mp3`)
  if (!forzar && existsSync(archivo)) {
    console.log(`= ${id}.mp3 (ya existe)`)
    continue
  }
  const res = await fetch(`https://api.deepgram.com/v1/speak?model=${VOZ}&encoding=mp3`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texto }),
  })
  if (!res.ok) {
    console.error(`x ${id}:`, res.status, await res.text())
    process.exit(1)
  }
  writeFileSync(archivo, Buffer.from(await res.arrayBuffer()))
  console.log(`ok ${id}.mp3`)
}

console.log(`\nListo en public/audio/aria (voz ${VOZ}).`)
