'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import RevealWrapper from '@/components/ui/RevealWrapper'
import type { Project } from '@/types'
import { urlFor } from '@/lib/sanity.client'

const FALLBACK_IMAGE = '/images/placeholder-villa.svg'

const statusLabel: Record<string, string> = {
  delivered: 'Delivered',
  'in-progress': 'In Progress',
  upcoming: 'Upcoming',
}

interface FeaturedProjectsProps {
  projects?: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) return null

  const items = projects

  return (
    <section className="px-[5.5vw] py-[120px]">
      <RevealWrapper>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-black/20" />
              Portfolio
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2]">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[11px] font-sans font-medium tracking-widest uppercase text-muted hover:text-black transition-colors"
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </RevealWrapper>

      {/* Asymmetric masonry: 1 tall left + 2x2 right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Tall card — left */}
        {items[0] && (
          <RevealWrapper className="lg:col-span-5 lg:row-span-2">
            <ProjectCard
              project={items[0]}
              image={items[0].coverImage ? urlFor(items[0].coverImage).width(800).url() : FALLBACK_IMAGE}
              tall
            />
          </RevealWrapper>
        )}

        {/* 4 smaller cards — right 2x2 grid */}
        <div className="lg:col-span-7 lg:row-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.slice(1, 5).map((project, i) => (
            <RevealWrapper
              key={project._id}
              delay={0.1 * (i + 1)}
            >
              <ProjectCard
                project={project}
                image={
                  project.coverImage
                    ? urlFor(project.coverImage).width(600).url()
                    : FALLBACK_IMAGE
                }
              />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  image,
  tall,
}: {
  project: Partial<Project>
  image: string
  tall?: boolean
}) {
  const slug = project.slug?.current || ''

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group relative block overflow-hidden ${tall ? 'h-full min-h-[500px]' : 'h-[280px] md:h-[320px]'}`}
    >
      {/* Image */}
      <Image
        src={image}
        alt={project.title || 'Project'}
        fill
        className="object-cover brightness-[0.92] group-hover:scale-105 transition-transform duration-700"
        sizes={tall ? '(max-width: 1024px) 100vw, 42vw' : '(max-width: 1024px) 100vw, 58vw'}
      />

      {/* Status badge */}
      {project.status && (
        <span className="absolute top-4 left-4 z-10 bg-cream text-black text-[10px] font-sans font-medium tracking-widest uppercase px-3 py-1.5">
          {statusLabel[project.status] || project.status}
        </span>
      )}

      {/* Info bar — always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 group-hover:bg-black transition-colors duration-300 px-5 py-4 flex items-center justify-between z-10">
        <div>
          <h3 className="font-serif text-cream text-base md:text-lg">
            {project.title}
          </h3>
          <p className="text-cream/40 text-[11px] font-sans tracking-wider mt-0.5">
            {project.location}
            {project.bedrooms ? ` · ${project.bedrooms} bed` : ''}
            {project.poolType === 'private' ? ' · Private pool' : ''}
          </p>
        </div>

        {/* Buttons slide in from right on hover */}
        <div className="flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          {project.isBookable && (
            <span className="h-8 px-4 bg-cream text-black text-[10px] font-sans font-medium tracking-widest uppercase inline-flex items-center">
              Book Stay
            </span>
          )}
          <span className="h-8 px-4 border border-cream/30 text-cream text-[10px] font-sans font-medium tracking-widest uppercase inline-flex items-center">
            More Info
          </span>
        </div>
      </div>
    </Link>
  )
}
