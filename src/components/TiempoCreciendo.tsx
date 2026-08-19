'use client'

import { useEffect, useState } from 'react'
import s from './Pilares.module.css'

// "28 años 4 meses 17 días creciendo contigo". El valor se calcula en el build
// (para que el HTML estático ya traiga algo) y se corrige en el cliente, que es
// quien conoce la fecha real de la visita.
function transcurrido(desde: string, hasta: Date) {
  const d0 = new Date(desde)
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
  useEffect(() => setT(transcurrido(desde, new Date())), [desde])

  return (
    <p className={s.contador} suppressHydrationWarning>
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
