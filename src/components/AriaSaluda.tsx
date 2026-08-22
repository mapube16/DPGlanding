"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Aria saludando con la mano. El SVG llega ya incrustado como markup (ver
// lib/svg.ts) y aquí solo se le engancha la animación.
//
// El "rig" está en el propio archivo SVG: public/img/aria/aria-asistente-virtual-*.svg
// tiene grupos añadidos a mano sobre el export de Figma:
//
//   #aria-antebrazo  → antebrazo + puño + mano, gira sobre el CODO
//   #aria-ojo-izq / #aria-ojo-der → iris + brillo de cada ojo, se trasladan
//     para seguir el cursor (la base blanca del ojo se queda quieta)
//
// (También existe #aria-mano, pensado para animar la mano por separado, pero
// mover muñeca y codo a la vez leía como dos piezas desconectadas en vez de
// un solo brazo saludando; se dejó sin usar en vez de borrar el rig.)
//
// El centro de giro va en coordenadas del viewBox (0 0 645 973), que es justo
// lo que espera `svgOrigin` de GSAP. Usar `svgOrigin` y no `transformOrigin`
// evita el lío de transform-box/porcentajes en SVG: son las mismas
// coordenadas que ves en Figma.
const CODO = "195 550";

// Cuánto se desplaza el iris dentro del ojo, en unidades del viewBox (mismas
// coordenadas que CODO). El iris mide ~24 unidades de diámetro: con esto se
// mueve visiblemente sin salirse de la base blanca del ojo.
const RADIO_OJO = 7;

export default function AriaSaluda({
  svg,
  etiqueta,
  className,
}: {
  svg: string;
  etiqueta: string;
  className?: string;
}) {
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = caja.current;
    if (!raiz) return;

    const antebrazo = raiz.querySelector("#aria-antebrazo");
    if (!antebrazo) return;

    gsap.set(antebrazo, { svgOrigin: CODO, rotation: -3 });

    // Vaivén continuo, no un saludo puntual que arranca y para: un solo tween
    // que rebota entre dos ángulos (yoyo) y se repite para siempre mientras la
    // sección está a la vista. Amplitud chica (-3° a 8°) para que se lea como
    // un gesto sostenido y no como un aspaviento.
    const saludo = gsap.to(antebrazo, {
      rotation: 8,
      duration: 0.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    // Los ojos: el iris de cada ojo (#aria-ojo-izq/der, ver comentario del
    // rig arriba) se traslada hacia el cursor. Los dos se mueven igual, no
    // hace falta calcular el ángulo por separado para cada uno, están a
    // pocos píxeles de distancia entre sí, así que basta con un único vector
    // dirección calculado desde el punto medio entre los dos ojos.
    const ojoIzq = raiz.querySelector<SVGGElement>("#aria-ojo-izq");
    const ojoDer = raiz.querySelector<SVGGElement>("#aria-ojo-der");
    const svgEl = raiz.querySelector("svg");
    const tieneOjos = ojoIzq && ojoDer && svgEl;

    // getBBox() da la caja en coordenadas del viewBox, sin el transform que
    // luego le aplica GSAP: se puede leer una sola vez acá, antes de mover
    // nada, y no hay que sincronizar coordenadas a mano con el SVG.
    const centroCara = tieneOjos
      ? (() => {
          const cajaIzq = ojoIzq.getBBox();
          const cajaDer = ojoDer.getBBox();
          return {
            x:
              (cajaIzq.x + cajaIzq.width / 2 + cajaDer.x + cajaDer.width / 2) /
              2,
            y:
              (cajaIzq.y +
                cajaIzq.height / 2 +
                cajaDer.y +
                cajaDer.height / 2) /
              2,
          };
        })()
      : { x: 0, y: 0 };

    const moverOjos = tieneOjos
      ? gsap.quickTo([ojoIzq, ojoDer], "x", { duration: 0.35, ease: "power3" })
      : null;
    const moverOjosY = tieneOjos
      ? gsap.quickTo([ojoIzq, ojoDer], "y", { duration: 0.35, ease: "power3" })
      : null;

    const alMoverMouse = (evento: MouseEvent) => {
      if (!svgEl || !moverOjos || !moverOjosY) return;
      const rectSvg = svgEl.getBoundingClientRect();
      if (rectSvg.width === 0) return;

      // Los ojos se calculan en coordenadas del viewBox (645 de ancho), no
      // en píxeles de pantalla: sin esto el desplazamiento del iris cambiaría
      // de tamaño según qué tan grande se vea el SVG en cada breakpoint.
      const escala = 645 / rectSvg.width;
      const mouseX = (evento.clientX - rectSvg.left) * escala;
      const mouseY = (evento.clientY - rectSvg.top) * escala;
      const dx = mouseX - centroCara.x;
      const dy = mouseY - centroCara.y;
      const distancia = Math.hypot(dx, dy);

      if (distancia < 1) {
        moverOjos(0);
        moverOjosY(0);
        return;
      }
      moverOjos((dx / distancia) * RADIO_OJO);
      moverOjosY((dy / distancia) * RADIO_OJO);
    };

    // No saluda a una pantalla vacía: solo corre mientras la sección está a la
    // vista. play()/pause() (no restart/kill) para que retome donde iba en vez
    // de dar un salto al volver a entrar en foco. Los ojos siguen la misma
    // regla: escuchar mousemove en toda la ventana solo mientras Aria está en
    // pantalla, y recentrar la mirada al salir de foco.
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          saludo.play();
          if (tieneOjos) window.addEventListener("mousemove", alMoverMouse);
        } else {
          saludo.pause();
          if (tieneOjos) {
            window.removeEventListener("mousemove", alMoverMouse);
            gsap.to([ojoIzq, ojoDer], {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(raiz);

    return () => {
      io.disconnect();
      window.removeEventListener("mousemove", alMoverMouse);
      // revert() deja el brazo en la pose original antes de matar el tween:
      // si no, en un remontaje (React StrictMode en dev) se quedaría girado.
      saludo.revert();
      saludo.kill();
      if (tieneOjos) gsap.set([ojoIzq, ojoDer], { x: 0, y: 0 });
    };
  }, []);

  return (
    <div
      ref={caja}
      className={className}
      role="img"
      aria-label={etiqueta}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
