import { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Terms of Service — Jungla',
  description:
    'The terms and conditions governing your use of the Jungla website, booking services, and investment offerings.',
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'April 9, 2026'

export default function TermsPage() {
  return (
    <main className="bg-cream pt-[var(--nav-height)]">
      <div className="px-[5.5vw] py-20 lg:py-28 max-w-4xl mx-auto">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mt-6 mb-4">
          Terms of Service
        </h1>
        <p className="text-muted text-sm font-light mb-12">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="prose-jungla">
          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">1. Agreement to Terms</h2>
            <p className="text-black/80 font-light leading-relaxed">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Jungla website at
              jungla.com (the &ldquo;Site&rdquo;) and any related services provided by PT Jungla
              Lombok (&ldquo;Jungla,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;).
              By accessing or using the Site, you agree to be bound by these Terms. If you do not
              agree, please do not use the Site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">2. Eligibility</h2>
            <p className="text-black/80 font-light leading-relaxed">
              You must be at least 18 years old and legally capable of entering into binding
              contracts to use our services. By using the Site, you represent that you meet these
              requirements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">3. Our Services</h2>
            <p className="text-black/80 font-light leading-relaxed mb-4">
              Jungla provides:
            </p>
            <ul className="list-disc list-inside text-black/80 font-light leading-relaxed space-y-2">
              <li>Information about luxury villa construction and management</li>
              <li>Investment opportunities in Lombok real estate</li>
              <li>Holiday rental bookings via third-party booking platforms</li>
              <li>Contact and inquiry forms for prospective clients</li>
            </ul>
            <p className="text-black/80 font-light leading-relaxed mt-4">
              Information on the Site is provided for general informational purposes and does not
              constitute legal, financial, or investment advice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">4. Bookings and Reservations</h2>
            <p className="text-black/80 font-light leading-relaxed mb-4">
              Villa bookings are processed through third-party platforms (such as Smoobu, Airbnb,
              Booking.com) and are subject to the terms of those platforms in addition to any
              property-specific terms communicated at the time of booking.
            </p>
            <ul className="list-disc list-inside text-black/80 font-light leading-relaxed space-y-2">
              <li>All bookings are subject to availability and confirmation</li>
              <li>Prices are subject to change without notice</li>
              <li>Cancellation policies vary by property and are disclosed at booking</li>
              <li>Guests must comply with house rules and local laws</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">5. Investment Disclaimer</h2>
            <p className="text-black/80 font-light leading-relaxed mb-4">
              Information about investment opportunities is provided for informational purposes
              only and does not constitute an offer to sell or solicitation to buy any security or
              real estate interest. All investments carry risk, including the potential loss of
              principal.
            </p>
            <p className="text-black/80 font-light leading-relaxed">
              Past performance is not indicative of future results. Projected returns are estimates
              based on market conditions and assumptions that may not materialize. You should
              consult with independent legal, financial, and tax advisors before making any
              investment decision.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">6. Intellectual Property</h2>
            <p className="text-black/80 font-light leading-relaxed">
              All content on the Site — including text, graphics, logos, images, photographs,
              videos, and software — is the property of Jungla or its licensors and is protected by
              copyright, trademark, and other intellectual property laws. You may not reproduce,
              distribute, modify, or create derivative works without our prior written consent.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">7. User Conduct</h2>
            <p className="text-black/80 font-light leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-black/80 font-light leading-relaxed space-y-2">
              <li>Use the Site for any unlawful purpose</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Attempt to gain unauthorized access to the Site or its systems</li>
              <li>Interfere with or disrupt the Site&rsquo;s operation</li>
              <li>Use automated systems (bots, scrapers) without our consent</li>
              <li>Transmit viruses, malware, or harmful code</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">8. Third-Party Links and Services</h2>
            <p className="text-black/80 font-light leading-relaxed">
              The Site may contain links to third-party websites or services (e.g., Calendly,
              Smoobu, Instagram, WhatsApp). We are not responsible for the content, privacy
              policies, or practices of these third parties. Your use of third-party services is at
              your own risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">9. Disclaimer of Warranties</h2>
            <p className="text-black/80 font-light leading-relaxed">
              The Site and all content are provided &ldquo;as is&rdquo; without warranties of any
              kind, either express or implied, including but not limited to warranties of
              merchantability, fitness for a particular purpose, or non-infringement. We do not
              warrant that the Site will be uninterrupted, error-free, or secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">10. Limitation of Liability</h2>
            <p className="text-black/80 font-light leading-relaxed">
              To the fullest extent permitted by law, Jungla shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of the
              Site or services, even if we have been advised of the possibility of such damages.
              Our total liability shall not exceed the amount you have paid us in the twelve months
              preceding the claim.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">11. Indemnification</h2>
            <p className="text-black/80 font-light leading-relaxed">
              You agree to indemnify and hold harmless Jungla, its directors, employees, and
              affiliates from any claims, damages, losses, or expenses arising from your use of the
              Site or breach of these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">12. Privacy</h2>
            <p className="text-black/80 font-light leading-relaxed">
              Your use of the Site is also governed by our{' '}
              <Link href="/privacy" className="text-black underline">Privacy Policy</Link>, which
              explains how we collect and handle your personal information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">13. Governing Law</h2>
            <p className="text-black/80 font-light leading-relaxed">
              These Terms are governed by the laws of the Republic of Indonesia. Any disputes
              arising from these Terms or your use of the Site shall be resolved exclusively in the
              courts of Lombok, Indonesia.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">14. Changes to Terms</h2>
            <p className="text-black/80 font-light leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective
              when posted on this page with an updated &ldquo;Last updated&rdquo; date. Your
              continued use of the Site after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">15. Contact</h2>
            <p className="text-black/80 font-light leading-relaxed">
              For questions about these Terms, contact us at:
            </p>
            <ul className="text-black/80 font-light leading-relaxed mt-4 space-y-1">
              <li><strong>Email:</strong> <a href="mailto:hello@jungla.com" className="underline">hello@jungla.com</a></li>
              <li><strong>Company:</strong> PT Jungla Lombok</li>
              <li><strong>Address:</strong> Lombok, Indonesia</li>
            </ul>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-black/10">
          <Link
            href="/"
            className="text-[11px] font-sans font-medium tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
