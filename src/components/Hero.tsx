'use client'

import { useEffect, useRef } from 'react'
import s from './Hero.module.css'

// Nodo 59:426. "De sol a luna": el componente del diseño tiene tres variantes de
// cielo (día, tarde, noche) y la transición ocurre al hacer scroll sobre el hero.
//
// La sección mide 260vh y el contenido queda sticky dentro. Un único listener
// pasivo escribe --t (0→1) y todo lo demás (cielo, astro, estrellas, filtro del
// paisaje, color del texto) se interpola en CSS a partir de esa variable.
export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const actualizar = () => {
      frame = 0
      const { top, height } = el.getBoundingClientRect()
      const recorrido = height - window.innerHeight
      const t = recorrido > 0 ? Math.min(Math.max(-top / recorrido, 0), 1) : 0
      el.style.setProperty('--t', t.toFixed(4))
    }
    const alScroll = () => {
      if (!frame) frame = requestAnimationFrame(actualizar)
    }

    actualizar()
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', alScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', alScroll)
      window.removeEventListener('resize', alScroll)
    }
  }, [])

  return (
    <section className={s.hero} ref={ref} id="inicio">
      <div className={s.sticky}>
        <div className={`${s.cielo} ${s.dia}`} aria-hidden="true" />
        <div className={`${s.cielo} ${s.tarde}`} aria-hidden="true" />
        <div className={`${s.cielo} ${s.noche}`} aria-hidden="true" />
        <div className={s.estrellas} aria-hidden="true" />
        <div className={s.astro} aria-hidden="true" />

        <div className={s.content}>
          {/* Copy 1:1 con el nodo 59:460. La keyword "seguros en Armenia" vive en
              el title, la meta description y el H2 de la sección de FAQ, no aquí. */}
          <h1>Un día cualquiera, protegido de sol a luna</h1>
          <p className={s.lead}>
            La vida no para, y nosotros tampoco. Descubre cómo cuidamos lo que amas, a cada hora del
            día.
          </p>
        </div>

        {/* LCP: la imagen de día con prioridad alta y dimensiones fijas para no
            generar CLS. La nocturna se funde encima según el scroll (--t). */}
        <img
          className={s.paisaje}
          src="/img/hero/paisaje-dia-1600.webp"
          srcSet="/img/hero/paisaje-dia-1600.webp 1600w, /img/hero/paisaje-dia-2400.webp 2400w"
          sizes="100vw"
          alt="Casa y carro asegurados en el paisaje del Quindío, protegidos por DPG Seguros"
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
        />
        <img
          className={`${s.paisaje} ${s.paisajeNoche}`}
          src="/img/hero/paisaje-noche-1600.webp"
          srcSet="/img/hero/paisaje-noche-1600.webp 1600w, /img/hero/paisaje-noche-2400.webp 2400w"
          sizes="100vw"
          alt=""
          aria-hidden="true"
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}
