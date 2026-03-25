import { MetadataRoute } from 'next'
import { client, isSanityConfigured } from '@/lib/sanity.client'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jungla.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/projects', '/invest', '/bookings', '/about', '/contact'].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })
  )

  if (!isSanityConfigured || !client) return staticPages

  try {
    const [projects, opportunities] = await Promise.all([
      client.fetch(`*[_type == "project"]{ slug, _updatedAt }`),
      client.fetch(`*[_type == "investmentOpportunity"]{ slug, _updatedAt }`),
    ])

    const projectPages = (projects || []).map((p: any) => ({
      url: `${SITE_URL}/projects/${p.slug.current}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    const investPages = (opportunities || []).map((o: any) => ({
      url: `${SITE_URL}/invest/${o.slug.current}`,
      lastModified: new Date(o._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...projectPages, ...investPages]
  } catch {
    return staticPages
  }
}
