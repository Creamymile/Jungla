'use client'

import { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import { MapPin, Bed, Maximize2, Waves, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealWrapper from '@/components/ui/RevealWrapper'
import Button from '@/components/ui/Button'
import ImageGallery from './ImageGallery'
import BookingInquiryModal from '@/components/bookings/BookingInquiryModal'
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

const AMENITY_PREVIEW_COUNT = 8

interface BookableInfo {
  priceFrom?: number
  currency?: 'EUR' | 'USD' | 'IDR'
  maxGuests?: number
  channelManagerId?: string
  status?: 'active' | 'coming-soon'
}

interface ProjectDetailProps {
  project: Project
  bookable?: BookableInfo | null
}

export default function ProjectDetail({ project, bookable }: ProjectDetailProps) {
  const [amenitiesOpen, setAmenitiesOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  const amenities = project.amenities || []

  // Lock body scroll when modal open
  useEffect(() => {
    if (amenitiesOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [amenitiesOpen])

  // Close on Escape
  useEffect(() => {
    if (!amenitiesOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAmenitiesOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [amenitiesOpen])

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

              {/* Amenities Section */}
              {amenities.length > 0 && (
                <div className="mt-12 pt-10 border-t border-black/10">
                  <h2 className="font-serif text-2xl mb-6">What this place offers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {amenities.slice(0, AMENITY_PREVIEW_COUNT).map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 py-2 border-b border-black/5">
                        <Check size={18} className="text-taupe flex-shrink-0" />
                        <span className="text-sm font-light text-charcoal">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setAmenitiesOpen(true)}
                    className="mt-6 h-12 px-8 border border-black text-black text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-black hover:text-cream transition-colors duration-300"
                  >
                    Show all {amenities.length} amenities
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-cream p-8 md:p-10 lg:sticky lg:top-[calc(var(--nav-height)+2rem)]">
                {/* Price (if bookable with price) */}
                {project.isBookable && bookable?.priceFrom && bookable?.currency && (
                  <div className="mb-6 pb-6 border-b border-black/10">
                    <p className="text-muted text-[10px] font-sans tracking-widest uppercase mb-1">
                      Starting From
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl text-black">
                        {bookable.currency === 'EUR' ? '€' : bookable.currency === 'USD' ? '$' : 'Rp'}
                        {bookable.priceFrom.toLocaleString()}
                      </span>
                      <span className="text-muted text-sm font-light">/ night</span>
                    </div>
                    {bookable.maxGuests && (
                      <p className="text-muted text-xs mt-2 font-light">
                        Up to {bookable.maxGuests} guests
                      </p>
                    )}
                  </div>
                )}

                <h3 className="font-serif text-xl mb-4">Interested?</h3>
                <p className="text-muted text-sm font-light leading-relaxed mb-8">
                  {project.isBookable
                    ? 'This property is available for booking. Send an inquiry and our team will confirm availability within 24 hours.'
                    : 'Get in touch to learn more about this project or explore investment opportunities.'}
                </p>
                <div className="flex flex-col gap-3">
                  {project.isBookable && bookable?.status !== 'coming-soon' && (
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="w-full h-12 bg-black text-cream text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-charcoal transition-colors"
                    >
                      Book a Stay
                    </button>
                  )}
                  <Button href="/contact" variant={project.isBookable ? 'outline' : 'dark'} className="w-full">
                    Contact Us
                  </Button>
                  <Button href="/invest" variant="outline" className="w-full">
                    Invest With Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealWrapper>

      {/* ─── Amenities Modal (Airbnb-style) ─── */}
      <AnimatePresence>
        {amenitiesOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9990] bg-black/50"
              onClick={() => setAmenitiesOpen(false)}
            />

            {/* Modal wrapper — flex centering avoids transform conflicts with Framer Motion */}
            <div className="fixed inset-0 z-[9991] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="pointer-events-auto w-full h-full lg:h-auto lg:max-w-lg lg:max-h-[85vh] bg-white rounded-xl overflow-hidden flex flex-col shadow-2xl"
              >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 flex-shrink-0">
                <h3 className="font-serif text-xl">What this place offers</h3>
                <button
                  onClick={() => setAmenitiesOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Close amenities"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 px-6 py-4">
                <div className="divide-y divide-black/5">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-4 py-4">
                      <Check size={20} className="text-taupe flex-shrink-0" />
                      <span className="text-base font-light">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-black/10 flex-shrink-0">
                <button
                  onClick={() => setAmenitiesOpen(false)}
                  className="w-full h-12 bg-black text-cream text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-charcoal transition-colors"
                >
                  Close
                </button>
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Booking Inquiry Modal ─── */}
      <BookingInquiryModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        propertyName={project.title}
        propertySlug={project.slug?.current}
        maxGuests={bookable?.maxGuests}
        pricePerNight={bookable?.priceFrom}
        currency={bookable?.currency}
      />
    </div>
  )
}
