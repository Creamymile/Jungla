'use client'

import Image from 'next/image'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { urlFor } from '@/lib/sanity.client'
import type { TeamMember } from '@/types'

const FALLBACK_PHOTO = '/images/placeholder-person.svg'

function getPhotoUrl(member: Partial<TeamMember>): string {
  if (member.photo?.asset) {
    try {
      return urlFor(member.photo).width(400).height(400).fit('crop').url()
    } catch {
      return FALLBACK_PHOTO
    }
  }
  return FALLBACK_PHOTO
}

interface TeamGridProps {
  team?: TeamMember[]
}

export default function TeamGrid({ team }: TeamGridProps) {
  if (!team || team.length === 0) return null

  const members = team

  return (
    <section className="bg-cream px-[5.5vw] py-[120px]">
      <RevealWrapper>
        <div className="mb-14">
          <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
            <span className="block w-8 h-px bg-black/20" />
            The Team
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2]">
            The People Behind Jungla
          </h2>
        </div>
      </RevealWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, i) => (
          <RevealWrapper key={member._id} delay={i * 0.08}>
            <div className="group bg-white overflow-hidden">
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={getPhotoUrl(member)}
                  alt={member.fullName || ''}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg">{member.fullName}</h3>
                <p className="text-muted text-sm font-light mt-1">{member.role}</p>
              </div>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}
