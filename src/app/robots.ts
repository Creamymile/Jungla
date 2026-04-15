import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site.config'

const SITE_URL = siteConfig.url

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
