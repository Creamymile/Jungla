import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site.config'

const SITE_URL = siteConfig.url

export default function robots(): MetadataRoute.Robots {
  // Pre-launch: while preview auth is enabled, tell crawlers to stay out so
  // Google doesn't see (and rank) the 401-locked pages.
  if (process.env.DISABLE_PREVIEW_AUTH !== 'true') {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

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
