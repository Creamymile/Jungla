'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types'
import { urlFor } from '@/lib/sanity.client'

const statusLabel: Record<string, string> = {
  delivered: 'Delivered',
  'in-progress': 'In Progress',
  upcoming: 'Upcoming',
}

const FALLBACK_IMAGE = '/images/placeholder-villa.svg'

interface ProjectCardProps {
  project: Project
  tall?: boolean
}

export default function ProjectCard({ project, tall }: ProjectCardProps) {
  const slug = project.slug?.current || ''
  let imageSrc: string
  try {
    imageSrc = project.coverImage
      ? urlFor(project.coverImage).width(800).url()
      : FALLBACK_IMAGE
  } catch {
    imageSrc = FALLBACK_IMAGE
  }

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group relative block overflow-hidden ${tall ? 'h-full min-h-[520px]' : 'h-[300px] md:h-[340px]'}`}
    >
      {/* Image */}
      <Image
        src={imageSrc}
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
        <div className="min-w-0">
          <h3 className="font-serif text-cream text-base md:text-lg truncate">
            {project.title}
          </h3>
          <p className="text-cream/40 text-[11px] font-sans tracking-wider mt-0.5">
            {project.location}
            {project.bedrooms ? ` · ${project.bedrooms} bed` : ''}
            {project.sizeSqm ? ` · ${project.sizeSqm}m²` : ''}
            {project.poolType === 'private' ? ' · Private pool' : ''}
          </p>
        </div>

        {/* Buttons slide in from right on hover */}
        <div className="flex gap-2 flex-shrink-0 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          {project.isBookable && (
            <span className="h-8 px-4 bg-cream text-black text-[10px] font-sans font-medium tracking-widest uppercase inline-flex items-center whitespace-nowrap">
              Book Stay
            </span>
          )}
          <span className="h-8 px-4 border border-cream/30 text-cream text-[10px] font-sans font-medium tracking-widest uppercase inline-flex items-center whitespace-nowrap">
            More Info
          </span>
        </div>
      </div>
    </Link>
  )
}
