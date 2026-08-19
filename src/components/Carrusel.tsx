'use client'

import { useEffect, useRef, useState } from 'react'
import { TESTIMONIOS } from '@/lib/content'
import s from './Carrusel.module.css'

// Nodo 162:812 + nota 167:1594: "los botones solamente realizan un
// desplazamiento de 1 posición a la vez".
//
// El desplazamiento real lo hace el propio contenedor con scroll-snap; los
// botones solo mueven el scroll una tarjeta. Así funciona con teclado, con
// rueda y con gesto táctil sin escribir nada de eso a mano.
export default function Carrusel() {
  const pista = useRef<HTMLUListElement>(null)
  const [alInicio, setAlInicio] = useState(true)
  const [alFinal, setAlFinal] = useState(false)

  function revisarBordes() {
    const el = pista.current
    if (!el) return
    setAlInicio(el.scrollLeft <= 4)
    setAlFinal(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  // Sin esto las flechas se quedaban con el estado del primer render: al
  // estrechar la ventana aparecía desbordamiento pero seguían deshabilitadas.
  useEffect(() => {
    const el = pista.current
    if (!el) return
    revisarBordes()
    const ro = new ResizeObserver(revisarBordes)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  function mover(dir: -1 | 1) {
    const el = pista.current
    if (!el) return
    const tarjeta = el.querySelector('li')
    if (!tarjeta) return
    const paso = tarjeta.getBoundingClientRect().width + 66 // ancho + gap
    el.scrollBy({ left: paso * dir, behavior: 'smooth' })
  }

  return (
    <div className={s.carrusel}>
      <button
        type="button"
        className={`${s.flecha} ${s.prev}`}
        onClick={() => mover(-1)}
        disabled={alInicio}
        aria-label="Testimonio anterior"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <ul className={s.pista} ref={pista} onScroll={revisarBordes}>
        {TESTIMONIOS.map((t) => (
          <li key={t.author} className={s.testi}>
            <blockquote>
              <svg className={s.comilla} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 21c-.6 0-1-.4-1-1v-5.5c0-4.7 2.6-8 6.5-9.4.5-.2 1.1.1 1.3.6l.3.9c.2.5-.1 1.1-.6 1.3-2.2.8-3.6 2.4-3.9 4.6H20c.6 0 1 .4 1 1V20c0 .6-.4 1-1 1h-6ZM3 21c-.6 0-1-.4-1-1v-5.5C2 9.8 4.6 6.5 8.5 5.1c.5-.2 1.1.1 1.3.6l.3.9c.2.5-.1 1.1-.6 1.3-2.2.8-3.6 2.4-3.9 4.6H9c.6 0 1 .4 1 1V20c0 .6-.4 1-1 1H3Z" />
              </svg>
              <p>{t.body}</p>
            </blockquote>
            <div className={s.quien}>
              <span className={s.avatar} aria-hidden="true">
                {t.initials}
              </span>
              <div className={s.nombre}>
                <strong>{t.author}</strong>
                <span className={s.estrellas} role="img" aria-label={`${t.rating} de 5 estrellas`}>
                  {Array.from({ length: t.rating }, (_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
                    </svg>
                  ))}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`${s.flecha} ${s.next}`}
        onClick={() => mover(1)}
        disabled={alFinal}
        aria-label="Testimonio siguiente"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
