import type { MetadataRoute } from 'next'
import { PAGES, SITE_URL } from '@/lib/site'

// force-static: requerido por output: 'export' en rutas de metadatos.
export const dynamic = 'force-static'

// Sitemap + sitemap de imágenes en un solo archivo: Next emite las etiquetas
// <image:image> dentro de cada <url> cuando se pasa el campo `images`.
const IMAGENES: Record<string, string[]> = {
  '/': [
    '/img/hero/paisaje-dia-2400.webp',
    '/img/aria/aria-asistente-virtual-dpg-seguros.svg',
    '/img/aria/aria-asesoria-personalizada-seguros.svg',
    '/img/aria/aria-contacto-asesor-seguros.svg',
  ],
  '/asesoria-en-seguros/': ['/img/aria/aria-asesoria-personalizada-seguros.svg'],
  '/seguro-de-viajes/': ['/img/aria/aria-asesoria-personalizada-seguros.svg'],
  '/seguro-de-arrendamiento/': ['/img/aria/aria-asesoria-personalizada-seguros.svg'],
  '/seguro-por-kilometro/': ['/img/aria/aria-asesoria-personalizada-seguros.svg'],
  '/nosotros/': ['/logo-dpg-seguros.webp'],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return Object.values(PAGES)
    .filter((p) => p.inSitemap)
    .map((p) => ({
      url: SITE_URL + p.path,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      images: (IMAGENES[p.path] || []).map((i) => SITE_URL + i),
      alternates: { languages: { 'es-CO': SITE_URL + p.path } },
    }))
}
