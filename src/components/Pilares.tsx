import { NAP } from '@/lib/site'
import TiempoCreciendo from './TiempoCreciendo'
import AutoCiclo from './AutoCiclo'
import AbrirAlPasar from './AbrirAlPasar'
import s from './Pilares.module.css'

// Nodo 94:209. Es un acordeón: una tarjeta expandida y dos colapsadas de 190px
// con la etiqueta rotada 90° y la inicial a 100px.
// Se resuelve con radios ocultos y selectores :checked — sin JavaScript.
const PILARES = [
  {
    id: 'desarrollo',
    letter: 'D',
    name: 'Desarrollo',
    text: 'Crecemos contigo. Empezamos en Armenia en 1998 y llevamos acompañando a familias y empresas durante más de dos décadas.',
    ancho: 335,
    metrica: 'contador' as const,
  },
  {
    id: 'proteccion',
    letter: 'P',
    name: 'Protección',
    text: 'No te atamos a una sola aseguradora. Comparamos entre todas nuestras aliadas y nos aseguramos de que entiendas exactamente qué estás contratando.',
    ancho: 385,
    metrica: { cifra: '27+', pie: 'aseguradoras aliadas', anchoPie: 190 },
  },
  {
    id: 'garantia',
    letter: 'G',
    name: 'Garantía',
    text: 'Estamos a tu lado cuando algo pasa. Línea de asistencia administrativa 24/7 y gestión directa de tu proceso hasta que recibas lo que te corresponde.',
    ancho: 353,
    metrica: { cifra: '24/7', pie: 'línea de asistencia administrativa', anchoPie: 180 },
  },
] as const

export default function Pilares() {
  return (
    <section className={s.seccion} id="pilares">
      <div className="wrap">
        <header className={s.head}>
          <h2>Tres letras: nuestra promesa</h2>
          <p>DPG no es solo un nombre. Son tres pilares que sostienen todo lo que hacemos.</p>
        </header>

        <AutoCiclo name="pilar" seccion="pilares" intervalo={6000} />
        <AbrirAlPasar name="pilar" />

        <div className={s.acordeon}>
          {PILARES.map((p, i) => (
            <input
              key={`r-${p.id}`}
              className={s.radio}
              type="radio"
              name="pilar"
              id={`pilar-${p.id}`}
              defaultChecked={i === 0}
            />
          ))}

          {PILARES.map((p) => (
            <article key={p.id} className={`${s.panel} ${s[p.id]}`}>
              {/* Colapsado: la etiqueta rotada y el "+" son el control de apertura. */}
              <label className={s.cerrado} htmlFor={`pilar-${p.id}`}>
                <span className={s.vertical}>{p.name}</span>
                <span className={s.inicial} aria-hidden="true">
                  {p.letter}
                </span>
                <svg className={s.mas} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M12 5v14" />
                </svg>
              </label>

              <div className={s.abierto}>
                <div className={s.cabecera}>
                  <h3>
                    <span className={s.nombre}>{p.name}</span>
                    <span className={s.caja} aria-hidden="true">
                      {p.letter}
                    </span>
                  </h3>
                  <p style={{ width: p.ancho }}>{p.text}</p>
                </div>
                {p.metrica === 'contador' ? (
                  <TiempoCreciendo desde={`${NAP.foundingDate}-01-01`} />
                ) : (
                  <p className={s.contador}>
                    <span>
                      <strong>{p.metrica.cifra}</strong>
                    </span>
                    <span className={s.pie} style={{ width: p.metrica.anchoPie }}>
                      {p.metrica.pie}
                    </span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
