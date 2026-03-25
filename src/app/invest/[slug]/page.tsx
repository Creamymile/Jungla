import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { TrendingUp, Clock, DollarSign } from 'lucide-react'
import { client, isSanityConfigured } from '@/lib/sanity.client'
import { INVEST_BY_SLUG_QUERY } from '@/lib/sanity.queries'
import type { InvestmentOpportunity } from '@/types'
import RevealWrapper from '@/components/ui/RevealWrapper'
import Button from '@/components/ui/Button'
import ImageGallery from '@/components/projects/ImageGallery'
import LeadForm from '@/components/invest/LeadForm'

export const revalidate = 60

async function getOpportunity(slug: string): Promise<InvestmentOpportunity | null> {
  if (!isSanityConfigured || !client) return null
  try {
    return (await client.fetch(INVEST_BY_SLUG_QUERY, { slug })) || null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const opp = await getOpportunity(params.slug)
  if (!opp) return { title: 'Opportunity Not Found — Jungla' }

  return {
    title: `${opp.title} — Jungla Investment`,
    description: `Invest in ${opp.title}. ${opp.investmentRange || ''} investment range with ${opp.expectedROI || ''} expected ROI.`,
  }
}

const statusLabel: Record<string, string> = {
  available: 'Available',
  'in-progress': 'In Progress',
  completed: 'Completed',
}

export default async function InvestDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const opp = await getOpportunity(params.slug)
  if (!opp) notFound()

  const highlights = [
    opp.investmentRange && { icon: DollarSign, label: 'Investment', value: opp.investmentRange },
    opp.expectedROI && { icon: TrendingUp, label: 'Expected ROI', value: opp.expectedROI },
    opp.timeline && { icon: Clock, label: 'Timeline', value: opp.timeline },
  ].filter(Boolean) as { icon: any; label: string; value: string }[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'InvestmentOrDeposit',
    name: opp.title,
    description: `Invest in ${opp.title} — ${opp.investmentRange || ''} investment range with ${opp.expectedROI || ''} expected ROI in Lombok, Indonesia.`,
    provider: {
      '@type': 'Organization',
      name: 'PT Jungla Lombok',
      url: 'https://jungla.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <RevealWrapper>
        <section className="px-[5.5vw] pt-16 pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {opp.status && (
              <span className="bg-cream text-black text-[10px] font-sans font-medium tracking-widest uppercase px-3 py-1.5">
                {statusLabel[opp.status] || opp.status}
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            {opp.title}
          </h1>

          {/* Highlights row */}
          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-8 border-t border-b border-black/10 py-5">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-3">
                  <h.icon size={16} className="text-taupe" />
                  <div>
                    <span className="text-muted text-[10px] font-sans tracking-widest uppercase block">
                      {h.label}
                    </span>
                    <span className="text-sm font-serif">{h.value}</span>
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
          <ImageGallery images={opp.gallery} />
        </section>
      </RevealWrapper>

      {/* Description + key facts */}
      <RevealWrapper>
        <section className="px-[5.5vw] pb-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl mb-6">About This Opportunity</h2>
              {opp.description && opp.description.length > 0 ? (
                <div className="prose prose-lg max-w-none text-muted font-light leading-relaxed [&_strong]:text-black [&_strong]:font-medium">
                  <PortableText value={opp.description} />
                </div>
              ) : (
                <p className="text-muted font-light leading-relaxed">
                  A carefully structured investment opportunity in Lombok&apos;s
                  high-growth hospitality market. Backed by Jungla&apos;s track
                  record of quality construction and professional property
                  management, this offering delivers attractive risk-adjusted
                  returns with full operational support.
                </p>
              )}

              {opp.brochureUrl && (
                <div className="mt-8">
                  <Button href={opp.brochureUrl} variant="dark">
                    Download Brochure
                  </Button>
                </div>
              )}
            </div>

            {/* Key facts sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-cream p-8 md:p-10">
                <h3 className="font-serif text-xl mb-6">Key Facts</h3>
                {opp.keyFacts && opp.keyFacts.length > 0 ? (
                  <div className="space-y-4">
                    {opp.keyFacts.map((fact, i) => (
                      <div
                        key={i}
                        className="flex justify-between border-b border-black/10 pb-3 last:border-0"
                      >
                        <span className="text-muted text-sm font-light">{fact.label}</span>
                        <span className="text-sm font-medium">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-sm font-light">
                    Contact us for detailed specifications.
                  </p>
                )}

                <div className="mt-8 flex flex-col gap-3">
                  <Button href="#lead-form" variant="dark" className="w-full">
                    Request Info
                  </Button>
                  <Button href="/contact" variant="ghost" className="w-full">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealWrapper>

      <LeadForm />
    </>
  )
}
