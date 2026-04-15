import { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Privacy Policy — Jungla',
  description:
    'How Jungla collects, uses, and protects your personal information when you visit our website or use our services.',
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'April 9, 2026'

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-cream pt-[var(--nav-height)]">
      <div className="px-[5.5vw] py-20 lg:py-28 max-w-4xl mx-auto">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mt-6 mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted text-sm font-light mb-12">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="prose-jungla">
          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">1. Who We Are</h2>
            <p className="text-black/80 font-light leading-relaxed mb-4">
              PT Jungla Lombok (&ldquo;Jungla,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a luxury villa
              construction and management company based in Lombok, Indonesia. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit
              our website at jungla.com or interact with our services.
            </p>
            <p className="text-black/80 font-light leading-relaxed">
              By using our website or services, you agree to the collection and use of information
              in accordance with this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">2. Information We Collect</h2>
            <h3 className="font-serif text-lg text-black mb-3 mt-6">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-black/80 font-light leading-relaxed space-y-2 mb-4">
              <li><strong>Contact details:</strong> name, email address, phone number, country</li>
              <li><strong>Inquiry information:</strong> messages, investment budget, project preferences</li>
              <li><strong>Booking details:</strong> dates, guest counts, special requests</li>
              <li><strong>Communication records:</strong> emails, WhatsApp messages, call notes</li>
            </ul>
            <h3 className="font-serif text-lg text-black mb-3 mt-6">2.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside text-black/80 font-light leading-relaxed space-y-2">
              <li>IP address and approximate location</li>
              <li>Browser type, device, and operating system</li>
              <li>Pages visited and time spent on the site</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">3. How We Use Your Information</h2>
            <p className="text-black/80 font-light leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-black/80 font-light leading-relaxed space-y-2">
              <li>Respond to your inquiries and provide requested information</li>
              <li>Process villa bookings and investment opportunities</li>
              <li>Send service-related communications (booking confirmations, updates)</li>
              <li>Improve our website, services, and user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
              <li>Send marketing communications (only with your consent)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">4. Legal Basis for Processing</h2>
            <p className="text-black/80 font-light leading-relaxed">
              We process your personal data under the following legal bases: (a) your consent, (b)
              performance of a contract, (c) compliance with legal obligations, and (d) legitimate
              business interests. You may withdraw consent at any time by contacting us.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">5. How We Share Your Information</h2>
            <p className="text-black/80 font-light leading-relaxed mb-4">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc list-inside text-black/80 font-light leading-relaxed space-y-2">
              <li><strong>Service providers:</strong> Resend (email delivery), Sanity (content management), Vercel (hosting), Smoobu (booking management), Calendly (scheduling)</li>
              <li><strong>Professional advisors:</strong> lawyers, accountants, auditors when required</li>
              <li><strong>Legal authorities:</strong> when required by law or to protect our rights</li>
              <li><strong>Business partners:</strong> only with your explicit consent</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">6. Cookies and Tracking</h2>
            <p className="text-black/80 font-light leading-relaxed mb-4">
              We use essential cookies to operate the website and may use analytics cookies to
              understand how visitors use the site. You can control cookies through your browser
              settings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">7. Data Retention</h2>
            <p className="text-black/80 font-light leading-relaxed">
              We retain personal information only as long as necessary to fulfill the purposes
              described in this policy, comply with legal obligations, resolve disputes, and enforce
              agreements. Inquiry data is typically kept for 24 months unless an active business
              relationship exists.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">8. Your Rights</h2>
            <p className="text-black/80 font-light leading-relaxed mb-4">
              Depending on your jurisdiction (including under the GDPR for EU residents), you may
              have the right to:
            </p>
            <ul className="list-disc list-inside text-black/80 font-light leading-relaxed space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
              <li>Object to or restrict processing</li>
              <li>Request data portability</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="text-black/80 font-light leading-relaxed mt-4">
              To exercise these rights, contact us at <a href="mailto:hello@jungla.com" className="text-black underline">hello@jungla.com</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">9. Data Security</h2>
            <p className="text-black/80 font-light leading-relaxed">
              We implement industry-standard technical and organizational measures to protect your
              data, including HTTPS encryption, secure hosting, and access controls. However, no
              method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">10. International Data Transfers</h2>
            <p className="text-black/80 font-light leading-relaxed">
              Your data may be transferred to and processed in countries outside Indonesia. We
              ensure appropriate safeguards are in place for such transfers, including standard
              contractual clauses where applicable.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">11. Children&rsquo;s Privacy</h2>
            <p className="text-black/80 font-light leading-relaxed">
              Our services are not directed to individuals under 18. We do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">12. Changes to This Policy</h2>
            <p className="text-black/80 font-light leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page with an updated &ldquo;Last
              updated&rdquo; date.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-black mb-4">13. Contact Us</h2>
            <p className="text-black/80 font-light leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, contact us at:
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
