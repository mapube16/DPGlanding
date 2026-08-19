'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import s from './AriaFlotante.module.css'

// Nodo 181:353 — componente con 7 variantes, una por sección. Flota sobre la
// página y cambia de mensaje según la sección que estés viendo.
// Copy 1:1 con el diseño.
const MENSAJES: { id: string; texto: string }[] = [
  {
    id: 'productos',
    texto:
      'Estos tres los cotizas y compras tú mismo, en minutos. ¿No te suena ninguno? ¡Tenemos más opciones!',
  },
  {
    id: 'asesoria',
    texto:
      'Cada vida, negocio y momento es distinto. Por eso, construimos la recomendación desde cero para ti.',
  },
  {
    id: 'aliados',
    texto: 'Aquí no tienes que llamar a veinte lugares distintos. Nosotros comparamos y tú decides.',
  },
  {
    id: 'pilares',
    texto:
      'Desarrollo, Protección y Garantía. No es simplemente un eslogan, es cómo trabajamos desde 1998.',
  },
  {
    id: 'por-que-dpg',
    texto: 'Estos son los compromisos que asumimos con cada persona que confía en nosotros.',
  },
  {
    id: 'redes',
    texto:
      'Allí seguimos la conversación: consejos, novedades y respuestas a lo que más nos preguntan.',
  },
  {
    id: 'testimonios',
    texto: 'Historias reales de gente que hoy nos recomienda. Ese es nuestro mejor argumento.',
  },
]

export default function AriaFlotante() {
  const [activo, setActivo] = useState<number | null>(null)
  const [cerrado, setCerrado] = useState(false)
  const [abierta, setAbierta] = useState(false)
  const [leyendo, setLeyendo] = useState(false)
  const visibles = useRef<Set<string>>(new Set())

  useEffect(() => {
    const secciones = MENSAJES.map((m) => document.getElementById(m.id)).filter(
      (e): e is HTMLElement => Boolean(e),
    )
    if (!secciones.length) return

    // Se muestra el mensaje de la sección visible; si hay varias, la primera
    // en el orden del documento, para que no parpadee al hacer scroll rápido.
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visibles.current.add(e.target.id)
          else visibles.current.delete(e.target.id)
        }
        const i = MENSAJES.findIndex((m) => visibles.current.has(m.id))
        setActivo((prev) => {
          if (prev !== (i === -1 ? null : i)) setAbierta(false)
          return i === -1 ? null : i
        })
      },
      { rootMargin: '-35% 0px -35% 0px' },
    )
    secciones.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  // El icono de altavoz del diseño: lectura en voz alta con la API nativa.
  function leer(texto: string) {
    if (!('speechSynthesis' in window)) return
    if (leyendo) {
      window.speechSynthesis.cancel()
      setLeyendo(false)
      return
    }
    const u = new SpeechSynthesisUtterance(texto)
    u.lang = 'es-CO'
    u.onend = () => setLeyendo(false)
    setLeyendo(true)
    window.speechSynthesis.speak(u)
  }

  const visible = activo !== null && !cerrado
  const mensaje = activo !== null ? MENSAJES[activo] : null

  return (
    <aside
      className={`${s.flotante} ${visible ? s.visible : ''} ${abierta ? s.abierta : ''}`}
      aria-live="polite"
      aria-label="Aria, asistente de DPG Seguros"
      hidden={!visible}
    >
      {/* Colapsada es solo el avatar: así no tapa botones mientras navegas.
          El Figma define el componente pero no lo coloca en el landing. */}
      <button
        type="button"
        className={s.avatar}
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        aria-label={abierta ? 'Cerrar el mensaje de Aria' : 'Ver qué dice Aria sobre esta sección'}
      >
        <Image
          src="/img/aria/aria-dpg-seguros.svg"
          alt="Aria, la asistente de DPG Seguros"
          width={459}
          height={973}
          loading="lazy"
        />
      </button>
      {/* Los dos puntos que unen el avatar con la burbuja. */}
      <span className={`${s.punto} ${s.punto1}`} aria-hidden="true" />
      <span className={`${s.punto} ${s.punto2}`} aria-hidden="true" />

      <div className={s.burbuja}>
        <p key={mensaje?.id}>{mensaje?.texto}</p>
        <div className={s.acciones}>
          <button type="button" onClick={() => setCerrado(true)} aria-label="Ocultar a Aria">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6M9 9l6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => mensaje && leer(mensaje.texto)}
            aria-label={leyendo ? 'Detener lectura' : 'Escuchar el mensaje'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.384 3.383A.705.705 0 0 0 11 19.298z" />
              <path d="M16 9a5 5 0 0 1 0 6" />
              <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
            </svg>
          </button>
          <a href="#contacto" aria-label="Escribirnos">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
