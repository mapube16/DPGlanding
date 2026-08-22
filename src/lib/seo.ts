import type { Metadata } from 'next'
import { NAP, BRAND, SITE_URL, PAGES, type PageMeta } from './site'

// Un solo helper produce title, description, canonical, hreflang, OG y Twitter
// para cada página. Evita canonicals olvidados o duplicados.
export function pageMetadata(page: PageMeta, ogImage = '/img/og-dpg-seguros.jpg'): Metadata {
  const url = SITE_URL + page.path
  return {
    title: page.title,
    description: page.description,
    keywords: [page.keyword, 'DPG Seguros', 'Armenia', 'Quindío', 'Colombia'],
    alternates: {
      canonical: url,
      languages: { 'es-CO': url, 'x-default': url },
    },
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      url,
      siteName: NAP.name,
      title: page.title,
      description: page.description,
      images: [{ url: SITE_URL + ogImage, width: 1200, height: 630, alt: `${page.keyword} — ${NAP.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [SITE_URL + ogImage],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  }
}

type Json = Record<string, unknown>

export function organizationSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': `${SITE_URL}/#organization`,
    name: NAP.name,
    legalName: NAP.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/dpg-logo.png`,
    image: `${SITE_URL}/img/og-dpg-seguros.jpg`,
    email: NAP.email,
    telephone: NAP.phone,
    foundingDate: NAP.foundingDate,
    description: PAGES.home.description,
    priceRange: '$$',
    areaServed: [
      { '@type': 'City', name: 'Armenia' },
      { '@type': 'AdministrativeArea', name: 'Quindío' },
      { '@type': 'Country', name: 'Colombia' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressRegion: NAP.region,
      postalCode: NAP.postalCode,
      addressCountry: NAP.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: NAP.latitude, longitude: NAP.longitude },
    hasMap: NAP.googleMapsUrl,
    openingHoursSpecification: BRAND.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [NAP.instagram, NAP.googleBusinessUrl],
  }
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: NAP.name,
    inLanguage: 'es-CO',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: SITE_URL + c.path,
    })),
  }
}



export function serviceSchema(page: PageMeta, faqs?: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${page.path}#service`,
    name: page.h1,
    serviceType: page.keyword,
    description: page.description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Colombia' },
    ...(faqs?.length ? { mainEntityOfPage: `${SITE_URL}${page.path}` } : {}),
  }
}

// AggregateRating solo si las reseñas son reales y verificables (política de Google).
export function reviewSchema(
  reviews: { author: string; body: string; rating: number }[],
  agregado?: { ratingValue: number; reviewCount: number },
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': `${SITE_URL}/#organization`,
    name: NAP.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      // Con Google a mano se usa su promedio y total reales, no solo las 5 visibles.
      ratingValue: (agregado?.ratingValue ?? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
      reviewCount: agregado?.reviewCount ?? reviews.length,
      bestRating: 5,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
    })),
  }
}
