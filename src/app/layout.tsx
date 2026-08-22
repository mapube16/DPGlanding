import type { Metadata, Viewport } from 'next'
import { Encode_Sans_Expanded } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import Gtm, { GtmNoScript } from '@/components/Gtm'
import { organizationSchema, websiteSchema } from '@/lib/seo'
import { NAP, SITE_URL, PAGES } from '@/lib/site'

// Ambas fuentes se auto-hospedan en el build: cero peticiones a terceros y
// cero CSS bloqueante, que es lo que castiga PageSpeed.
const encode = Encode_Sans_Expanded({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // el CSS usa 300 y 600 (botones SemiBold del Figma)
  display: 'swap',
  variable: '--font-encode',
})

// Los títulos del Figma usan 'Qlassik_Bold:Regular', o sea el archivo Bold. Se
// registra como peso 400 para que h1-h4 (font-weight 400) lo tomen tal cual;
// el corte Regular (Qlassik_TB.otf) no aparece en el diseño.
const qlassik = localFont({
  src: [{ path: '../fonts/QlassikBold_TB.otf', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-qlassik',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: PAGES.home.title, template: '%s' },
  description: PAGES.home.description,
  applicationName: NAP.name,
  authors: [{ name: NAP.name, url: SITE_URL }],
  creator: NAP.name,
  publisher: NAP.name,
  formatDetection: { telephone: true, address: true, email: true },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
}

export const viewport: Viewport = {
  themeColor: '#082f53',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${encode.variable} ${qlassik.variable}`}>
      <head>
        <Gtm />
        {/* Organización y sitio: se declaran una sola vez, en el layout. */}
        <JsonLd data={organizationSchema()} id="org" />
        <JsonLd data={websiteSchema()} id="website" />
      </head>
      <body>
        <GtmNoScript />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
