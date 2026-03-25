'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react'
import type { InvestmentOpportunity } from '@/types'
import { urlFor } from '@/lib/sanity.client'

const statusLabel: Record<string, string> = {
  available: 'Available',
  'in-progress': 'In Progress',
  completed: 'Completed',
}

const statusColor: Record<string, string> = {
  available: 'bg-cream text-black',
  'in-progress': 'bg-taupe/20 text-charcoal',
  completed: 'bg-black/10 text-muted',
}

const FALLBACK_IMAGE = '/images/placeholder-villa.svg'

interface OpportunityCardProps {
  opportunity: InvestmentOpportunity
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const slug = opportunity.slug?.current || ''
  let imageSrc: string
  try {
    imageSrc = opportunity.coverImage
      ? urlFor(opportunity.coverImage).width(800).url()
      : FALLBACK_IMAGE
  } catch {
    imageSrc = FALLBACK_IMAGE
  }

  return (
    <Link
      href={`/invest/${slug}`}
      className="group block overflow-hidden bg-white"
    >
      {/* Image */}
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={opportunity.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {opportunity.status && (
          <span
            className={`absolute top-4 left-4 text-[10px] font-sans font-medium tracking-widest uppercase px-3 py-1.5 ${statusColor[opportunity.status] || 'bg-cream text-black'}`}
          >
            {statusLabel[opportunity.status] || opportunity.status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="font-serif text-xl md:text-2xl mb-4 group-hover:text-charcoal transition-colors">
          {opportunity.title}
        </h3>

        {/* Key facts row */}
        <div className="flex flex-wrap gap-5 mb-6">
          {opportunity.investmentRange && (
            <div className="flex items-center gap-2">
              <DollarSign size={14} className="text-taupe" />
              <span className="text-sm text-muted font-light">{opportunity.investmentRange}</span>
            </div>
          )}
          {opportunity.expectedROI && (
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-taupe" />
              <span className="text-sm text-muted font-light">{opportunity.expectedROI}</span>
            </div>
          )}
          {opportunity.timeline && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-taupe" />
              <span className="text-sm text-muted font-light">{opportunity.timeline}</span>
            </div>
          )}
        </div>

        {/* Key facts chips */}
        {opportunity.keyFacts && opportunity.keyFacts.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {opportunity.keyFacts.slice(0, 3).map((fact, i) => (
              <span
                key={i}
                className="bg-cream text-[11px] font-sans tracking-wider px-3 py-1.5 text-charcoal"
              >
                {fact.label}: {fact.value}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-[11px] font-sans font-medium tracking-widest uppercase text-black/60 group-hover:text-black transition-colors">
          View Details
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
