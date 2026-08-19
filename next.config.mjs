/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // HTML estático: cada ruta se sirve como HTML real, rastreable sin JS
  trailingSlash: true,
  images: { unoptimized: true }, // ponytail: export estático no corre el optimizador; los PNG ya van dimensionados
  poweredByHeader: false,
}
export default nextConfig
