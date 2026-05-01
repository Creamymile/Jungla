import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSanityConfigured, sanityFetch, urlFor } from '@/lib/sanity.client'
import { PROJECT_BY_SLUG_QUERY, BOOKABLE_PROPERTY_BY_PROJECT_QUERY, ALL_PROJECT_SLUGS_QUERY } from '@/lib/sanity.queries'
import { sanitizeForJsonLd } from '@/lib/security'
import ProjectDetail from '@/components/projects/ProjectDetail'
import type { Project } from '@/types'

// ISR: regenerate at most every 60s
export const revalidate = 60

export async function generateStaticParams() {
  if (!isSanityConfigured) return []
  try {
    const slugs = await sanityFetch<{ slug: string }[]>(ALL_PROJECT_SLUGS_QUERY)
    return (slugs || []).map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

type BookableInfo = {
  priceFrom?: number
  currency?: 'EUR' | 'USD' | 'IDR'
  maxGuests?: number
  channelManagerId?: string
  status?: 'active' | 'coming-soon'
}

async function getProject(slug: string): Promise<{ project: Project; bookable: BookableInfo | null } | null> {
  if (!isSanityConfigured) return null
  try {
    const project = (await sanityFetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug })) || null
    if (!project) return null

    let bookable: (BookableInfo & { amenities?: string[] }) | null = null

    // Fetch linked bookable property for amenities + booking info
    if (project._id) {
      try {
        bookable = await sanityFetch<(BookableInfo & { amenities?: string[] }) | null>(
          BOOKABLE_PROPERTY_BY_PROJECT_QUERY,
          { projectId: project._id }
        )
      } catch {
        // Silently continue
      }
    }

    // Merge amenities from linked bookable property if project has none
    if ((!project.amenities || project.amenities.length === 0) && bookable?.amenities?.length) {
      project.amenities = bookable.amenities
    }

    return { project, bookable }
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const result = await getProject(params.slug)
  if (!result) return { title: 'Project Not Found — Jungla' }
  const { project } = result

  return {
    title: `${project.title} — Jungla Projects`,
    description: `${project.title} in ${project.location}. ${project.status === 'delivered' ? 'A delivered Jungla project.' : 'An upcoming Jungla development.'}`,
    openGraph: {
      title: `${project.title} — Jungla`,
      images: project.seo?.ogImage
        ? [{ url: urlFor(project.seo.ogImage).width(1200).height(630).url() }]
        : project.coverImage
          ? [{ url: urlFor(project.coverImage).width(1200).height(630).url() }]
          : [],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const result = await getProject(params.slug)
  if (!result) notFound()
  const { project, bookable } = result

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jungla.com'
  const pageUrl = `${siteUrl}/projects/${project.slug?.current || params.slug}`

  // Sanitise CMS-sourced strings before embedding in JSON-LD
  const safeTitle    = sanitizeForJsonLd(project.title)
  const safeLocation = sanitizeForJsonLd(project.location) || 'Lombok'

  const jsonLd = project.isBookable && bookable?.priceFrom
    ? {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: safeTitle,
        description: `${safeTitle} — a luxury villa in ${safeLocation}, Indonesia. Up to ${bookable.maxGuests || project.bedrooms || 2} guests.`,
        url: pageUrl,
        address: {
          '@type': 'PostalAddress',
          addressLocality: safeLocation,
          addressCountry: 'ID',
        },
        numberOfRooms: project.bedrooms,
        amenityFeature: (project.amenities || []).map((a: string) => ({
          '@type': 'LocationFeatureSpecification',
          name: sanitizeForJsonLd(a),
          value: true,
        })),
        priceRange: `${bookable.currency === 'EUR' ? '€' : bookable.currency === 'USD' ? '$' : 'Rp'}${bookable.priceFrom.toLocaleString()}+`,
        offers: {
          '@type': 'Offer',
          price: bookable.priceFrom,
          priceCurrency: bookable.currency || 'IDR',
          availability: 'https://schema.org/InStock',
          url: pageUrl,
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: safeTitle,
        description: `${safeTitle} — a ${project.category || 'luxury'} project by Jungla in ${safeLocation}, Indonesia.`,
        url: pageUrl,
        address: {
          '@type': 'PostalAddress',
          addressLocality: safeLocation,
          addressCountry: 'ID',
        },
        numberOfRooms: project.bedrooms,
        floorSize: project.sizeSqm
          ? { '@type': 'QuantitativeValue', value: project.sizeSqm, unitCode: 'MTK' }
          : undefined,
      }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={project} bookable={bookable} />
    </>
  )
}
