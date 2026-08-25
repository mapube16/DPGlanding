'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { NAP } from '@/lib/site'
import s from './Contacto.module.css'

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT

// Los ojos de la asesora siguen el cursor, igual que en AriaSaluda (sección
// "Hola, soy Aria"): el SVG llega con #aria-ojo-izq/#aria-ojo-der ya
// preparados a mano en el archivo fuente (ver public/img/aria/aria-contacto-
// asesor-seguros.svg), y aquí solo se traslada el iris hacia el mouse.
const ANCHO_VIEWBOX = 885
const RADIO_OJO = 7

type Estado = 'idle' | 'enviando' | 'ok' | 'error'

export default function Contacto({ svgAsesor }: { svgAsesor: string }) {
  const [estado, setEstado] = useState<Estado>('idle')
  const [error, setError] = useState('')
  const arte = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raiz = arte.current
    if (!raiz) return

    const svgEl = raiz.querySelector<SVGSVGElement>('svg')
    const ojoIzq = raiz.querySelector<SVGGElement>('#aria-ojo-izq')
    const ojoDer = raiz.querySelector<SVGGElement>('#aria-ojo-der')
    if (!svgEl || !ojoIzq || !ojoDer) return

    const cajaIzq = ojoIzq.getBBox()
    const cajaDer = ojoDer.getBBox()
    const centroCara = {
      x: (cajaIzq.x + cajaIzq.width / 2 + cajaDer.x + cajaDer.width / 2) / 2,
      y: (cajaIzq.y + cajaIzq.height / 2 + cajaDer.y + cajaDer.height / 2) / 2,
    }

    const moverOjosX = gsap.quickTo([ojoIzq, ojoDer], 'x', { duration: 0.35, ease: 'power3' })
    const moverOjosY = gsap.quickTo([ojoIzq, ojoDer], 'y', { duration: 0.35, ease: 'power3' })

    const alMoverMouse = (evento: MouseEvent) => {
      const rectSvg = svgEl.getBoundingClientRect()
      if (rectSvg.width === 0) return
      const escala = ANCHO_VIEWBOX / rectSvg.width
      const mouseX = (evento.clientX - rectSvg.left) * escala
      const mouseY = (evento.clientY - rectSvg.top) * escala
      const dx = mouseX - centroCara.x
      const dy = mouseY - centroCara.y
      const distancia = Math.hypot(dx, dy)

      if (distancia < 1) {
        moverOjosX(0)
        moverOjosY(0)
        return
      }
      moverOjosX((dx / distancia) * RADIO_OJO)
      moverOjosY((dy / distancia) * RADIO_OJO)
    }

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          window.addEventListener('mousemove', alMoverMouse)
        } else {
          window.removeEventListener('mousemove', alMoverMouse)
          gsap.to([ojoIzq, ojoDer], { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
        }
      },
      { threshold: 0.3 },
    )
    io.observe(raiz)

    return () => {
      io.disconnect()
      window.removeEventListener('mousemove', alMoverMouse)
      gsap.set([ojoIzq, ojoDer], { x: 0, y: 0 })
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    // Honeypot: si viene lleno es un bot. Se descarta en silencio.
    // TODO(cliente): el diseño incluye reCAPTCHA; falta la site key para montarlo.
    if (data.empresa) return

    if (!data.nombre?.trim() || !data.email?.trim() || !data.mensaje?.trim()) {
      setEstado('error')
      setError('Completa nombre, correo y mensaje.')
      return
    }

    if (!ENDPOINT) {
      setEstado('error')
      setError(`El formulario aún no está conectado. Escríbenos a ${NAP.email}.`)
      return
    }

    setEstado('enviando')
    try {
      // El backend espera { data: {...} } y arma el correo con esas claves;
      // el honeypot no viaja para no ensuciar el mensaje que recibe DPG.
      const { empresa: _honeypot, ...campos } = data
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: campos }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setEstado('ok')
      form.reset()
    } catch {
      setEstado('error')
      setError(`No pudimos enviar el mensaje. Escríbenos a ${NAP.email} o llámanos.`)
    }
  }

  return (
    <section className={s.contacto} id="contacto">
      <div className={`wrap ${s.grid}`}>
        <div className={s.col}>
          <h2 className={s.title}>¿Te animas? Empecemos por una charla</h2>
          <p className={s.lead}>
            Cuéntanos qué es lo que quieres cuidar, y nosotros encontramos el seguro que de verdad te
            protege.
          </p>
          <p className={s.direct}>
            <a href={`tel:${NAP.phone}`}>Llamar {NAP.phoneDisplay}</a>
            <a href={`mailto:${NAP.email}`}>{NAP.email}</a>
            <a href={NAP.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              {NAP.street}, {NAP.city}
            </a>
          </p>
          <div
            ref={arte}
            className={s.art}
            role="img"
            aria-label="Asesora de DPG Seguros atendiendo una llamada de un cliente"
            dangerouslySetInnerHTML={{ __html: svgAsesor }}
          />
        </div>

        <form className={s.form} onSubmit={onSubmit}>
          <h3 className={s.formTitle}>Déjanos tus datos</h3>

          <div className={s.campo}>
            <label htmlFor="nombre">Nombre completo</label>
            <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" required autoComplete="name" />
          </div>

          <div className={s.row}>
            <div className={s.campo}>
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" name="email" type="email" placeholder="nombre@correo.com" required autoComplete="email" />
            </div>
            <div className={s.campo}>
              <label htmlFor="telefono">Teléfono</label>
              <input id="telefono" name="telefono" type="tel" placeholder="300 000 0000" autoComplete="tel" inputMode="tel" />
            </div>
          </div>

          <div className={s.campo}>
            <label htmlFor="asunto">Asunto</label>
            <input id="asunto" name="asunto" type="text" placeholder="¿Sobre qué nos escribes?" />
          </div>

          <div className={s.campo}>
            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" placeholder="Cuéntanos un poco..." required />
          </div>

          <div className={s.hp} aria-hidden="true">
            <label htmlFor="empresa">No llenar</label>
            <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <p className={s.consent}>
            Al enviar aceptas nuestra{' '}
            <a href="/politica-de-privacidad/">política de tratamiento de datos</a>.
          </p>

          <button className="btn btn--green" type="submit" disabled={estado === 'enviando'}>
            {estado === 'enviando' ? 'Enviando…' : 'Solicitar asesoría'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
              <path d="M6 12h16" />
            </svg>
          </button>

          <p className={s.status} role="status" aria-live="polite">
            {estado === 'ok' && 'Recibido. Te contactamos dentro del siguiente día hábil.'}
            {estado === 'error' && error}
          </p>
        </form>
      </div>
    </section>
  )
}
