'use client'

import { useEffect, useRef, useState } from 'react'
import { PAGES } from '@/lib/site'
import s from './BarraMensaje.module.css'

// Nodo 133:1029. Las 6 variantes del componente son los fotogramas de un efecto
// de máquina de escribir: escribe una frase, la borra y pasa a la siguiente.
const FRASES = [
  'Escríbeme lo que quieras…',
  'Quiero asegurar mi viaje ✈️',
  '¿Qué es un seguro por kilómetro?',
]

const ESCRIBE_MS = 55
const BORRA_MS = 28
const PAUSA_MS = 1800

export default function BarraMensaje() {
  const [texto, setTexto] = useState(FRASES[0])
  const [activo, setActivo] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frase = 0
    let i = FRASES[0].length
    let borrando = false
    setActivo(true)

    // Se usa Array.from para no partir el emoji del avión por la mitad.
    const paso = () => {
      const letras = Array.from(FRASES[frase])
      if (!borrando && i === letras.length) {
        borrando = true
        timer.current = setTimeout(paso, PAUSA_MS)
        return
      }
      if (borrando && i === 0) {
        borrando = false
        frase = (frase + 1) % FRASES.length
        timer.current = setTimeout(paso, 320)
        return
      }
      i += borrando ? -1 : 1
      setTexto(Array.from(FRASES[frase]).slice(0, i).join(''))
      timer.current = setTimeout(paso, borrando ? BORRA_MS : ESCRIBE_MS)
    }

    timer.current = setTimeout(paso, PAUSA_MS)
    return () => {
      clearTimeout(timer.current)
      setActivo(false)
    }
  }, [])

  // Al enfocar el campo se detiene la animación: el usuario manda.
  function detener() {
    clearTimeout(timer.current)
    setActivo(false)
    setTexto('')
  }

  return (
    <form className={s.barra} action={PAGES.asesoria.path} method="get">
      <label className="sr-only" htmlFor="aria-mensaje">
        Escríbenos qué quieres cuidar
      </label>
      <div className={s.campo}>
        <input
          id="aria-mensaje"
          name="mensaje"
          type="text"
          placeholder=" "
          autoComplete="off"
          onFocus={detener}
          aria-describedby="aria-sugerencia"
        />
        {/* El texto animado va detrás del input, no en el atributo placeholder:
            así puede llevar el cursor parpadeante del diseño. */}
        <span className={s.sugerencia} id="aria-sugerencia" aria-hidden="true">
          {texto}
          <i className={`${s.cursor} ${activo ? s.parpadea : ''}`} />
        </span>
      </div>
      <button type="submit" aria-label="Enviar mensaje">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
          <path d="M6 12h16" />
        </svg>
      </button>
    </form>
  )
}
