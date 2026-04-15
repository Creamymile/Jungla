import { MetadataRoute } from 'next'
import { isSanityConfigured, sanityFetch } from '@/lib/sanity.client'
import { siteConfig } from '@/lib/site.config'

const SITE_URL = siteConfig.url

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/projects', '/invest', '/bookings', '/about', '/contact', '/privacy', '/terms'].map(
    (path) => {
      const isLegal = path === '/privacy' || path === '/terms'
      return {
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: (isLegal ? 'yearly' : 'weekly') as 'yearly' | 'weekly',
        priority: path === '' ? 1 : isLegal ? 0.3 : 0.8,
      }
    }
  )

  if (!isSanityConfigured) return staticPages

  try {
    const [projects, opportunities] = await Promise.all([
      sanityFetch<any[]>(`*[_type == "project"]{ slug, _updatedAt }`),
      sanityFetch<any[]>(`*[_type == "investmentOpportunity"]{ slug, _updatedAt }`),
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
