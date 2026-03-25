import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client, isSanityConfigured } from '@/lib/sanity.client'
import { PROJECT_BY_SLUG_QUERY } from '@/lib/sanity.queries'
import ProjectDetail from '@/components/projects/ProjectDetail'
import type { Project } from '@/types'

export const revalidate = 60

async function getProject(slug: string): Promise<Project | null> {
  if (!isSanityConfigured || !client) return null
  try {
    return (await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })) || null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return { title: 'Project Not Found — Jungla' }

  return {
    title: `${project.title} — Jungla Projects`,
    description: `${project.title} in ${project.location}. ${project.status === 'delivered' ? 'A delivered Jungla project.' : 'An upcoming Jungla development.'}`,
    openGraph: {
      title: `${project.title} — Jungla`,
      images: project.seo?.ogImage ? [{ url: '' }] : ['/og-image.jpg'],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProject(params.slug)
  if (!project) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: project.title,
    description: `${project.title} — a ${project.category || 'luxury'} project by Jungla in ${project.location || 'Lombok'}, Indonesia.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: project.location || 'Lombok',
      addressCountry: 'ID',
    },
    numberOfRooms: project.bedrooms,
    floorSize: project.sizeSqm
      ? { '@type': 'QuantitativeValue', value: project.sizeSqm, unitCode: 'MTK' }
      : undefined,
    offers: project.isBookable
      ? { '@type': 'Offer', availability: 'https://schema.org/InStock' }
      : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={project} />
    </>
  )
}
