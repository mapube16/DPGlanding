import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Contacto from '@/components/Contacto'
import JsonLd from '@/components/JsonLd'
import Aliados from '@/components/Aliados'
import { pageMetadata, serviceSchema } from '@/lib/seo'
import { PAGES, BRAND, NAP } from '@/lib/site'
import { PRODUCTS } from '@/lib/content'
import { leerSvg } from '@/lib/svg'
import s from './page.module.css'

const page = PAGES.asesoria
export const metadata: Metadata = pageMetadata(page)

export default function Page() {
  return (
    <>
      <JsonLd data={serviceSchema(page)} id="service" />

      <Breadcrumbs
        trail={[
          { name: 'Inicio', path: '/' },
          { name: 'Asesoría en seguros', path: page.path },
        ]}
      />

      <article className={s.pagina}>
        <header className={`wrap ${s.head}`}>
          <h1>{page.h1}</h1>
          {/* Copy del cliente (WhatsApp, 1/9/2026). */}
          <p className={s.intro}>
            Elegir un seguro adecuado comienza por entender lo que realmente necesitas. En DPG te
            acompañamos para identificar las opciones disponibles, comparar diferentes alternativas
            y encontrar la que mejor se adapte a tus necesidades. Trabajamos con más de{' '}
            {BRAND.insurersCount} aseguradoras para ofrecerte una asesoría amplia, transparente y
            personalizada.
          </p>
          <div className={s.cta}>
            <a className="btn btn--green" href="#contacto">
              Solicitar asesoría
            </a>
            <a className="btn btn--ghost-blue" href={`tel:${NAP.phone}`}>
              Llamar {NAP.phoneDisplay}
            </a>
          </div>
        </header>

        <section className="section section--cream">
          <div className="wrap">
            <h2 className={s.h2}>¿Ya tienes claro qué seguro necesitas?</h2>
            <p className={s.sub}>
              Si ya sabes qué necesitas, puedes cotizar y adquirir algunos de nuestros seguros en
              línea, de manera fácil, rápida y segura.
            </p>
            <ul className={s.productos}>
              {PRODUCTS.map((p) => (
                <li key={p.key}>
                  <h3>
                    <Link href={p.path}>{p.name}</Link>
                  </h3>
                  <p>{p.short}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Copy del cliente (WhatsApp, 1/9/2026). */}
        <section className="section section--cream">
          <div className="wrap">
            <h2 className={s.h2}>¿No encuentras lo que necesitas?</h2>
            <p className={s.sub}>
              No todos los casos son iguales. Por eso, en DPG contamos con un equipo de asesores que
              puede ayudarte a encontrar la alternativa adecuada para tus necesidades.
            </p>
            <a className="btn btn--green" href="#contacto">
              Solicitar asesoría
            </a>
          </div>
        </section>

        <Aliados />
      </article>

      <Contacto svgAsesor={leerSvg('img/aria/aria-contacto-asesor-seguros.svg')} />
    </>
  )
}
