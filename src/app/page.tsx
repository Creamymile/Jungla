import { isSanityConfigured, sanityFetch } from '@/lib/sanity.client'
import { FEATURED_PROJECTS_QUERY, TESTIMONIALS_QUERY } from '@/lib/sanity.queries'
import { siteConfig } from '@/lib/site.config'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/ui/Marquee'
import IntroSplit from '@/components/home/IntroSplit'
import ServicesGrid from '@/components/home/ServicesGrid'
import WhyJungla from '@/components/home/WhyJungla'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Testimonials from '@/components/home/Testimonials'
import LombokStrip from '@/components/home/LombokStrip'
import CtaBanner from '@/components/home/CtaBanner'

// ISR: regenerate at most every 60s; on-demand revalidation via /api/revalidate
export const revalidate = 60

async function getData() {
  if (!isSanityConfigured) {
    return { projects: [], testimonials: [] }
  }
  try {
    const [projects, testimonials] = await Promise.all([
      sanityFetch<any[]>(FEATURED_PROJECTS_QUERY),
      sanityFetch<any[]>(TESTIMONIALS_QUERY),
    ])
    return { projects, testimonials }
  } catch {
    return { projects: [], testimonials: [] }
  }
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.ogImage}`,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: siteConfig.email,
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
