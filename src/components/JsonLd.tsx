// Datos estructurados. Se serializan con escape de "<" para que ningún
// contenido pueda cerrar la etiqueta script.
export default function JsonLd({ data, id }: { data: Record<string, unknown>; id: string }) {
  return (
    <script
      type="application/ld+json"
      id={`ld-${id}`}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
