import { Metadata } from 'next'
import { client, isSanityConfigured } from '@/lib/sanity.client'
import { BOOKABLE_PROPERTIES_QUERY } from '@/lib/sanity.queries'
import type { BookableProperty } from '@/types'
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

export const dynamic = 'force-dynamic'

async function getProperties(): Promise<BookableProperty[]> {
  if (!isSanityConfigured || !client) return []
  try {
    return (await client.fetch(BOOKABLE_PROPERTIES_QUERY)) || []
  } catch {
    return []
  }
}

export default async function BookingsPage() {
  const properties = await getProperties()

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
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {properties.map((property, i) => (
              <RevealWrapper key={property._id} delay={i * 0.1} className="h-full">
                <BookingCard property={property} />
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
