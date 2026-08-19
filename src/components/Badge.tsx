import type { BadgeParte } from '@/lib/content'

// Píldora de aseguradoras. Cada nombre con URL se vuelve enlace externo; los
// que aún no tienen cotizador se muestran como texto plano.
export default function Badge({ partes, className }: { partes: BadgeParte[]; className?: string }) {
  return (
    <span className={className}>
      {partes.map((p, i) =>
        typeof p === 'string' ? (
          <span key={i}>{p}</span>
        ) : p.url ? (
          <a key={i} href={p.url} target="_blank" rel="noopener noreferrer">
            {p.label}
          </a>
        ) : (
          <span key={i}>{p.label}</span>
        ),
      )}
    </span>
  )
}
