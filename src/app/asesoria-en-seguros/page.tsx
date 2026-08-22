import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Contacto from '@/components/Contacto'
import JsonLd from '@/components/JsonLd'
import Aliados from '@/components/Aliados'
import { pageMetadata, serviceSchema } from '@/lib/seo'
import { PAGES, BRAND, NAP } from '@/lib/site'
import { PRODUCTS } from '@/lib/content'
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

      <article>
        <header className={`wrap ${s.head}`}>
          <h1>{page.h1}</h1>
          <p className={s.intro}>
            Una asesoría en seguros sirve para no pagar por lo que no necesitas ni descubrir la
            exclusión el día del siniestro. Un asesor humano revisa contigo tu caso y compara más de{' '}
            {BRAND.insurersCount} aseguradoras antes de recomendarte nada. Es gratuita.
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
            <h2 className={s.h2}>¿Ya sabes qué necesitas?</h2>
            <p className={s.sub}>
              Si tu caso es uno de estos tres, puedes cotizar y comprar en línea sin esperar a la
              asesoría.
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
            <p className={s.note}>
              ¿Nada de esto encaja? Es justamente para lo que existe la asesoría.{' '}
              <Link href={PAGES.nosotros.path}>Conoce quiénes somos</Link> y escríbenos.
            </p>
          </div>
        </section>

        <Aliados />
      </article>

      <Contacto />
    </>
  )
}
