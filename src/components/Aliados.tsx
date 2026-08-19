'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PAGES, BRAND } from '@/lib/site'
import { ORBITAS, ASEGURADORAS } from '@/lib/content'
import s from './Aliados.module.css'

// Nodos 162:696 / 162:769 / 167:1892, más dos notas del diseño:
//
//  167:1609 — órbitas 1 y 3 giran a la derecha con 5 aseguradoras cada una;
//             la 2 gira a la izquierda y lleva 8.
//  167:1614 — cada 5 segundos se resalta una aseguradora distinta con outline
//             verde, y eso actualiza el copy "Todas conectadas a ti a través de
//             DPG + _____".
//
// El giro es CSS puro (cada logo se contra-rota para no quedar cabeza abajo).
// Solo el resalte necesita estado.
const CICLO_MS = 5000

export default function Aliados() {
  const [activo, setActivo] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActivo((i) => (i + 1) % ASEGURADORAS.length), CICLO_MS)
    return () => clearInterval(id)
  }, [])

  const destacada = ASEGURADORAS[activo]

  return (
    <section className={s.aliados} id="aliados">
      <div className={s.ring} aria-hidden="true">
        <div className={s.core}>
          <Image
            src="/logo-dpg-seguros.webp"
            alt=""
            width={420}
            height={138}
            loading="lazy"
          />
        </div>

        {ORBITAS.map((orbita, oi) => (
          <div
            key={oi}
            className={`${s.orbita} ${orbita.sentido === 'izquierda' ? s.izquierda : s.derecha}`}
            style={{
              width: `${orbita.radio * 2}%`,
              height: `${orbita.radio * 2}%`,
              animationDuration: `${orbita.segundos}s`,
            }}
          >
            {orbita.logos.map((logo, li) => {
              const angulo = (li / orbita.logos.length) * 360
              const indice = ORBITAS.slice(0, oi).reduce((n, o) => n + o.logos.length, 0) + li
              return (
                // Tres capas: la primera coloca el logo sobre la circunferencia,
                // la segunda deshace ese ángulo y la tercera contrarresta el giro
                // de la órbita para que el logo nunca quede cabeza abajo.
                <div key={logo.file} className={s.slot} style={{ transform: `rotate(${angulo}deg)` }}>
                  <div className={s.pin} style={{ transform: `rotate(${-angulo}deg)` }}>
                    <div
                      className={`${s.contra} ${orbita.sentido === 'izquierda' ? s.contraDerecha : s.contraIzquierda} ${
                        indice === activo ? s.destacado : ''
                      }`}
                      style={{ animationDuration: `${orbita.segundos}s` }}
                    >
                      <img
                        src={`/img/aseguradoras/${logo.file}.webp`}
                        alt={`Seguros con ${logo.name}, aseguradora aliada de DPG Seguros`}
                        width={160}
                        height={160}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="wrap">
        <div className={s.col}>
          <h2>Todo el respaldo que necesitas, en un solo lugar</h2>
          <p>
            Trabajamos con más de {BRAND.insurersCount} compañías. Tú hablas con nosotros: un solo
            interlocutor. Nosotros buscamos entre todas la que mejor se ajusta a lo que necesitas.
          </p>
          <p className={s.claim}>
            Todas conectadas a ti a través de <strong>DPG + </strong>
            <strong className={s.nombre} key={destacada.file}>
              {destacada.name}
            </strong>
          </p>
          <Link className="btn btn--green" href={PAGES.asesoria.path}>
            Explorar opciones
          </Link>
        </div>
      </div>

      {/* Lista accesible: el anillo es decorativo, aquí van las 18 aseguradoras
          en texto para lectores de pantalla y para el rastreo. */}
      <ul className="sr-only">
        {ASEGURADORAS.map((a) => (
          <li key={a.file}>{a.name}</li>
        ))}
      </ul>
    </section>
  )
}
