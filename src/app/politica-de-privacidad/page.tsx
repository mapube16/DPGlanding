import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { pageMetadata } from '@/lib/seo'
import { PAGES, NAP } from '@/lib/site'
import s from '../legal.module.css'

const page = PAGES.privacidad
export const metadata: Metadata = pageMetadata(page)

// AVISO: borrador conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015.
// TODO(cliente): debe revisarlo el abogado de DPG antes de publicar, y hay que
// registrar la base de datos ante la SIC si aplica por tamaño de la empresa.
export default function Page() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Inicio', path: '/' },
          { name: 'Política de privacidad', path: page.path },
        ]}
      />
      <article className={`wrap ${s.legal}`}>
        <h1>{page.h1}</h1>
        <p className={s.updated}>
          Última actualización: agosto de 2026 · Responsable del tratamiento: {NAP.legalName}
        </p>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          {NAP.legalName}, con domicilio en {NAP.street}, {NAP.city}, {NAP.region}, {NAP.countryName},
          correo <a href={`mailto:${NAP.email}`}>{NAP.email}</a> y teléfono{' '}
          <a href={`tel:${NAP.phone}`}>{NAP.phoneDisplay}</a>, es el responsable del tratamiento de
          los datos personales recolectados a través de este sitio web.
        </p>

        <h2>2. Datos que recolectamos</h2>
        <p>
          A través del formulario de contacto recolectamos nombre, correo electrónico, teléfono,
          asunto y el mensaje que decidas enviarnos. No solicitamos datos sensibles ni información
          financiera en este sitio.
        </p>
        <p>
          Si tienes activadas las cookies de analítica, recolectamos además datos de navegación
          agregados (páginas vistas, origen del tráfico, tipo de dispositivo) a través de Google Tag
          Manager y las herramientas que este administre.
        </p>

        <h2>3. Finalidad del tratamiento</h2>
        <ul>
          <li>Responder tu solicitud de asesoría, cotización o información.</li>
          <li>Enviarte la cotización y el condicionado del producto que consultaste.</li>
          <li>Dar seguimiento comercial a la solicitud y, si lo autorizas, enviarte información sobre productos y vencimientos.</li>
          <li>Cumplir obligaciones legales y contractuales derivadas de la intermediación de seguros.</li>
          <li>Medir de forma agregada el uso del sitio para mejorarlo.</li>
        </ul>

        <h2>4. Autorización</h2>
        <p>
          Al enviar el formulario autorizas de manera previa, expresa e informada el tratamiento de
          tus datos personales para las finalidades descritas. Puedes retirar la autorización en
          cualquier momento escribiendo a <a href={`mailto:${NAP.email}`}>{NAP.email}</a>.
        </p>

        <h2>5. Tus derechos como titular</h2>
        <p>
          Conforme al artículo 8 de la Ley 1581 de 2012 tienes derecho a conocer, actualizar y
          rectificar tus datos; solicitar prueba de la autorización otorgada; ser informado sobre el
          uso que se les ha dado; presentar quejas ante la Superintendencia de Industria y Comercio;
          revocar la autorización y solicitar la supresión de los datos cuando no exista un deber
          legal o contractual que lo impida; y acceder de forma gratuita a los datos que hayan sido
          objeto de tratamiento.
        </p>

        <h2>6. Cómo ejercer tus derechos</h2>
        <p>
          Envía tu solicitud a <a href={`mailto:${NAP.email}`}>{NAP.email}</a> indicando tu nombre,
          documento de identidad, el derecho que deseas ejercer y un canal de respuesta. Atendemos
          las consultas dentro de los diez (10) días hábiles siguientes y los reclamos dentro de los
          quince (15) días hábiles siguientes, en los términos de los artículos 14 y 15 de la Ley
          1581 de 2012.
        </p>

        <h2>7. Transferencia y transmisión de datos</h2>
        <p>
          Para cotizar y expedir pólizas compartimos los datos estrictamente necesarios con la
          aseguradora que emite el producto. Esas compañías actúan como responsables independientes
          y aplican sus propias políticas de tratamiento de datos.
        </p>

        <h2>8. Conservación</h2>
        <p>
          Conservamos los datos mientras exista una relación comercial vigente y durante los plazos
          adicionales que exija la normativa aplicable a la intermediación de seguros. Cumplidos esos
          plazos, se suprimen o anonimizan.
        </p>

        <h2>9. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y administrativas razonables para proteger los datos contra
          acceso no autorizado, pérdida o alteración. El sitio se sirve exclusivamente sobre HTTPS.
        </p>

        <h2>10. Cambios en esta política</h2>
        <p>
          Publicaremos cualquier modificación en esta misma página, actualizando la fecha del
          encabezado. Consulta también nuestros{' '}
          <Link href={PAGES.terminos.path}>términos y condiciones</Link>.
        </p>
      </article>
    </>
  )
}
