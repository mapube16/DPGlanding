import Link from 'next/link'
import Breadcrumbs from './Breadcrumbs'
import CtaLink from './CtaLink'
import ModalAseguradora from './ModalAseguradora'
import Badge from './Badge'
import JsonLd from './JsonLd'
import Contacto from './Contacto'
import { serviceSchema } from '@/lib/seo'
import { PAGES, BRAND, NAP } from '@/lib/site'
import { PRODUCTS, type Product } from '@/lib/content'
import { leerSvg } from '@/lib/svg'
import s from './ProductoPage.module.css'

// Plantilla única para los tres productos: mismo esqueleto semántico, un solo
// H1, un H2 con sinónimo de la keyword y enlaces internos repartidos por el
// contenido (no agrupados al final).
export default function ProductoPage({ product }: { product: Product }) {
  const page = PAGES[product.key]
  const otros = PRODUCTS.filter((p) => p.key !== product.key)

  return (
    <>
      <JsonLd data={serviceSchema(page, product.faqs)} id="service" />

      <Breadcrumbs
        trail={[
          { name: 'Inicio', path: '/' },
          { name: product.name, path: page.path },
        ]}
      />

      <article>
        <header className={`wrap ${s.head}`}>
          <h1>{page.h1}</h1>
          {/* Primera frase con la keyword: responde la intención de inmediato. */}
          <p className={s.intro}>{product.intro}</p>
          <div className={s.cta}>
            {product.compra ? (
              <ModalAseguradora
                className={`btn ${product.accent === 'green' ? 'btn--green' : 'btn--blue'}`}
                sura={product.compra.sura}
                sbs={product.compra.sbs}
              >
                Comprar en línea
              </ModalAseguradora>
            ) : (
              <CtaLink className={`btn ${product.accent === 'green' ? 'btn--green' : 'btn--blue'}`} href={product.buyUrl}>
                Comprar en línea
              </CtaLink>
            )}
            <Link
              className={`btn ${product.accent === 'green' ? 'btn--ghost-green' : 'btn--ghost-blue'}`}
              href="/#contacto"
            >
              Cotizar
            </Link>
          </div>
          <p className={s.respaldo}>
            <Badge className={s.badgeInline} partes={product.badge} /> · Comparamos {BRAND.insurersCount}+ aseguradoras ·{' '}
            <a href={`tel:${NAP.phone}`}>Llamar {NAP.phoneDisplay}</a>
          </p>
        </header>

        <section className={`section section--cream ${s.cubre}`}>
          <div className="wrap">
            <h2 className={s.h2}>¿Qué cubre?</h2>
            <ul className={s.bullets}>
              {product.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className={s.note}>
              Las coberturas exactas dependen del condicionado de la aseguradora emisora. Si tienes
              dudas sobre alguna exclusión, <Link href={PAGES.asesoria.path}>pídenos una asesoría</Link>{' '}
              antes de comprar: es gratuita y no te obliga a nada.
            </p>
          </div>
        </section>


        <section className="section section--cream">
          <div className="wrap">
            <h2 className={s.h2}>Otros seguros que puedes contratar en línea</h2>
            <ul className={s.otros}>
              {otros.map((o) => (
                <li key={o.key}>
                  <h3>
                    <Link href={o.path}>{o.name}</Link>
                  </h3>
                  <p>{o.short}</p>
                </li>
              ))}
              <li>
                <h3>
                  <Link href={PAGES.asesoria.path}>¿Necesitas otra cosa?</Link>
                </h3>
                <p>
                  Cotizamos decenas de productos con más de {BRAND.insurersCount} aseguradoras.
                  Cuéntanos qué quieres cuidar.
                </p>
              </li>
            </ul>
          </div>
        </section>
      </article>

      <Contacto svgAsesor={leerSvg('img/aria/aria-contacto-asesor-seguros.svg')} />
    </>
  )
}
