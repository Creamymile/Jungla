import { Metadata } from 'next'
import { client, isSanityConfigured } from '@/lib/sanity.client'
import { TEAM_QUERY } from '@/lib/sanity.queries'
import type { TeamMember } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealWrapper from '@/components/ui/RevealWrapper'
import FounderStory from '@/components/about/FounderStory'
import TeamGrid from '@/components/about/TeamGrid'
import ApproachSteps from '@/components/about/ApproachSteps'
import ValuesSection from '@/components/about/ValuesSection'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About Us — Jungla',
  description:
    'Meet the Jungla team. European standards, island soul — luxury villa construction and management in Lombok, Indonesia.',
}

export const dynamic = 'force-dynamic'

async function getTeam(): Promise<TeamMember[]> {
  if (!isSanityConfigured || !client) return []
  try {
    return await client.fetch(TEAM_QUERY)
  } catch {
    return []
  }
}

export default async function AboutPage() {
  const team = await getTeam()

  return (
    <>
      {/* Hero header */}
      <section className="px-[5.5vw] pt-16 pb-[80px]">
        <RevealWrapper>
          <SectionLabel className="mb-6">About Jungla</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              European Standards,
              <br />
              <em>Island Soul</em>
            </h1>
            <p className="text-muted text-lg font-light max-w-md">
              We are a team of builders, designers, and operators united by a
              love for Lombok and a commitment to excellence.
            </p>
          </div>
        </RevealWrapper>
      </section>

      <FounderStory />
      <TeamGrid team={team} />
      <ApproachSteps />
      <ValuesSection />

      {/* CTA */}
      <section className="bg-cream px-[5.5vw] py-[100px]">
        <RevealWrapper>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.2] mb-4">
              Let&apos;s Build Together
            </h2>
            <p className="text-muted text-base font-light mb-8">
              Whether you want to invest, build, or simply explore — we&apos;d
              love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="dark">
                Get in Touch
              </Button>
              <Button href="/projects">
                View Projects
              </Button>
            </div>
          </div>
        </RevealWrapper>
      </section>
    </>
  )
}
