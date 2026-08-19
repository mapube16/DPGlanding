import Link from 'next/link'
import Image from 'next/image'
import { NAP } from '@/lib/site'
import s from './Header.module.css'

// Nodo 162:1131. Va como hermano de Frame 9 dentro de "Landing versión final",
// no dentro de la pila de secciones: alto 92, fondo cream al 85% con desenfoque.
const ENLACES = [
  { href: '/#productos', label: 'Productos' },
  { href: '/#asesoria', label: 'Asesoría' },
  { href: '/#pilares', label: 'Nosotros' },
  { href: '/#aliados', label: 'Aliados' },
  { href: '/#redes', label: 'Comunidad' },
]

export default function Header() {
  return (
    <header className={s.header}>
      <Link href="/" className={s.logo} aria-label={`${NAP.name} — inicio`}>
        <Image
          src="/logo-dpg-seguros.webp"
          alt="DPG Seguros, corredor de seguros en Armenia, Quindío"
          width={420}
          height={138}
          priority
        />
      </Link>

      <nav className={s.nav} aria-label="Navegación principal">
        {ENLACES.map((e) => (
          <Link key={e.href} href={e.href}>
            {e.label}
          </Link>
        ))}
      </nav>

      <Link className={`btn btn--blue ${s.cta}`} href="/#contacto">
        Solicitar cotización
      </Link>

      {/* Menú móvil sin JavaScript: el diseño móvil del Figma se implementa en
          la pasada de responsive; esto mantiene la navegación utilizable. */}
      <details className={s.movil}>
        <summary aria-label="Abrir menú">
          <span />
          <span />
          <span />
        </summary>
        <nav aria-label="Navegación móvil">
          {ENLACES.map((e) => (
            <Link key={e.href} href={e.href}>
              {e.label}
            </Link>
          ))}
          <Link href="/#contacto">Solicitar cotización</Link>
        </nav>
      </details>
    </header>
  )
}
