'use client'

import { useRef } from 'react'
import s from './ModalAseguradora.module.css'

// Nodo 256:715 del Figma. Para los productos que se venden con dos
// aseguradoras, "Comprar" abre este diálogo y la persona elige con cuál.
// <dialog> nativo: foco atrapado, Esc y clic fuera lo cierran sin JS extra.
export default function ModalAseguradora({
  sura,
  sbs,
  className,
  children,
}: {
  sura: string
  sbs: string
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)

  function abrir() {
    const d = ref.current
    if (!d) return
    d.showModal()
    d.focus() // el foco queda en el diálogo, no en la X (evita el anillo azul)
  }

  return (
    <>
      <button type="button" className={className} onClick={abrir}>
        {children}
      </button>

      <dialog
        ref={ref}
        className={s.modal}
        tabIndex={-1}
        aria-labelledby="modal-aseguradora-titulo"
        onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      >
        <div className={s.cabecera}>
          <h2 className={s.titulo} id="modal-aseguradora-titulo">
            ¿Con cuál aseguradora quieres comprar?
          </h2>
          <p className={s.sub}>
            Puedes contratarlo con cualquiera de las dos. Te llevamos a su plataforma para
            completar la compra.
          </p>
          <button type="button" className={s.cerrar} aria-label="Cerrar" onClick={() => ref.current?.close()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={s.opciones}>
          <div className={s.opcion}>
            <img src="/img/aseguradoras/sura-logo.svg" alt="Sura" width={172} height={60} />
            <a className="btn btn--blue" href={sura} target="_blank" rel="noopener noreferrer">
              Comprar con Sura
            </a>
          </div>
          <div className={s.opcion}>
            <img src="/img/aseguradoras/sbs-logo.webp" alt="SBS Seguros" width={193} height={60} />
            <a className="btn btn--green" href={sbs} target="_blank" rel="noopener noreferrer">
              Comprar con SBS
            </a>
          </div>
        </div>
      </dialog>
    </>
  )
}
