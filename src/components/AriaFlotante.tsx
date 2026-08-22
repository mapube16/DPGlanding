'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import MENSAJES from '@/lib/aria-mensajes.json'
import s from './AriaFlotante.module.css'

// Nodo 181:353 — componente con 7 variantes, una por sección. Flota sobre la
// página y cambia de mensaje según la sección que estés viendo.
// Copy 1:1 con el diseño, en aria-mensajes.json: el mismo archivo alimenta al
// script que graba las voces (scripts/generar-voz-aria.mjs).

export default function AriaFlotante() {
  const [activo, setActivo] = useState<number | null>(null)
  const [cerrado, setCerrado] = useState(false)
  const [abierta, setAbierta] = useState(false)
  const [leyendo, setLeyendo] = useState(false)
  const visibles = useRef<Set<string>>(new Set())
  const audio = useRef<HTMLAudioElement | null>(null)

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

  // Al cambiar de sección o al desmontar, se calla: si no, Aria seguía hablando
  // de una sección que ya dejaste atrás.
  useEffect(() => detener, [activo])

  function detener() {
    audio.current?.pause()
    audio.current = null
    window.speechSynthesis?.cancel()
    setLeyendo(false)
  }

  // Voz de Aria grabada con Deepgram (scripts/generar-voz-aria.mjs). Si el mp3
  // no está o el navegador lo bloquea, cae en la voz del sistema para que el
  // botón nunca quede muerto.
  function hablar(texto: string) {
    audio.current = null
    if (!('speechSynthesis' in window)) return setLeyendo(false)
    const u = new SpeechSynthesisUtterance(texto)
    u.lang = 'es-CO'
    u.onend = () => setLeyendo(false)
    window.speechSynthesis.speak(u)
  }

  function leer(mensaje: { id: string; texto: string }) {
    if (leyendo) return detener()
    setLeyendo(true)
    const pista = new Audio(`/audio/aria/${mensaje.id}.mp3`)
    audio.current = pista
    pista.onended = detener
    pista.onerror = () => hablar(mensaje.texto)
    pista.play().catch(() => hablar(mensaje.texto))
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
            onClick={() => mensaje && leer(mensaje)}
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
