import Link from 'next/link'
import Image from 'next/image'
import CtaLink from './CtaLink'
import ModalAseguradora from './ModalAseguradora'
import Badge from './Badge'
import Carrusel from './Carrusel'
import BarraMensaje from './BarraMensaje'
import AutoCiclo from './AutoCiclo'
import AriaSaluda from './AriaSaluda'
import { leerSvg } from '@/lib/svg'
import { PAGES, NAP, BRAND } from '@/lib/site'
import { PRODUCTS, RAZONES, type Product } from '@/lib/content'
import s from './Sections.module.css'

/* ---------------------------------------------------------------- Aria ---- */

export function Aria() {
  return (
    <section className={s.aria} id="aria">
      <div className={s.ariaGlow} aria-hidden="true" />

      <div className="wrap">
        <div className={s.ariaCol}>
          <h2 className={s.ariaTitle}>
            ¡Hola! Soy <span>Aria</span>
          </h2>
          <p className={s.ariaText}>
            Mi trabajo es acompañarte mientras conoces quiénes somos, resolver tus dudas, y ayudarte
            a encontrar la protección que de verdad se ajusta a ti.
          </p>
          {/* Nodo 133:1029: las 6 variantes son los fotogramas de un efecto de
              máquina de escribir. Todavía no hay chat, así que al enviar se abre
              la asesoría con lo que escribiste. */}
          <BarraMensaje />
        </div>
      </div>

      {/* El SVG va incrustado, no en un <img>, para que GSAP pueda mover el
          brazo. Se lee en build (export estático), así que sigue estando en el
          HTML desde el primer pintado. */}
      <AriaSaluda
        className={s.ariaArt}
        etiqueta="Aria, la asistente de DPG Seguros, saludando"
        svg={leerSvg('img/aria/aria-asistente-virtual-dpg-seguros.svg')}
      />

      <Link className={`${s.bubble} ${s.b1}`} href="#pilares">
        ¿Qué es DPG?
      </Link>
      <Link className={`${s.bubble} ${s.b2}`} href="#productos">
        Ver seguros
      </Link>
      <Link className={`${s.bubble} ${s.b3}`} href={PAGES.asesoria.path}>
        Solicitar asesoría
      </Link>
    </section>
  )
}

/* ----------------------------------------------------------- Productos ---- */

const ICONS: Record<Product['icon'], React.ReactNode> = {
  plane: (
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.2 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-.5.5c-.3.3-.3.8 0 1.1l2 2 2 2c.3.3.8.3 1.1 0L9 20v-3l3-2 3.5 5.5c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1Z" />
  ),
  home: (
    <>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </>
  ),
  gauge: (
    <>
      <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
      <circle cx="12" cy="12" r="2" />
      <path d="M13.4 10.6 19 5" />
    </>
  ),
}

export function Productos() {
  return (
    <section className="section section--cream" id="productos">
      <div className="wrap">
        <header className={s.prodHead}>
          <h2>¿Qué es lo que quieres cuidar?</h2>
          <p>
            Los cotizas y contratas tú mismo en línea, listos en minutos. Cada uno con la aseguradora
            que lo respalda.
          </p>
        </header>

        {/* La máscara de las muescas recorta también la sombra, así que la sombra
            vive en el <li> y la máscara en el div de dentro. */}
        <ul className={s.cards}>
          {PRODUCTS.map((p) => (
            <li key={p.key} className={s.cardWrap}>
              <div className={`${s.card} ${s[p.accent]}`}>
              <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[p.icon]}
              </svg>
              <div className={s.cardTitle}>
                <h3>
                  <Link href={p.path}>{p.cardLabel}</Link>
                </h3>
                <Badge className={s.badge} partes={p.badge} />
              </div>
              <p>{p.short}</p>
              <hr className={s.cardRule} />
              <div className={s.cardActions}>
                {p.compra ? (
                  <ModalAseguradora className={`btn ${p.accent === 'green' ? 'btn--green' : 'btn--blue'}`} sura={p.compra.sura} sbs={p.compra.sbs}>
                    Comprar
                  </ModalAseguradora>
                ) : (
                  <CtaLink className={`btn ${p.accent === 'green' ? 'btn--green' : 'btn--blue'}`} href={p.buyUrl}>
                    Comprar
                  </CtaLink>
                )}
                <Link className={`btn ${p.accent === 'green' ? 'btn--ghost-green' : 'btn--ghost-blue'}`} href="/#contacto">
                  Cotizar
                </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={s.banner}>
          <p>
            ¿Buscas algo diferente? Cotizamos <strong>decenas de productos</strong> con más de{' '}
            <strong>{BRAND.insurersCount} aseguradoras</strong>.
          </p>
          <Link className="btn btn--light" href={PAGES.asesoria.path}>
            Pedir asesoría
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ Asesoría ---- */

export function Asesoria() {
  return (
    <section className={s.asesoria} id="asesoria">
      <div className={s.asesoriaArt}>
        <Image
          src="/img/aria/aria-asesoria-personalizada-seguros.svg"
          alt="Asesora de DPG Seguros explicando una póliza a un cliente en Armenia"
          width={1292}
          height={905}
          loading="lazy"
        />
      </div>
      <div className="wrap">
        <div className={s.asesoriaCol}>
          <h2>El mejor seguro es el que de verdad es tuyo</h2>
          <p>
            Un producto de la lista puede no ajustarse a tu vida, tu negocio o tu momento. Antes de
            cualquier cosa, un asesor humano revisa contigo qué necesitas de verdad, y construye una
            recomendación <strong>especialmente hecha para ti</strong>.
          </p>
          <Link className="btn btn--blue" href={PAGES.asesoria.path}>
            Quiero asesoría
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Por qué ---- */

export function PorQue() {
  return (
    <section className={s.porque} id="por-que-dpg">
      <AutoCiclo name="razon" seccion="por-que-dpg" intervalo={6000} />
      {RAZONES.map((r, i) => (
        <input
          key={`r-${r.key}`}
          className={s.pqRadio}
          type="radio"
          name="razon"
          id={`razon-${r.key}`}
          defaultChecked={i === 0}
        />
      ))}

      {/* Palabra de fondo: cambia con la pestaña, igual que el titular. */}
      {RAZONES.map((r) => (
        <span key={r.key} className={`${s.ghost} ${s[r.acento]}`} aria-hidden="true">
          {r.fantasma}
        </span>
      ))}

      <div className={`wrap ${s.porqueInner}`}>
        {/* Un solo H2 con las seis variantes apiladas. Cada una repite "DPG es"
            para que la línea completa se centre sola: con el remate suelto, el
            hueco tras "DPG es" cambiaba según lo largo que fuera. */}
        <h2 className={s.porqueTitle}>
          <span className={s.l1}>Más que una póliza,</span>
          <span className={s.l2}>
            <span className={s.claims}>
              {RAZONES.map((r) => (
                <span key={r.key} className={`${s.claimLinea} ${s[r.acento]}`}>
                  DPG es <em className={s.claim}>{r.claim}</em>
                </span>
              ))}
            </span>
          </span>
        </h2>

        <div className={s.leads}>
          {RAZONES.map((r) => (
            <p key={r.key} className={s.porqueLead}>
              {r.text}
            </p>
          ))}
        </div>

        <div className={s.tabs}>
          {RAZONES.map((r) => (
            <label key={r.key} className={`${s.tab} ${s[r.acento]}`} htmlFor={`razon-${r.key}`}>
              {r.label}
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Redes ---- */

const REELS = [
  { src: '/img/reel1.jpg', alt: 'Asesor de DPG Seguros explicando una póliza en video de Instagram', video: true },
  { src: '/img/reel2.jpg', alt: 'Video de DPG Seguros sobre cobertura de equipaje en el seguro de viajes', video: false },
  { src: '/img/reel3.jpg', alt: 'Asesora de DPG Seguros respondiendo dudas frecuentes sobre seguros', video: true },
  { src: '/img/reel4.jpg', alt: 'Infografía de DPG Seguros con consejos para preparar tu hogar ante un sismo', video: false },
]

function Reel({ reel, copia }: { reel: (typeof REELS)[number]; copia?: boolean }) {
  return (
    <li className={reel.video ? s.reelVideo : undefined}>
      <img src={reel.src} alt={copia ? '' : reel.alt} width={331} height={440} loading="lazy" decoding="async" />
      {reel.video && (
        <img className={s.play} src="/img/play.svg" alt="" width={40} height={40} loading="lazy" decoding="async" />
      )}
    </li>
  )
}

export function Redes() {
  return (
    <section className={s.redes} id="redes">
      {/* Nota 167:1599: los posts se desplazan lenta y suavemente hacia la
          izquierda, revelando más. La lista se duplica para que el bucle no
          tenga costura; la copia va oculta a lectores de pantalla. */}
      <div className={s.marquesina}>
        <ul className={s.reels}>
          {REELS.map((r) => (
            <Reel key={r.src} reel={r} />
          ))}
        </ul>
        <ul className={s.reels} aria-hidden="true">
          {REELS.map((r) => (
            <Reel key={`c-${r.src}`} reel={r} copia />
          ))}
        </ul>
      </div>
      {/* Nodos 162:799/800: fundidos navy sobre la tira, a ambos lados. */}
      <div className={s.fadeIzq} aria-hidden="true" />
      <div className={s.fadeDer} aria-hidden="true" />

      <div className="wrap">
        <div className={s.redesCol}>
          <span className={s.igTag}>@dpg_seguros</span>
          <h2>Te acompañamos también en redes</h2>
          <p>Todo lo que necesitas saber sobre seguros, explicado de forma simple y clara.</p>
          <a className={s.igBtn} href={NAP.instagram} target="_blank" rel="noopener noreferrer">
            Seguir en Instagram
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8L22 12L18 16M2 12H22" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- Testimonios ---- */

export function Testimonios() {
  return (
    <section className="section section--cream" id="testimonios">
      <div className="wrap">
        <header className={`${s.prodHead} ${s.testiHead}`}>
          <h2>Testimonios que hablan por nosotros</h2>
          <p>Personas que nos eligieron y hoy nos recomiendan, en sus propias palabras.</p>
        </header>
        <Carrusel />
        <p className={s.gbpLink}>
          <a href={NAP.googleBusinessUrl} target="_blank" rel="noopener noreferrer">
            Leer todas las reseñas en Google
          </a>
          {" · "}
          <a href={NAP.googleWriteReviewUrl} target="_blank" rel="noopener noreferrer">
            Escribir una reseña
          </a>
        </p>
      </div>
    </section>
  )
}
