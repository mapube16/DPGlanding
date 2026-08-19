import Link from 'next/link'

// Los botones de comprar/cotizar apuntan a las aseguradoras. Un enlace externo
// no debe pasar por el router de Next, y necesita rel="noopener" al abrir en
// pestaña nueva. Este componente elige la etiqueta correcta según la URL.
export default function CtaLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  const externo = /^https?:\/\//.test(href)
  if (!externo) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    )
  }
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
