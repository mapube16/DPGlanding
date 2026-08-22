import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Contacto from '@/components/Contacto'
import JsonLd from '@/components/JsonLd'
import Pilares from '@/components/Pilares'
import Aliados from '@/components/Aliados'
import AriaFlotante from '@/components/AriaFlotante'
import {
  Aria,
  Productos,
  Asesoria,
  PorQue,
  Redes,
  Testimonios,
} from '@/components/Sections'
import { pageMetadata, reviewSchema } from '@/lib/seo'
import { PAGES } from '@/lib/site'
import { TESTIMONIOS, REVIEWS_SON_REALES } from '@/lib/content'

export const metadata: Metadata = pageMetadata(PAGES.home)

export default function Home() {
  return (
    <>
      {/* Las reseñas reales se cargan en el navegador (lib/resenas.ts); el schema
          solo se emite cuando las de content.ts sean reales y verificables. */}
      {REVIEWS_SON_REALES && (
        <JsonLd
          data={reviewSchema(TESTIMONIOS.map((t) => ({ author: t.author, body: t.body, rating: t.rating })))}
          id="reviews"
        />
      )}

      <Hero />
      <Aria />
      <Productos />
      <Asesoria />
      <Aliados />
      <Pilares />
      <PorQue />
      <Redes />
      <Testimonios />
      <Contacto />
      <AriaFlotante />
    </>
  )
}
