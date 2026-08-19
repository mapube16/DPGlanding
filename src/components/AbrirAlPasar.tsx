'use client'

import { useEffect } from 'react'

// Los pilares se abren al pasar el cursor por encima, no al hacer clic.
// El estado sigue viviendo en los radios (persistencia, teclado y táctil):
// aquí solo se marca el radio correspondiente cuando el puntero entra.
//
// Se activa únicamente en dispositivos con puntero real. En táctil no hay
// hover, así que allí el toque sobre la etiqueta sigue funcionando como antes.
export default function AbrirAlPasar({ name }: { name: string }) {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const radios = Array.from(
      document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${name}"]`),
    )
    const parejas = radios
      .map((radio) => {
        const label = document.querySelector<HTMLLabelElement>(`label[for="${radio.id}"]`)
        return label ? { radio, label } : null
      })
      .filter((x): x is { radio: HTMLInputElement; label: HTMLLabelElement } => x !== null)

    const abrir = (radio: HTMLInputElement) => () => {
      if (radio.checked) return
      radio.checked = true
      // El evento no se dispara solo al asignar .checked; hace falta emitirlo
      // para que el ciclo automático se entere y se detenga.
      radio.dispatchEvent(new Event('change', { bubbles: true }))
    }

    const listeners = parejas.map(({ radio, label }) => {
      const fn = abrir(radio)
      label.addEventListener('mouseenter', fn)
      return { label, fn }
    })

    return () => listeners.forEach(({ label, fn }) => label.removeEventListener('mouseenter', fn))
  }, [name])

  return null
}
