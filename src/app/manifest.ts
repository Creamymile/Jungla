import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site.config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Luxury Villas in Lombok`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f0e8',
    theme_color: '#080808',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
