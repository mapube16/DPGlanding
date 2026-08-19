import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { pageMetadata } from '@/lib/seo'
import { PAGES, NAP } from '@/lib/site'
import s from '../legal.module.css'

const page = PAGES.terminos
export const metadata: Metadata = pageMetadata(page)

// AVISO: borrador. TODO(cliente): revisión del abogado de DPG antes de publicar.
export default function Page() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Inicio', path: '/' },
          { name: 'Términos y condiciones', path: page.path },
        ]}
      />
      <article className={`wrap ${s.legal}`}>
        <h1>{page.h1}</h1>
        <p className={s.updated}>Última actualización: agosto de 2026</p>

        <h2>1. Quiénes somos</h2>
        <p>
          Este sitio pertenece a {NAP.legalName}, corredor de seguros con domicilio en {NAP.street},{' '}
          {NAP.city}, {NAP.region}, {NAP.countryName}. Nuestra actividad es la intermediación de
          seguros: no somos una compañía aseguradora y no emitimos pólizas.
        </p>

        <h2>2. Naturaleza de la información publicada</h2>
        <p>
          Los textos, coberturas y ejemplos de este sitio son informativos y buscan explicar de forma
          sencilla cómo funcionan los productos. <strong>No constituyen una oferta mercantil ni
          reemplazan el condicionado</strong> de la póliza. Las coberturas, exclusiones, deducibles,
          períodos de carencia y valores asegurados que aplican en cada caso son únicamente los del
          condicionado y la carátula que emite la aseguradora.
        </p>

        <h2>3. Cotizaciones</h2>
        <p>
          Las cotizaciones tienen la vigencia que indique la aseguradora y están sujetas a su estudio
          y aceptación. Una cotización no implica que el riesgo esté cubierto: la cobertura inicia
          únicamente cuando la póliza se expide y se cumplen las condiciones de pago pactadas.
        </p>

        <h2>4. Enlaces a terceros</h2>
        <p>
          Algunos botones de compra y cotización te llevan a plataformas de las aseguradoras. Esos
          sitios se rigen por sus propios términos y políticas de datos, sobre los que no tenemos
          control.
        </p>

        <h2>5. Uso del sitio</h2>
        <p>
          Te comprometes a usar el sitio de buena fe, a entregar información veraz en los formularios
          y a no intentar acceder a áreas restringidas, interferir con el servicio ni extraer datos de
          forma automatizada sin autorización.
        </p>

        <h2>6. Propiedad intelectual</h2>
        <p>
          La marca DPG Seguros, el logotipo, las ilustraciones y los textos de este sitio son
          propiedad de {NAP.legalName} o se usan con licencia. Los logotipos de las aseguradoras
          pertenecen a sus respectivos titulares y se muestran únicamente para identificar a las
          compañías con las que trabajamos.
        </p>

        <h2>7. Limitación de responsabilidad</h2>
        <p>
          Procuramos que la información esté actualizada, pero las condiciones de los productos
          cambian. No respondemos por decisiones tomadas exclusivamente con base en el contenido de
          este sitio sin haber revisado el condicionado ni haber consultado con un asesor.
        </p>

        <h2>8. Datos personales</h2>
        <p>
          El tratamiento de tus datos se rige por nuestra{' '}
          <Link href={PAGES.privacidad.path}>política de tratamiento de datos personales</Link>.
        </p>

        <h2>9. Ley aplicable</h2>
        <p>
          Estos términos se rigen por la ley colombiana. Cualquier controversia se someterá a los
          jueces competentes de la República de Colombia.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Para cualquier duda sobre estos términos escríbenos a{' '}
          <a href={`mailto:${NAP.email}`}>{NAP.email}</a> o llámanos al{' '}
          <a href={`tel:${NAP.phone}`}>{NAP.phoneDisplay}</a>.
        </p>
      </article>
    </>
  )
}
