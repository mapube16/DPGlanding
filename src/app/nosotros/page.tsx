import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Contacto from '@/components/Contacto'
import Pilares from '@/components/Pilares'
import Aliados from '@/components/Aliados'
import { PorQue, Redes, AutorSme } from '@/components/Sections'
import { pageMetadata } from '@/lib/seo'
import { PAGES, NAP, BRAND } from '@/lib/site'
import { PRODUCTS, SME } from '@/lib/content'
import s from './page.module.css'

const page = PAGES.nosotros
export const metadata: Metadata = pageMetadata(page)

export default function Page() {
  const anios = new Date().getFullYear() - 1998

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Inicio', path: '/' },
          { name: 'Nosotros', path: page.path },
        ]}
      />

      <article>
        <header className={`wrap ${s.head}`}>
          <h1>{page.h1}</h1>
          <p className={s.intro}>
            DPG Seguros es un corredor de seguros fundado en {NAP.city} en {NAP.foundingDate}. En{' '}
            {anios} años hemos acompañado a familias y empresas del Quindío y del resto de Colombia,
            no vendiendo la póliza más barata sino la que responde cuando pasa algo.
          </p>
        </header>

        <section className="section section--cream">
          <div className={`wrap ${s.historia}`}>
            <div>
              <h2 className={s.h2}>Qué hace un corredor y por qué importa</h2>
              <p>
                Una aseguradora vende sus productos. Un corredor trabaja para ti: compara entre{' '}
                {BRAND.insurersCount}+ compañías, lee los condicionados completos y te dice dónde
                están las exclusiones antes de que firmes. La prima que pagas es exactamente la
                misma.
              </p>
              <p>
                La diferencia se nota el día del siniestro. Ahí no estás solo frente a un formulario:
                nosotros armamos la reclamación, la presentamos y hacemos seguimiento hasta el pago.
                Es lo que llamamos{' '}
                <Link href="/#por-que-dpg">estar ahí siempre</Link>.
              </p>
            </div>
            <dl className={s.datos}>
              <div>
                <dt>Fundación</dt>
                <dd>{NAP.foundingDate}, en {NAP.city}</dd>
              </div>
              <div>
                <dt>Experiencia</dt>
                <dd>{anios} años</dd>
              </div>
              <div>
                <dt>Aseguradoras</dt>
                <dd>Más de {BRAND.insurersCount}</dd>
              </div>
              <div>
                <dt>Oficina</dt>
                <dd>
                  <a href={NAP.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    {NAP.street}, {NAP.city}, {NAP.region}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Contacto</dt>
                <dd>
                  <a href={`tel:${NAP.phone}`}>{NAP.phoneDisplay}</a> ·{' '}
                  <a href={`mailto:${NAP.email}`}>{NAP.email}</a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <Pilares />
        <PorQue />

        <section className="section section--white">
          <div className="wrap">
            <h2 className={s.h2}>Quién firma lo que lees aquí</h2>
            <div className={s.equipo}>
              <p className={s.equipoRole}>{SME.role}</p>
              <h3>{SME.name}</h3>
              <p>{SME.bio}</p>
              <p className={s.equipoContact}>
                <a href={`mailto:${NAP.email}`}>Escribir al equipo</a> ·{' '}
                <Link href={PAGES.asesoria.path}>Pedir una asesoría</Link>
              </p>
            </div>
          </div>
        </section>

        <Aliados />

        <section className="section section--cream">
          <div className="wrap">
            <h2 className={s.h2}>Lo que puedes contratar hoy mismo</h2>
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

        <Redes />
      </article>

      <Contacto />
      <AutorSme />
    </>
  )
}
