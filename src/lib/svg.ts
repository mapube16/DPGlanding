import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Lee un SVG de /public y devuelve su markup para incrustarlo en el HTML.
//
// Por qué incrustarlo en vez de dejarlo en un <img>: dentro de un <img> el SVG
// es una imagen opaca, el JS de la página no puede ver sus <path>. Para que
// GSAP pueda mover un brazo, el SVG tiene que ser parte del DOM.
//
// Esto corre en un Server Component, así que con `output: 'export'` se ejecuta
// una sola vez durante `next build`: el markup queda dentro del HTML estático.
// No hay request extra ni parpadeo, y el navegador lo pinta igual de pronto que
// antes (mejor, de hecho: se ahorra una petición).
//
// Ojo: este módulo usa node:fs. No lo importes desde un componente 'use client'.

const cache = new Map<string, string>()

export function leerSvg(rutaEnPublic: string): string {
  const guardado = cache.get(rutaEnPublic)
  if (guardado !== undefined) return guardado

  const crudo = readFileSync(join(process.cwd(), 'public', rutaEnPublic), 'utf8')

  // Se tocan solo los atributos de la etiqueta <svg> raíz. Los <mask> de dentro
  // también tienen width/height y ahí sí importan: borrarlos rompe el dibujo.
  const markup = crudo.replace(/<svg\b[^>]*>/, (etiqueta) =>
    etiqueta
      .replace(/\s(?:width|height)="[^"]*"/g, '')
      // El alt lo pone el contenedor; el SVG en sí no le aporta nada a un
      // lector de pantalla más que 67 <path> sin nombre.
      .replace(/<svg\b/, '<svg aria-hidden="true" focusable="false"'),
  )

  cache.set(rutaEnPublic, markup)
  return markup
}
