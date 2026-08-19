'use client'

import { useEffect } from 'react'

// Los pilares y las razones son grupos de radios controlados por CSS. Este
// componente los va marcando en ciclo para que la sección se muestre sola, y
// se detiene para siempre en cuanto el usuario elige uno.
//
// Nota 167:1604: "el pilar que se abra de último debería quedar abierto (a
// diferencia de la animación en el prototipo que, por limitaciones de Figma,
// reabre automáticamente el pilar de Desarrollo)". Por eso el ciclo no vuelve
// a arrancar tras la primera interacción.
export default function AutoCiclo({
  name,
  intervalo = 6000,
  seccion,
}: {
  name: string
  intervalo?: number
  seccion: string
}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const radios = Array.from(
      document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${name}"]`),
    )
    if (radios.length < 2) return

    const contenedor = document.getElementById(seccion)
    let timer: ReturnType<typeof setInterval> | undefined
    let detenido = false
    let visible = false

    const parar = () => {
      detenido = true
      clearInterval(timer)
      timer = undefined
    }

    const avanzar = () => {
      const i = radios.findIndex((r) => r.checked)
      radios[(i + 1) % radios.length].checked = true
    }

    // Solo cicla mientras la sección está a la vista: fuera de pantalla no
    // aporta nada y gasta batería.
    const arrancar = () => {
      if (detenido || timer || !visible) return
      timer = setInterval(avanzar, intervalo)
    }

    const io = contenedor
      ? new IntersectionObserver(
          ([e]) => {
            visible = e.isIntersecting
            if (visible) arrancar()
            else {
              clearInterval(timer)
              timer = undefined
            }
          },
          { threshold: 0.35 },
        )
      : null
    if (contenedor && io) io.observe(contenedor)

    // Cualquier elección del usuario cancela el ciclo definitivamente.
    radios.forEach((r) => r.addEventListener('change', parar))

    return () => {
      clearInterval(timer)
      io?.disconnect()
      radios.forEach((r) => r.removeEventListener('change', parar))
    }
  }, [name, intervalo, seccion])

  return null
}
