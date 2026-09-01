import { PAGES } from './site'

// La píldora "Con SURA o SBS" enlaza cada aseguradora a su cotizador.
export type BadgeParte = string | { label: string; url?: string }

export type Product = {
  key: 'viajes' | 'arrendamiento' | 'kilometro'
  name: string
  cardLabel: string
  path: string
  badge: BadgeParte[]
  accent: 'blue' | 'green'
  icon: 'plane' | 'home' | 'gauge'
  short: string
  intro: string
  bullets: string[]
  buyUrl: string
  /** Productos que se venden con dos aseguradoras: el botón Comprar abre el modal. */
  compra?: { sura: string; sbs: string }
  quoteUrl: string
  faqs: { q: string; a: string }[]
}

// Enlaces reales de cotización/compra en línea (aportados por el cliente).
const SURA_VIAJES = 'https://www.suraenlinea.com/viajes/sura?codigoAsesor=10571'
const SURA_ARRENDAMIENTO =
  'https://www.suraenlinea.com/arrendamiento-digital/sura/cotizacion/calculadora?asesor=10571'
const SBS_ARRENDAMIENTO = 'https://tuarriendo.sbseguros.co/202736'
const SBS_KILOMETRO = 'https://sxkm.co/?intermediario:202736'

export const PRODUCTS: Product[] = [
  {
    key: 'viajes',
    name: 'Seguro de viajes',
    cardLabel: 'Seguro de viajes',
    path: PAGES.viajes.path,
    badge: ['Con ', { label: 'SURA', url: SURA_VIAJES }, ' · u otra'],
    accent: 'blue',
    icon: 'plane',
    short: 'Asistencia médica, equipaje y cancelación cubiertos en cualquier viaje.',
    intro:
      'Viaja tranquilo por Colombia o el mundo. Este seguro te acompaña ante cualquier imprevisto de salud o logística durante tu viaje, con asistencia 24/7 y atención inmediata.',
    bullets: [
      'Gastos médicos por accidente o enfermedad durante el viaje',
      'Equipaje: indemnización si se pierde o se retrasa más de 48 horas',
      'Acompañante: traslado y hospedaje si necesitas apoyo por una enfermedad o accidente',
      'Cancelación de vuelo o viaje por causas justificadas',
      'Robo de documentos: cubre los gastos para reponerlos',
    ],
    buyUrl: SURA_VIAJES,
    quoteUrl: SURA_VIAJES,
    faqs: [
      {
        q: '¿Cuánto cuesta un seguro de viajes desde Colombia?',
        a: 'El precio depende del destino, los días de viaje y la edad del viajero. Un viaje corto dentro de América cuesta bastante menos que uno a Europa con cobertura Schengen. Cotizar en línea toma menos de tres minutos y no tiene costo.',
      },
      {
        q: '¿El seguro de viajes sirve para el visado Schengen?',
        a: 'Sí, siempre que la póliza tenga cobertura médica mínima de 30.000 euros y sea válida en todo el espacio Schengen. Al cotizar te marcamos qué planes cumplen ese requisito.',
      },
      {
        q: '¿Puedo comprarlo el mismo día del vuelo?',
        a: 'Sí. La póliza puede emitirse el mismo día, pero debe quedar activa antes de iniciar el viaje: una vez saliste del país ya no es posible expedirla.',
      },
      {
        q: '¿Cubre enfermedades preexistentes?',
        a: 'La mayoría de planes cubre la urgencia o el episodio agudo de una preexistencia, no su tratamiento continuado. Si tienes una condición previa, pide asesoría antes de comprar para elegir el plan correcto.',
      },
    ],
  },
  {
    key: 'arrendamiento',
    name: 'Seguro de arrendamiento',
    cardLabel: 'Arrendamiento',
    path: PAGES.arrendamiento.path,
    badge: ['Con ', { label: 'SURA', url: SURA_ARRENDAMIENTO }, ' o ', { label: 'SBS', url: SBS_ARRENDAMIENTO }],
    accent: 'green',
    icon: 'home',
    short: 'Arrienda con mayor respaldo y tranquilidad.',
    intro:
      'Protege el cumplimiento del canon de arrendamiento y brinda respaldo al propietario durante el contrato.',
    bullets: [
      'Canon de arrendamiento y sus reajustes',
      'Cuotas de administración (en propiedad horizontal)',
      'Servicios públicos pendientes asumidos por el arrendador',
      'Coberturas adicionales opcionales: asistencia domiciliaria (plomería, electricidad, cerrajería, vidrios) y daños o faltantes del inventario',
    ],
    buyUrl: SBS_ARRENDAMIENTO,
    compra: { sura: SURA_ARRENDAMIENTO, sbs: SBS_ARRENDAMIENTO },
    quoteUrl: SURA_ARRENDAMIENTO,
    faqs: [
      {
        q: '¿Quién paga el seguro de arrendamiento, el propietario o el arrendatario?',
        a: 'Depende de cómo se pacte. En Colombia lo habitual es que lo asuma el arrendatario como parte del canon, pero también existen pólizas que contrata y paga el propietario. Manejamos las dos modalidades.',
      },
      {
        q: '¿Qué pasa si el arrendatario deja de pagar?',
        a: 'El propietario reporta el incumplimiento a la aseguradora y esta continúa pagando el canon mientras avanza el proceso de restitución. El propietario no deja de recibir su renta durante ese tiempo.',
      },
      {
        q: '¿Reemplaza al codeudor?',
        a: 'Sí, ese es su propósito. El estudio de la aseguradora sustituye la exigencia de un codeudor con finca raíz.',
      },
      {
        q: '¿Cubre los daños al inmueble?',
        a: 'La cobertura básica es sobre el canon y los servicios. Los daños al inmueble se cubren con amparos adicionales que se incluyen en la misma póliza; te los mostramos al cotizar.',
      },
    ],
  },
  {
    key: 'kilometro',
    name: 'Seguro por kilómetro',
    cardLabel: 'Por kilómetro',
    path: PAGES.kilometro.path,
    badge: ['Con ', { label: 'SBS', url: SBS_KILOMETRO }],
    accent: 'blue',
    icon: 'gauge',
    short: 'Pagas solo por lo que manejas: cobertura completa a un costo justo.',
    intro:
      'Ideal si usas poco el carro. Pagas una cuota fija mensual más el paquete de kilómetros que elijas, y solo cubres lo que realmente conduces.',
    bullets: [
      'Accidentes de tránsito',
      'Robo del vehículo',
      'Daños al carro',
      'Eventos de la naturaleza',
    ],
    buyUrl: SBS_KILOMETRO,
    quoteUrl: SBS_KILOMETRO,
    faqs: [
      {
        q: '¿Desde cuántos kilómetros al año conviene un seguro por kilómetro?',
        a: 'Como regla práctica, por debajo de 10.000 km al año casi siempre sale más barato que una póliza tradicional. Por encima de esa cifra conviene comparar las dos opciones antes de decidir.',
      },
      {
        q: '¿La cobertura es menor que la de un todo riesgo normal?',
        a: 'No. Los amparos son los mismos de una póliza todo riesgo; lo que cambia es la forma de cobrar la prima.',
      },
      {
        q: '¿Cómo se miden los kilómetros?',
        a: 'La aseguradora usa un dispositivo o el reporte del odómetro según el plan. En ambos casos el proceso es remoto y no te obliga a ir a una oficina.',
      },
      {
        q: '¿Qué pasa si un mes manejo mucho más de lo previsto?',
        a: 'Sigues cubierto. El exceso de kilómetros se liquida en el siguiente periodo de facturación, sin que la cobertura se suspenda.',
      },
    ],
  },
]

export const PILARES = [
  {
    letter: 'D',
    name: 'Desarrollo',
    text: 'Crecemos contigo. Empezamos en Armenia en 1998 y llevamos acompañando a familias y empresas durante más de dos décadas.',
  },
  {
    letter: 'P',
    name: 'Protección',
    text: 'Buscamos la póliza que de verdad responde cuando pasa algo, no la más barata del comparador.',
  },
  {
    letter: 'G',
    name: 'Garantía',
    text: 'Te acompañamos en la reclamación. Un solo interlocutor desde la cotización hasta la indemnización.',
  },
] as const

// Las seis variantes del nodo 97:499. Cada pestaña cambia el remate del
// titular, el texto de apoyo, la palabra de fondo y el acento (verde/azul).
export const RAZONES = [
  {
    key: 'acompanamiento',
    label: 'Acompañamiento',
    claim: 'estar ahí siempre.',
    fantasma: 'estar ahí siempre',
    acento: 'verde',
    text: 'Contigo antes, durante y después. Un solo interlocutor, siempre disponible.',
  },
  {
    key: 'indemnizacion',
    label: 'Indemnización',
    claim: 'cumplir lo prometido.',
    fantasma: 'cumplir lo prometido',
    acento: 'azul',
    text: 'Recibes lo que te corresponde, a tiempo y sin complicaciones.',
  },
  {
    key: 'expertos',
    label: 'Expertos',
    claim: 'gente que sabe.',
    fantasma: 'gente que sabe',
    acento: 'verde',
    text: 'Un equipo especializado para asesorarte en lo que necesites.',
  },
  {
    key: 'tecnologia',
    label: 'Tecnología',
    claim: 'todo más simple.',
    fantasma: 'todo más simple',
    acento: 'azul',
    text: 'Gestión moderna: seguimiento en línea, sin filas ni vueltas.',
  },
  {
    key: 'asesoria',
    label: 'Asesoría',
    claim: 'hablarte claro.',
    fantasma: 'hablarte claro',
    acento: 'verde',
    text: 'Antes de firmar, sabes exactamente qué estás contratando.',
  },
  {
    key: 'prevencion',
    label: 'Prevención',
    claim: 'anticipar los problemas.',
    fantasma: 'anticipar los problemas',
    acento: 'azul',
    text: 'Capacitamos a nuestros clientes para identificar lo que puede fallar, antes de que falle.',
  },
] as const

// Reparto en órbitas según la nota 167:1609 del diseño: la exterior lleva 8 y
// gira a la izquierda; las otras dos llevan 5 cada una y giran a la derecha.
// Cada logo lleva su propio alt: son 18 menciones de entidades reales.
export const ORBITAS = [
  {
    radio: 37,
    sentido: 'izquierda' as const,
    segundos: 90,
    logos: [
      { file: 'colmena', name: 'Colmena Seguros' },
      { file: 'nacional-de-seguros', name: 'Nacional de Seguros' },
      { file: 'berkley', name: 'Berkley' },
      { file: 'qualitas', name: 'Qualitas' },
      { file: 'positiva', name: 'Positiva' },
      { file: 'axa-colpatria', name: 'AXA Colpatria' },
      { file: 'cesce', name: 'Cesce' },
      { file: 'zurich', name: 'Zurich' },
    ],
  },
  {
    radio: 27.5,
    sentido: 'derecha' as const,
    segundos: 70,
    logos: [
      { file: 'seguros-bolivar', name: 'Seguros Bolívar' },
      { file: 'hdi', name: 'HDI Seguros' },
      { file: 'allianz', name: 'Allianz' },
      { file: 'seguros-mundial', name: 'Seguros Mundial' },
      { file: 'mapfre', name: 'Mapfre' },
    ],
  },
  {
    radio: 18,
    sentido: 'derecha' as const,
    segundos: 55,
    logos: [
      { file: 'sbs', name: 'SBS Seguros' },
      { file: 'previsora', name: 'La Previsora' },
      { file: 'seguros-del-estado', name: 'Seguros del Estado' },
      { file: 'sura', name: 'SURA' },
      { file: 'aseguradora-solidaria', name: 'Aseguradora Solidaria' },
    ],
  },
]

export const ASEGURADORAS = ORBITAS.flatMap((o) => o.logos)

// Reseñas: mientras esta bandera sea false, el sitio NO emite schema
// Review/AggregateRating. Marcar reseñas de muestra como reales viola las
// políticas de datos estructurados de Google y expone el dominio a una acción manual.
// TODO(cliente): pegar reseñas reales del Google Business Profile y poner true.
export const REVIEWS_SON_REALES = false

export const TESTIMONIOS = [
  { author: 'Andrés M.', initials: 'AM', rating: 5, body: 'Texto de muestra: pendiente de reemplazar por una reseña real de Google.' },
  { author: 'Valentina R.', initials: 'VR', rating: 5, body: 'Texto de muestra: pendiente de reemplazar por una reseña real de Google.' },
  { author: 'Camilo T.', initials: 'CT', rating: 5, body: 'Texto de muestra: pendiente de reemplazar por una reseña real de Google.' },
  { author: 'Stefanie G.', initials: 'SG', rating: 5, body: 'Texto de muestra: pendiente de reemplazar por una reseña real de Google.' },
]

// SME visible: el checklist pide autor identificable con biografía detallada.
// TODO(cliente): confirmar nombre, cargo y número de inscripción del asesor responsable.
export const SME = {
  name: 'Equipo técnico de DPG Seguros',
  role: 'Corredores de seguros inscritos · Armenia, Quindío',
  bio: 'El contenido de este sitio lo revisa el equipo técnico de DPG Seguros, corredores con más de 28 años intermediando pólizas de personas y empresas en el Quindío. Lo que publicamos sale de condicionados vigentes y de casos que hemos gestionado ante las aseguradoras, no de fichas comerciales.',
}

