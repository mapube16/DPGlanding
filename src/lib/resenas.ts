import { NAP } from './site'

// Reseñas reales del perfil de Google Business, igual que en
// github.com/mapube16/landingdpg: Places API (New) llamada DESDE EL NAVEGADOR
// con una key restringida por dominio (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; es la
// misma VITE_GOOGLE_MAPS_API_KEY de aquel proyecto). El sitio es estático, así
// que las reseñas se refrescan en cada visita sin rebuild. Sin key o si la
// API falla, el carrusel se queda con las de muestra y no se muestra nada de dev.
export type Resena = {
  author: string
  initials: string
  rating: number
  body: string
  photo?: string
  time?: string
}

export type ResenasGoogle = {
  items: Resena[]
  rating?: number
  total?: number
}

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

const FIELD_MASK = [
  'rating',
  'userRatingCount',
  'reviews.rating',
  'reviews.text.text',
  'reviews.authorAttribution.displayName',
  'reviews.authorAttribution.photoUri',
  'reviews.relativePublishTimeDescription',
  'reviews.publishTime', // solo para ordenar: Google las devuelve por relevancia
].join(',')

type RespuestaPlaces = {
  rating?: number
  userRatingCount?: number
  reviews?: {
    rating?: number
    text?: { text?: string }
    publishTime?: string
    relativePublishTimeDescription?: string
    authorAttribution?: { displayName?: string; photoUri?: string }
  }[]
}

function iniciales(nombre: string) {
  return (
    nombre
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]!.toUpperCase())
      .join('') || 'G'
  )
}

export const HAY_KEY_GOOGLE = Boolean(KEY && NAP.googlePlaceId)

/** Devuelve null si no hay key, si la API falla o si no trae reseñas con texto. */
export async function cargarResenasGoogle(signal?: AbortSignal): Promise<ResenasGoogle | null> {
  if (!HAY_KEY_GOOGLE) return null
  try {
    const url =
      `https://places.googleapis.com/v1/places/${NAP.googlePlaceId}` +
      `?languageCode=es&regionCode=CO&fields=${FIELD_MASK}&key=${KEY}`
    const res = await fetch(url, { signal })
    if (!res.ok) throw new Error(`Places API ${res.status}`)
    const data = (await res.json()) as RespuestaPlaces

    const items: Resena[] = (data.reviews ?? [])
      .filter((r) => r.text?.text?.trim() && r.rating)
      // De la más reciente a la más antigua: la API las ordena por relevancia y
      // dejaba las de 2019 delante de las de este año.
      .sort((a, b) => (Date.parse(b.publishTime ?? '') || 0) - (Date.parse(a.publishTime ?? '') || 0))
      .map((r) => {
        const author = r.authorAttribution?.displayName?.trim() || 'Cliente en Google'
        return {
          author,
          initials: iniciales(author),
          rating: r.rating!,
          body: r.text!.text!.trim(),
          photo: r.authorAttribution?.photoUri,
          time: r.relativePublishTimeDescription,
        }
      })
    if (!items.length) return null
    return { items, rating: data.rating, total: data.userRatingCount }
  } catch (e) {
    if ((e as Error).name !== 'AbortError') console.warn('[reseñas]', (e as Error).message)
    return null
  }
}
