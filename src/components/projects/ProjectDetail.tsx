'use client'

import { PortableText } from '@portabletext/react'
import { MapPin, Bed, Maximize2, Waves } from 'lucide-react'
import RevealWrapper from '@/components/ui/RevealWrapper'
import Button from '@/components/ui/Button'
import ImageGallery from './ImageGallery'
import type { Project } from '@/types'

const statusLabel: Record<string, string> = {
  delivered: 'Delivered',
  'in-progress': 'In Progress',
  upcoming: 'Upcoming',
}

const categoryLabel: Record<string, string> = {
  villa: 'Villa',
  entertainment: 'Entertainment',
  horeca: 'Horeca',
}

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const details = [
    project.location && { icon: MapPin, label: 'Location', value: project.location },
    project.bedrooms && { icon: Bed, label: 'Bedrooms', value: `${project.bedrooms}` },
    project.sizeSqm && { icon: Maximize2, label: 'Size', value: `${project.sizeSqm} m²` },
    project.poolType && project.poolType !== 'none' && {
      icon: Waves,
      label: 'Pool',
      value: project.poolType === 'private' ? 'Private Pool' : 'Shared Pool',
    },
  ].filter(Boolean) as { icon: any; label: string; value: string }[]

  return (
    <div>
      {/* Header */}
      <RevealWrapper>
        <section className="px-[5.5vw] pt-16 pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {project.status && (
              <span className="bg-cream text-black text-[10px] font-sans font-medium tracking-widest uppercase px-3 py-1.5">
                {statusLabel[project.status] || project.status}
              </span>
            )}
            {project.category && (
              <span className="border border-black/10 text-muted text-[10px] font-sans font-medium tracking-widest uppercase px-3 py-1.5">
                {categoryLabel[project.category] || project.category}
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            {project.title}
          </h1>

          {/* Detail facts row */}
          {details.length > 0 && (
            <div className="flex flex-wrap gap-6 border-t border-b border-black/10 py-5">
              {details.map((d) => (
                <div key={d.label} className="flex items-center gap-2.5">
                  <d.icon size={16} className="text-taupe" />
                  <div>
                    <span className="text-muted text-[10px] font-sans tracking-widest uppercase block">
                      {d.label}
                    </span>
                    <span className="text-sm font-light">{d.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </RevealWrapper>

      {/* Gallery */}
      <RevealWrapper>
        <section className="px-[5.5vw] pb-16">
          <ImageGallery images={project.gallery} />
        </section>
      </RevealWrapper>

      {/* Description + CTA */}
      <RevealWrapper>
        <section className="px-[5.5vw] pb-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Description */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl mb-6">About This Project</h2>
              {project.description && project.description.length > 0 ? (
                <div className="prose prose-lg max-w-none text-muted font-light leading-relaxed [&_strong]:text-black [&_strong]:font-medium">
                  <PortableText value={project.description} />
                </div>
              ) : (
                <p className="text-muted font-light leading-relaxed">
                  A meticulously crafted property that blends contemporary luxury
                  with the natural beauty of Lombok. Designed with European building
                  standards and finished with locally sourced materials, this project
                  exemplifies the Jungla approach to tropical living.
                </p>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-cream p-8 md:p-10">
                <h3 className="font-serif text-xl mb-4">Interested?</h3>
                <p className="text-muted text-sm font-light leading-relaxed mb-8">
                  {project.isBookable
                    ? 'This property is available for booking. Experience luxury island living first-hand.'
                    : 'Get in touch to learn more about this project or explore investment opportunities.'}
                </p>
                <div className="flex flex-col gap-3">
                  {project.isBookable && (
                    <Button href="/bookings" variant="dark" className="w-full">
                      Book a Stay
                    </Button>
                  )}
                  <Button href="/contact" variant={project.isBookable ? 'ghost' : 'dark'} className="w-full">
                    Contact Us
                  </Button>
                  <Button href="/invest" variant="ghost" className="w-full">
                    Invest With Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealWrapper>
    </div>
  )
}
