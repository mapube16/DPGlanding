'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import s from './Pilares.module.css'

// "28 años 4 meses 17 días creciendo contigo", contados desde la fundación
// (1 de abril de 1998). El HTML estático ya trae el valor real (por si no hay
// JS); en el navegador se recalcula con la fecha de la visita y, cuando el
// contador entra en pantalla, sube de 0 a ese valor con un count-up.
function transcurrido(desde: string, hasta: Date) {
  // Parseo manual: new Date("1998-04-01") es UTC y en Colombia cae al 31 de marzo.
  const [y, m, d] = desde.split("-").map(Number)
  const d0 = new Date(y, m - 1, d)
  let años = hasta.getFullYear() - d0.getFullYear()
  let meses = hasta.getMonth() - d0.getMonth()
  let dias = hasta.getDate() - d0.getDate()
  if (dias < 0) {
    meses -= 1
    dias += new Date(hasta.getFullYear(), hasta.getMonth(), 0).getDate()
  }
  if (meses < 0) {
    años -= 1
    meses += 12
  }
  return { años, meses, dias }
}

export default function TiempoCreciendo({ desde }: { desde: string }) {
  const [t, setT] = useState(() => transcurrido(desde, new Date()))
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fin = transcurrido(desde, new Date())
    const v = { años: 0, meses: 0, dias: 0 }
    let tween: gsap.core.Tween | undefined

    // Arranca en cero y solo cuenta cuando el panel está a la vista, una vez.
    setT({ ...v })
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || tween) return
        io.disconnect()
        tween = gsap.to(v, {
          ...fin,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () =>
            setT({ años: Math.round(v.años), meses: Math.round(v.meses), dias: Math.round(v.dias) }),
        })
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      tween?.kill()
    }
  }, [desde])

  return (
    <p className={s.contador} ref={ref} suppressHydrationWarning>
      <span>
        <strong>{t.años}</strong> años
      </span>
      <span>
        <strong>{t.meses}</strong> meses
      </span>
      <span>
        <strong>{t.dias}</strong> días creciendo contigo
      </span>
    </p>
  )
}
