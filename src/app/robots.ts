import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// force-static: requerido por output: 'export' en rutas de metadatos.
export const dynamic = 'force-static'

// Se permiten explícitamente los buscadores tradicionales y los agentes de IA
// que respetan robots.txt, tal como pide el checklist. GPTBot además tiene
// acceso declarado a /llms.txt.
const BUSCADORES = ['Googlebot', 'Googlebot-Image', 'Bingbot', 'DuckDuckBot', 'Slurp']

const AGENTES_IA = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'FirecrawlAgent',
  'AndiBot',
  'ExaBot',
  'Bytespider',
  'Amazonbot',
  'CCBot',
  'Meta-ExternalAgent',
  'cohere-ai',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: BUSCADORES, allow: '/' },
      { userAgent: AGENTES_IA, allow: ['/', '/llms.txt'] },
      // Regla base: se abre todo el sitio y solo se cierran las rutas técnicas.
      { userAgent: '*', allow: '/', disallow: ['/_next/static/chunks/', '/*?*utm_'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
