'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// La asesora guiña un ojo cuando la sección entra en pantalla bajando.
//
// El "rig" está en el propio SVG: public/img/aria/aria-asesoria-personalizada-
// seguros.svg lleva un grupo #aria-guino añadido a mano alrededor del ojo
// derecho (contorno, esclerótica, iris y brillo). Cerrarlo es aplastarlo en
// vertical sobre su centro: el contorno oscuro queda como la línea del párpado.
//
// El centro va en coordenadas del viewBox (0 0 1292 905), que es justo lo que
// espera svgOrigin de GSAP: son las mismas que se leen en Figma.
const CENTRO_OJO = '644 142'

export default function AriaAsesora({
  svg,
  etiqueta,
  className,
}: {
  svg: string
  etiqueta: string
  className?: string
}) {
  const caja = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raiz = caja.current
    if (!raiz) return
    const ojo = raiz.querySelector('#aria-guino')
    if (!ojo) return

    gsap.set(ojo, { svgOrigin: CENTRO_OJO })

    // Un guiño es cerrar y abrir: baja rápido y sube un poco más lento, que es
    // como se mueve un párpado de verdad.
    const guinar = () =>
      gsap
        .timeline()
        .to(ojo, { scaleY: 0.06, duration: 0.11, ease: 'power2.in' })
        .to(ojo, { scaleY: 1, duration: 0.17, ease: 'power2.out' }, '+=0.06')

    // Solo al entrar bajando: si entra al subir, la asesora ya quedó atrás.
    let ultimoY = window.scrollY
    const io = new IntersectionObserver(
      ([entrada]) => {
        const bajando = window.scrollY > ultimoY
        ultimoY = window.scrollY
        if (entrada.isIntersecting && bajando) guinar()
      },
      { threshold: 0.35 },
    )
    io.observe(raiz)

    return () => {
      io.disconnect()
      gsap.killTweensOf(ojo)
      gsap.set(ojo, { scaleY: 1 })
    }
  }, [])

  return (
    <div
      ref={caja}
      className={className}
      role="img"
      aria-label={etiqueta}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
