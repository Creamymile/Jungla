import { client, isSanityConfigured } from '@/lib/sanity.client'
import { FEATURED_PROJECTS_QUERY, TESTIMONIALS_QUERY } from '@/lib/sanity.queries'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/ui/Marquee'
import IntroSplit from '@/components/home/IntroSplit'
import ServicesGrid from '@/components/home/ServicesGrid'
import WhyJungla from '@/components/home/WhyJungla'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Testimonials from '@/components/home/Testimonials'
import LombokStrip from '@/components/home/LombokStrip'
import CtaBanner from '@/components/home/CtaBanner'

export const dynamic = 'force-dynamic'

async function getData() {
  if (!isSanityConfigured || !client) {
    return { projects: [], testimonials: [] }
  }
  try {
    const [projects, testimonials] = await Promise.all([
      client.fetch(FEATURED_PROJECTS_QUERY),
      client.fetch(TESTIMONIALS_QUERY),
    ])
    return { projects, testimonials }
  } catch {
    return { projects: [], testimonials: [] }
  }
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Jungla',
  legalName: 'PT Jungla Lombok',
  url: 'https://jungla.com',
  logo: 'https://jungla.com/og-image.jpg',
  description:
    'Luxury villa construction & management in Lombok, Indonesia. European standards, island soul.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kuta',
    addressRegion: 'Lombok Tengah',
    addressCountry: 'ID',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@jungla.com',
    contactType: 'customer service',
  },
}

export default async function Home() {
  const { projects, testimonials } = await getData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <Marquee
        items={[
          'Villa Construction',
          'Property Management',
          'Investment',
          'Lombok',
          'Luxury Living',
          'European Standards',
        ]}
      />
      <IntroSplit />
      <ServicesGrid />
      <WhyJungla />
      <FeaturedProjects projects={projects} />
      <Testimonials testimonials={testimonials} />
      <LombokStrip />
      <CtaBanner />
    </>
  )
}
