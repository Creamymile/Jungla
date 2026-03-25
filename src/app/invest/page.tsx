import { Metadata } from 'next'
import { client, isSanityConfigured } from '@/lib/sanity.client'
import { INVEST_OPPORTUNITIES_QUERY } from '@/lib/sanity.queries'
import type { InvestmentOpportunity } from '@/types'
import InvestHero from '@/components/invest/InvestHero'
import InvestmentModel from '@/components/invest/InvestmentModel'
import OpportunityCard from '@/components/invest/OpportunityCard'
import LeadForm from '@/components/invest/LeadForm'
import RevealWrapper from '@/components/ui/RevealWrapper'

export const metadata: Metadata = {
  title: 'Invest With Us — Jungla',
  description:
    'Invest in luxury villas in Lombok, Indonesia. Curated opportunities, transparent models, proven returns with full management.',
}

export const revalidate = 60

async function getOpportunities(): Promise<InvestmentOpportunity[]> {
  if (!isSanityConfigured || !client) return []
  try {
    return (await client.fetch(INVEST_OPPORTUNITIES_QUERY)) || []
  } catch {
    return []
  }
}

export default async function InvestPage() {
  const opportunities = await getOpportunities()

  return (
    <>
      <InvestHero />
      <InvestmentModel />

      {/* Opportunities grid */}
      <section id="opportunities" className="bg-cream px-[5.5vw] py-[120px]">
        <RevealWrapper>
          <div className="mb-14">
            <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-black/20" />
              Opportunities
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2]">
              Current Offerings
            </h2>
          </div>
        </RevealWrapper>

        {opportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, i) => (
              <RevealWrapper key={opp._id} delay={i * 0.1}>
                <OpportunityCard opportunity={opp} />
              </RevealWrapper>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted text-lg font-light">New investment opportunities coming soon. Contact us to learn more.</p>
          </div>
        )}
      </section>

      <LeadForm />
    </>
  )
}
