import type { Metadata } from 'next'
import ProductoPage from '@/components/ProductoPage'
import { pageMetadata } from '@/lib/seo'
import { PAGES } from '@/lib/site'
import { PRODUCTS } from '@/lib/content'

const product = PRODUCTS.find((p) => p.key === 'arrendamiento')!

export const metadata: Metadata = pageMetadata(PAGES.arrendamiento)

export default function Page() {
  return <ProductoPage product={product} />
}
