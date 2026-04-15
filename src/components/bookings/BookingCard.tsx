'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Users, MapPin, Bed } from 'lucide-react'
import Button from '@/components/ui/Button'
import BookingInquiryModal from '@/components/bookings/BookingInquiryModal'
import { urlFor } from '@/lib/sanity.client'
import type { BookingItem } from '@/app/bookings/page'

const FALLBACK_IMAGE = '/images/placeholder-villa.svg'
const MAX_VISIBLE_AMENITIES = 6

interface BookingCardProps {
  item: BookingItem
}

export default function BookingCard({ item }: BookingCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const isProject = item.source === 'project'

  // Normalize fields across both item types
  const name = isProject ? item.title : item.name
  const coverImage = item.coverImage
  const isComingSoon = isProject
    ? item.status === 'upcoming'
    : item.status === 'coming-soon'

  // Get project slug — from project directly or via linked project reference
  const slug = isProject
    ? item.slug?.current
    : (item.project as any)?.slug?.current || null

  const location = isProject ? item.location : (item.project as any)?.location
  const bedrooms = isProject ? item.bedrooms : null
  const maxGuests = !isProject ? item.maxGuests : null
  const priceFrom = !isProject ? item.priceFrom : null
  const currency = !isProject ? item.currency : null
  const amenities = !isProject ? item.amenities : null
  const poolType = isProject ? item.poolType : null

  const remainingAmenities = amenities ? amenities.length - MAX_VISIBLE_AMENITIES : 0

  let imageSrc: string
  try {
    imageSrc = coverImage ? urlFor(coverImage).width(800).url() : FALLBACK_IMAGE
  } catch {
    imageSrc = FALLBACK_IMAGE
  }

  return (
    <div className="group bg-white overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative h-[260px] overflow-hidden shrink-0">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

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
        <h3 className="font-serif text-xl mb-2">{name}</h3>

        {location && (
          <div className="flex items-center gap-2 text-muted text-sm font-light mb-4">
            <MapPin size={14} className="text-taupe" />
            {location}
          </div>
        )}

        {/* Details row */}
        <div className="flex flex-wrap items-center gap-4 mb-5 pb-5 border-b border-black/10">
          {maxGuests && (
            <div className="flex items-center gap-2 text-sm text-muted font-light">
              <Users size={14} className="text-taupe" />
              Up to {maxGuests} guests
            </div>
          )}
          {bedrooms && (
            <div className="flex items-center gap-2 text-sm text-muted font-light">
              <Bed size={14} className="text-taupe" />
              {bedrooms} Bedroom{bedrooms > 1 ? 's' : ''}
            </div>
          )}
          {poolType && poolType !== 'none' && (
            <span className="bg-cream text-[11px] font-sans tracking-wider px-3 py-1 text-charcoal h-fit capitalize">
              {poolType} Pool
            </span>
          )}
          {priceFrom != null && currency && (
            <div className="text-sm font-light">
              From{' '}
              <span className="font-serif text-lg text-black">
                {currency === 'EUR' ? '€' : currency === 'USD' ? '$' : 'Rp'}
                {priceFrom.toLocaleString()}
              </span>
              <span className="text-muted"> /night</span>
            </div>
          )}
        </div>

        {/* Amenities */}
        {amenities && amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {amenities.slice(0, MAX_VISIBLE_AMENITIES).map((amenity) => (
              <span
                key={amenity}
                className="bg-cream text-[10px] font-sans tracking-wider px-2.5 py-1 text-charcoal"
              >
                {amenity}
              </span>
            ))}
            {remainingAmenities > 0 && (
              <span className="bg-cream text-[10px] font-sans tracking-wider px-2.5 py-1 text-muted">
                +{remainingAmenities} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto flex flex-col gap-2">
          {isComingSoon ? (
            <Button href="/contact" variant="outline" className="w-full opacity-60 cursor-not-allowed pointer-events-none">
              Coming Soon
            </Button>
          ) : (
            <>
              <button
                onClick={() => setBookingOpen(true)}
                aria-label={`Book ${name}`}
                className="w-full h-12 bg-black text-cream text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-charcoal transition-colors"
              >
                Book Now
              </button>
              {slug && (
                <Button href={`/projects/${slug}`} variant="outline" className="w-full">
                  View Details
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Booking Inquiry Modal */}
      <BookingInquiryModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        propertyName={name}
        propertySlug={slug || undefined}
        maxGuests={maxGuests || undefined}
        pricePerNight={priceFrom || undefined}
        currency={currency || undefined}
      />
    </div>
  )
}
