import Link from 'next/link'
import Image from 'next/image'
import { NAP, BRAND, PAGES } from '@/lib/site'
import { PRODUCTS } from '@/lib/content'
import s from './Footer.module.css'

// Nodo 192:348. El footer repite el NAP completo en cada página (requisito de
// SEO local) y mantiene enlazadas las páginas de confianza.
export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.inner}`}>
        <div className={s.brand}>
          <Image
            src="/logo-dpg-seguros.webp"
            alt="DPG Seguros — Desarrollo, Protección, Garantía"
            width={420}
            height={138}
            loading="lazy"
          />
          <p>
            {BRAND.yearsText} de experiencia con asesoría en seguros para empresas y personas en
            Colombia.
          </p>
          <a className={s.gbp} href={NAP.googleBusinessUrl} target="_blank" rel="noopener noreferrer">
            Ver el perfil de DPG Seguros en Google Maps Armenia
          </a>
        </div>

        <div className={s.col}>
          <h2>Datos de contacto</h2>
          <address className={s.contacto}>
            <span className={s.dato}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <a href={NAP.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                {NAP.street}
                <br />
                {NAP.city}, {NAP.region}, {NAP.countryName}
              </a>
            </span>
            <span className={s.dato}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <a href={`mailto:${NAP.email}`}>{NAP.email}</a>
            </span>
            {/* El teléfono no está en el diseño del footer, pero el checklist pide
                enlace tel: y NAP completo en cada página. */}
            <span className={s.dato}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              <a href={`tel:${NAP.phone}`}>{NAP.phoneDisplay}</a>
            </span>
          </address>
        </div>

        <div className={s.col}>
          <h2>Productos en línea</h2>
          <ul>
            {PRODUCTS.map((p) => (
              <li key={p.key}>
                <Link href={p.path}>{p.name}</Link>
              </li>
            ))}
            <li>
              <Link href={PAGES.asesoria.path}>Cotizar otro seguro</Link>
            </li>
          </ul>
        </div>

        <div className={s.col}>
          <h2>Navegación</h2>
          <ul>
            <li>
              <Link href="/#aliados">Aliados</Link>
            </li>
            <li>
              <Link href={PAGES.nosotros.path}>Nosotros</Link>
            </li>
            <li>
              <Link href="/#por-que-dpg">Por qué DPG</Link>
            </li>
            <li>
              <Link href="/#testimonios">Testimonios</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={s.legal}>
        <p>
          © {new Date().getFullYear()} {NAP.legalName}. Corredor de seguros en {NAP.city},{' '}
          {NAP.region}. Este sitio es informativo: las condiciones, coberturas y exclusiones de cada
          póliza son las del condicionado de la aseguradora emisora.{' '}
          <Link href={PAGES.privacidad.path}>Política de privacidad</Link> ·{' '}
          <Link href={PAGES.terminos.path}>Términos y condiciones</Link>
        </p>
      </div>
    </footer>
  )
}
