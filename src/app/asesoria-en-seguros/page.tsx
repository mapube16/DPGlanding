import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import Contacto from '@/components/Contacto'
import JsonLd from '@/components/JsonLd'
import Aliados from '@/components/Aliados'
import { Faq, AutorSme } from '@/components/Sections'
import { pageMetadata, faqSchema, serviceSchema } from '@/lib/seo'
import { PAGES, BRAND, NAP } from '@/lib/site'
import { PRODUCTS } from '@/lib/content'
import s from './page.module.css'

const page = PAGES.asesoria
export const metadata: Metadata = pageMetadata(page)

const PASOS = [
  {
    n: 1,
    t: 'Nos cuentas qué quieres cuidar',
    d: 'Una llamada o un formulario. Sin formatos largos ni datos que no necesitamos todavía.',
  },
  {
    n: 2,
    t: 'Revisamos qué ya tienes cubierto',
    d: 'Muchas veces una póliza que ya pagas cubre parte del riesgo. Antes de venderte algo, lo miramos.',
  },
  {
    n: 3,
    t: 'Comparamos entre las aseguradoras',
    d: `Cotizamos con las ${BRAND.insurersCount}+ compañías con las que trabajamos y te explicamos las diferencias reales, incluidas las exclusiones.`,
  },
  {
    n: 4,
    t: 'Te acompañamos después de firmar',
    d: 'Renovaciones, cambios y, sobre todo, la reclamación: armamos el caso y lo sostenemos ante la aseguradora.',
  },
]

const FAQS = [
  {
    q: '¿La asesoría en seguros tiene costo?',
    a: 'No. La asesoría es gratuita y no te obliga a comprar. Nuestra remuneración la paga la aseguradora cuando decides tomar una póliza, y eso no encarece tu prima.',
  },
  {
    q: '¿Cuánto se demoran en responder?',
    a: 'Respondemos dentro del siguiente día hábil. Si el caso es urgente, llámanos directamente y lo atendemos en el momento.',
  },
  {
    q: '¿Atienden fuera de Armenia?',
    a: 'Sí. Nuestra oficina está en Armenia, Quindío, y atendemos clientes de toda Colombia de forma remota, por teléfono, correo y videollamada.',
  },
  {
    q: '¿Qué pasa si ya tengo una póliza con otra aseguradora?',
    a: 'La revisamos contigo sin compromiso. Si la que tienes te sirve, te lo decimos; si encontramos una mejor, te mostramos la comparación completa antes de que decidas.',
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={serviceSchema(page, FAQS)} id="service" />
      <JsonLd data={faqSchema(FAQS)} id="faq" />

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

        <section className="section section--navy">
          <div className={`wrap ${s.split}`}>
            <div>
              <h2 className={s.h2Light}>Un acompañamiento, no una venta</h2>
              <ol className={s.pasos}>
                {PASOS.map((p) => (
                  <li key={p.n}>
                    <span className={s.num} aria-hidden="true">
                      {p.n}
                    </span>
                    <div>
                      <h3>{p.t}</h3>
                      <p>{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <Image
              src="/img/aria/aria-asesoria-personalizada-seguros.svg"
              alt="Asesora de DPG Seguros revisando una póliza con un cliente en Armenia"
              width={1097}
              height={776}
              loading="lazy"
              className={s.art}
            />
          </div>
        </section>

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
        <Faq faqs={FAQS} title="Preguntas frecuentes sobre la asesoría" />
      </article>

      <Contacto />
      <AutorSme />
    </>
  )
}
