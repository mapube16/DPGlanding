import Link from 'next/link'
import JsonLd from './JsonLd'
import { breadcrumbSchema } from '@/lib/seo'

export type Crumb = { name: string; path: string }

// Migas visibles + BreadcrumbList en JSON-LD. Con el mismo array se pintan las
// dos cosas, así nunca se desincronizan.
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} id="breadcrumbs" />
      <nav className="breadcrumbs wrap" aria-label="Ruta de navegación">
        <ol>
          {trail.map((c, i) => {
            const last = i === trail.length - 1
            return (
              <li key={c.path}>
                {last ? (
                  <span aria-current="page">{c.name}</span>
                ) : (
                  <Link href={c.path}>{c.name}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
