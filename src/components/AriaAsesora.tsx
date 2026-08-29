'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// La asesora parpadea mientras la sección está a la vista.
//
// El "rig" está en el propio SVG: public/img/aria/aria-asesoria-personalizada-
// seguros.svg lleva dos grupos añadidos a mano, #aria-parpado-izq y
// #aria-parpado-der, cada uno con el contorno, la esclerótica, el iris y el
// brillo de su ojo. Cerrarlos es aplastarlos en vertical sobre su centro: el
// contorno oscuro queda como la línea del párpado.
//
// Los centros van en coordenadas del viewBox (0 0 1292 905), que es lo que
// espera svgOrigin de GSAP: las mismas que se leen en Figma.
const CENTRO_IZQ = '567 142'
const CENTRO_DER = '644 142'

// Un parpadeo humano dura entre 100 y 150 ms. Lo dispara el scroll, así que lo
// que se limita es cada cuánto puede repetirse: sin ese freno parpadearía en
// cada píxel de desplazamiento. El margen se sortea para que no salga a ritmo
// de metrónomo.
const CIERRE = 0.07
const APERTURA = 0.11
const FRENO_MIN = 900
const FRENO_MAX = 2200

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
    const izq = raiz.querySelector('#aria-parpado-izq')
    const der = raiz.querySelector('#aria-parpado-der')
    if (!izq || !der) return

    gsap.set(izq, { svgOrigin: CENTRO_IZQ })
    gsap.set(der, { svgOrigin: CENTRO_DER })
    const ojos = [izq, der]

    // Cierra rápido y abre un poco más lento, como un párpado de verdad.
    const parpadeo = () =>
      gsap
        .timeline()
        .to(ojos, { scaleY: 0.05, duration: CIERRE, ease: 'power2.in' })
        .to(ojos, { scaleY: 1, duration: APERTURA, ease: 'power2.out' })

    let ultimo = 0
    let freno = 0

    const alScroll = () => {
      const ahora = performance.now()
      if (ahora - ultimo < freno) return
      ultimo = ahora
      freno = FRENO_MIN + Math.random() * (FRENO_MAX - FRENO_MIN)
      const linea = parpadeo()
      // De vez en cuando dos seguidos: es lo que hace que no parezca un bucle.
      if (Math.random() < 0.25) linea.add(parpadeo(), '+=0.12')
    }

    // Solo se escucha el scroll mientras se la ve; al entrar parpadea una vez,
    // que es el momento en que la persona la está mirando por primera vez.
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          ultimo = 0
          freno = 0
          alScroll()
          window.addEventListener('scroll', alScroll, { passive: true })
        } else {
          window.removeEventListener('scroll', alScroll)
        }
      },
      { threshold: 0.3 },
    )
    io.observe(raiz)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', alScroll)
      gsap.killTweensOf(ojos)
      gsap.set(ojos, { scaleY: 1 })
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
