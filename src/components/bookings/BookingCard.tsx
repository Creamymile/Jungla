'use client'

import Image from 'next/image'
import { Users, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'
import type { BookableProperty } from '@/types'
import { urlFor } from '@/lib/sanity.client'

const FALLBACK_IMAGE = '/images/placeholder-villa.svg'

interface BookingCardProps {
  property: BookableProperty
}

export default function BookingCard({ property }: BookingCardProps) {
  const isComingSoon = property.status === 'coming-soon'

  let imageSrc: string
  try {
    imageSrc = property.coverImage
      ? urlFor(property.coverImage).width(800).url()
      : FALLBACK_IMAGE
  } catch {
    imageSrc = FALLBACK_IMAGE
  }

  const projectInfo = property.project as any

  return (
    <div className="group bg-white overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative h-[260px] overflow-hidden shrink-0">
        <Image
          src={imageSrc}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Coming Soon overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="bg-cream text-black text-[11px] font-sans font-medium tracking-widest uppercase px-5 py-2">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="font-serif text-xl mb-2">{property.name}</h3>

        {/* Location */}
        {projectInfo?.location && (
          <div className="flex items-center gap-2 text-muted text-sm font-light mb-4">
            <MapPin size={14} className="text-taupe" />
            {projectInfo.location}
          </div>
        )}

        {/* Details row */}
        <div className="flex flex-wrap items-center gap-4 mb-5 pb-5 border-b border-black/10">
          <div className="flex items-center gap-2 text-sm text-muted font-light">
            <Users size={14} className="text-taupe" />
            Up to {property.maxGuests} guests
          </div>
          <div className="text-sm font-light">
            From{' '}
            <span className="font-serif text-lg text-black">
              {property.currency === 'EUR' ? '€' : property.currency === 'USD' ? '$' : 'Rp'}
              {property.priceFrom?.toLocaleString()}
            </span>
            <span className="text-muted"> /night</span>
          </div>
        </div>

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 min-h-[60px]">
            {property.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="bg-cream text-[11px] font-sans tracking-wider px-3 py-1 text-charcoal h-fit"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* CTA — pushed to bottom */}
        <div className="mt-auto">
          {isComingSoon ? (
            <Button href="/contact" variant="ghost" className="w-full opacity-60 cursor-not-allowed pointer-events-none">
              Coming Soon
            </Button>
          ) : (
            <Button href="/contact" variant="dark" className="w-full">
              Book Now
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
