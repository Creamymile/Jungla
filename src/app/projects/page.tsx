import { Suspense } from 'react'
import { Metadata } from 'next'
import { client, isSanityConfigured } from '@/lib/sanity.client'
import { ALL_PROJECTS_QUERY } from '@/lib/sanity.queries'
import type { Project } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import FilterBar from '@/components/projects/FilterBar'
import ProjectGrid from '@/components/projects/ProjectGrid'

export const metadata: Metadata = {
  title: 'Projects — Jungla',
  description:
    'Explore our luxury villa projects in Lombok, Indonesia. From delivered masterpieces to upcoming developments.',
}

export const dynamic = 'force-dynamic'

async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured || !client) return []
  try {
    return (await client.fetch(ALL_PROJECTS_QUERY)) || []
  } catch {
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="px-[5.5vw] py-[120px]">
      {/* Header */}
      <div className="mb-12">
        <SectionLabel className="mb-6">Portfolio</SectionLabel>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4">
          Our Projects
        </h1>
        <p className="text-muted text-lg font-light max-w-xl">
          From concept to keys — explore our delivered, in-progress, and upcoming
          developments across Lombok.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12">
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </div>

      {/* Grid */}
      {projects.length > 0 ? (
        <Suspense fallback={<div className="py-20 text-center text-muted">Loading projects…</div>}>
          <ProjectGrid projects={projects} />
        </Suspense>
      ) : (
        <div className="py-20 text-center">
          <p className="text-muted text-lg font-light">No projects listed yet. Check back soon.</p>
        </div>
      )}
    </section>
  )
}
