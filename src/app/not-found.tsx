import type { Metadata } from 'next'
import Link from 'next/link'
import { PAGES } from '@/lib/site'
import { PRODUCTS } from '@/lib/content'

// Una 404 nunca debe indexarse, aunque el servidor ya devuelva el estado 404.
export const metadata: Metadata = {
  title: 'Página no encontrada | DPG Seguros',
  robots: { index: false, follow: true },
}

// El 404 enlaza a las páginas principales para no perder el rastreo ni al usuario
// (el checklist pide vigilar 404 con backlinks; estos al menos redistribuyen).
export default function NotFound() {
  return (
    <article className="wrap" style={{ padding: '80px 0 120px', maxWidth: '70ch' }}>
      <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', color: 'var(--yale)', marginBottom: 18 }}>
        Esta página ya no existe
      </h1>
      <p style={{ fontSize: 18 }}>
        Puede que el enlace haya cambiado. Estas son las páginas que la gente suele buscar:
      </p>
      <ul style={{ display: 'grid', gap: 12, paddingLeft: 20, marginBottom: 32 }}>
        {PRODUCTS.map((p) => (
          <li key={p.key}>
            <Link href={p.path}>{p.name}</Link> — {p.short}
          </li>
        ))}
        <li>
          <Link href={PAGES.asesoria.path}>Asesoría en seguros</Link> con un asesor humano.
        </li>
        <li>
          <Link href={PAGES.nosotros.path}>Nosotros</Link> — quiénes somos y desde cuándo.
        </li>
      </ul>
      <Link className="btn btn--blue" href="/">
        Volver al inicio
      </Link>
    </article>
  )
}
