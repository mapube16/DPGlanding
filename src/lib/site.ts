// Fuente única de verdad del negocio: NAP consistente (checklist local SEO),
// datos de marca y catálogo de páginas. Todo lo demás lee de aquí.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dpgseguros.com'
).replace(/\/$/, '')

// NAP — debe ser idéntico aquí, en el footer, en Google Business Profile y en cada citación.
export const NAP = {
  name: 'DPG Seguros',
  legalName: 'DPG Seguros — Desarrollo, Protección, Garantía',
  street: 'Carrera 15 # 4N-44',
  city: 'Armenia',
  region: 'Quindío',
  regionCode: 'CO-QUI',
  postalCode: '630004',
  country: 'CO',
  countryName: 'Colombia',
  email: 'gerencia@dpgseguros.com',
  // TODO(cliente): reemplazar por el teléfono real antes de publicar.
  // Se usa en enlaces tel:, en el schema LocalBusiness y en las citaciones.
  phone: process.env.NEXT_PUBLIC_PHONE || '+576067410000',
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || '(606) 741 0000',
  foundingDate: '1998',
  latitude: 4.5389,
  longitude: -75.6725,
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Carrera+15+%234N-44+Armenia+Quind%C3%ADo',
  googleBusinessUrl: 'https://www.google.com/maps/search/?api=1&query=DPG+Seguros+Armenia+Quind%C3%ADo',
  instagram: 'https://www.instagram.com/dpg_seguros/',
} as const

export const BRAND = {
  tagline: 'Siéntete seguro',
  yearsText: 'Más de 28 años',
  insurersCount: 27,
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],
} as const

export type PageMeta = {
  path: string
  title: string
  h1: string
  keyword: string
  description: string
  priority: number
  changeFrequency: 'yearly' | 'monthly' | 'weekly'
  inSitemap: boolean
}

// Catálogo de rutas. Alimenta el sitemap, los breadcrumbs y la navegación,
// de modo que ninguna página quede huérfana y todas estén a <= 2 clics de la home.
export const PAGES: Record<string, PageMeta> = {
  home: {
    path: '/',
    title: 'Seguros en Armenia, Quindío | DPG Seguros, corredor con 28 años',
    h1: 'Un día cualquiera, protegido de sol a luna',
    keyword: 'seguros en Armenia',
    description:
      'Corredor de seguros en Armenia, Quindío con 28 años de experiencia. Compra en línea seguros de viajes, arrendamiento y por kilómetro con 27+ aseguradoras.',
    priority: 1.0,
    changeFrequency: 'monthly',
    inSitemap: true,
  },
  viajes: {
    path: '/seguro-de-viajes/',
    title: 'Seguro de viajes internacional desde Colombia | DPG Seguros',
    h1: 'Seguro de viajes que responde donde estés',
    keyword: 'seguro de viajes',
    description:
      'Seguro de viajes con asistencia médica, equipaje y cancelación en cualquier destino. Cotiza en línea en minutos con el respaldo de SURA y otras aseguradoras.',
    priority: 0.9,
    changeFrequency: 'monthly',
    inSitemap: true,
  },
  arrendamiento: {
    path: '/seguro-de-arrendamiento/',
    title: 'Seguro de arrendamiento sin fiador en Colombia | DPG Seguros',
    h1: 'Seguro de arrendamiento que protege tu canon',
    keyword: 'seguro de arrendamiento',
    description:
      'Seguro de arrendamiento que cubre el canon y tu inmueble: arrienda con respaldo y sin fiador. Cotiza en línea con SURA o SBS desde Armenia, Quindío.',
    priority: 0.9,
    changeFrequency: 'monthly',
    inSitemap: true,
  },
  kilometro: {
    path: '/seguro-por-kilometro/',
    title: 'Seguro de carro por kilómetro: pagas lo que manejas | DPG Seguros',
    h1: 'Seguro por kilómetro para quien maneja poco',
    keyword: 'seguro por kilómetro',
    description:
      'Seguro de carro por kilómetro: cobertura todo riesgo pagando solo por lo que manejas. Cotiza en línea con SBS y ahorra si usas poco tu vehículo.',
    priority: 0.9,
    changeFrequency: 'monthly',
    inSitemap: true,
  },
  asesoria: {
    path: '/asesoria-en-seguros/',
    title: 'Asesoría en seguros gratuita con un asesor humano | DPG Seguros',
    h1: 'Asesoría en seguros hecha para tu caso',
    keyword: 'asesoría en seguros',
    description:
      'Asesoría en seguros sin costo: un asesor humano revisa contigo qué necesitas y compara más de 27 aseguradoras antes de recomendarte una póliza.',
    priority: 0.9,
    changeFrequency: 'monthly',
    inSitemap: true,
  },
  nosotros: {
    path: '/nosotros/',
    title: 'Corredor de seguros en Armenia desde 1998 | Sobre DPG Seguros',
    h1: 'Somos el corredor de seguros que nació en Armenia',
    keyword: 'corredor de seguros en Armenia',
    description:
      'DPG Seguros es un corredor de seguros fundado en Armenia, Quindío en 1998. Conoce nuestro equipo, nuestros tres pilares y por qué nos eligen las familias y empresas.',
    priority: 0.8,
    changeFrequency: 'yearly',
    inSitemap: true,
  },
  privacidad: {
    path: '/politica-de-privacidad/',
    title: 'Política de tratamiento de datos personales | DPG Seguros',
    h1: 'Política de tratamiento de datos personales',
    keyword: 'política de privacidad',
    description:
      'Cómo DPG Seguros recolecta, usa, conserva y protege tus datos personales, y cómo ejercer tus derechos como titular conforme a la Ley 1581 de 2012 de Colombia.',
    priority: 0.3,
    changeFrequency: 'yearly',
    inSitemap: true,
  },
  terminos: {
    path: '/terminos-y-condiciones/',
    title: 'Términos y condiciones de uso del sitio | DPG Seguros',
    h1: 'Términos y condiciones',
    keyword: 'términos y condiciones',
    description:
      'Condiciones de uso del sitio web de DPG Seguros, alcance de la información publicada y responsabilidades del usuario.',
    priority: 0.3,
    changeFrequency: 'yearly',
    inSitemap: true,
  },
}

export const NAV_LINKS = [
  { href: PAGES.viajes.path, label: 'Seguro de viajes' },
  { href: PAGES.arrendamiento.path, label: 'Arrendamiento' },
  { href: PAGES.kilometro.path, label: 'Por kilómetro' },
  { href: PAGES.asesoria.path, label: 'Asesoría' },
  { href: PAGES.nosotros.path, label: 'Nosotros' },
]
