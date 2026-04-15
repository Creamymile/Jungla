import { Metadata } from 'next'
import { isSanityConfigured, sanityFetch } from '@/lib/sanity.client'
import { BOOKABLE_PROPERTIES_QUERY, BOOKABLE_PROJECTS_QUERY } from '@/lib/sanity.queries'
import type { BookableProperty, Project } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealWrapper from '@/components/ui/RevealWrapper'
import BookingCard from '@/components/bookings/BookingCard'
import AdvantagesStrip from '@/components/bookings/AdvantagesStrip'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Bookings — Jungla',
  description:
    'Book your luxury villa stay in Lombok, Indonesia. Verified properties, 24/7 guest support, premium experience.',
}

export const revalidate = 60

export type BookingItem =
  | (BookableProperty & { source: 'property' })
  | (Project & { source: 'project' })

async function getBookingItems(): Promise<BookingItem[]> {
  if (!isSanityConfigured) return []
  try {
    const [properties, projects] = await Promise.all([
      sanityFetch<BookableProperty[]>(BOOKABLE_PROPERTIES_QUERY),
      sanityFetch<Project[]>(BOOKABLE_PROJECTS_QUERY),
    ])

    const items: BookingItem[] = []

    // Add standalone bookable properties
    for (const p of properties || []) {
      items.push({ ...p, source: 'property' })
    }

    // Add bookable projects (skip if already linked via a bookableProperty)
    const linkedProjectIds = new Set(
      (properties || [])
        .map((p) => (p.project as any)?._id)
        .filter(Boolean)
    )
    for (const proj of projects || []) {
      if (!linkedProjectIds.has(proj._id)) {
        items.push({ ...proj, source: 'project' })
      }
    }

    return items
  } catch {
    return []
  }
}

export default async function BookingsPage() {
  const items = await getBookingItems()

  return (
    <>
      {/* Hero header */}
      <section className="px-[5.5vw] pt-16 pb-[80px]">
        <RevealWrapper>
          <SectionLabel className="mb-6">Stay With Us</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              Book Your
              <br />
              <em>Island Escape</em>
            </h1>
            <p className="text-muted text-lg font-light max-w-md">
              Handpicked luxury properties, each owned and managed by Jungla.
              Hotel-grade amenities with the privacy and soul of a villa.
            </p>
          </div>
        </RevealWrapper>
      </section>

      {/* Properties grid */}
      <section className="px-[5.5vw] pb-[120px]">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {items.map((item, i) => (
              <RevealWrapper key={item._id} delay={i * 0.1} className="h-full">
                <BookingCard item={item} />
              </RevealWrapper>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted text-lg font-light">Properties coming soon. Contact us for availability.</p>
          </div>
        )}
      </section>

      <AdvantagesStrip />

      {/* CTA */}
      <section className="bg-cream px-[5.5vw] py-[100px]">
        <RevealWrapper>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.2] mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-muted text-base font-light mb-8">
              We have more properties in the pipeline. Get in touch and
              we&apos;ll help you find the perfect stay.
            </p>
            <Button href="/contact" variant="dark">
              Contact Us
            </Button>
          </div>
        </RevealWrapper>
      </section>
    </>
  )
}
