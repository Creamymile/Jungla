import { Metadata } from 'next'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealWrapper from '@/components/ui/RevealWrapper'
import ContactForm from '@/components/contact/ContactForm'
import CalendlyEmbed from '@/components/contact/CalendlyEmbed'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name}. We respond within 24 hours. Book a call, send a message, or visit us in Lombok.`,
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: siteConfig.phone,
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: siteConfig.social.instagramHandle,
    href: siteConfig.social.instagram,
  },
  {
    icon: MapPin,
    label: 'Office',
    value: `${siteConfig.address.locality}, ${siteConfig.address.region}, ${siteConfig.address.countryName}`,
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero header */}
      <section className="px-[5.5vw] pt-16 pb-[80px]">
        <RevealWrapper>
          <SectionLabel className="mb-6">Contact</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              Let&apos;s Talk
            </h1>
            <p className="text-muted text-lg font-light max-w-md">
              Have a project in mind, an investment question, or want to book a
              stay? We respond within 24 hours.
            </p>
          </div>
        </RevealWrapper>
      </section>

      {/* Form + Info */}
      <section className="px-[5.5vw] pb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-5">
            <RevealWrapper delay={0.15}>
              <div className="bg-cream p-8 md:p-10 mb-8">
                <h3 className="font-serif text-xl mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-black/10 flex items-center justify-center flex-shrink-0">
                        <item.icon size={16} className="text-taupe" />
                      </div>
                      <div>
                        <span className="text-muted text-[10px] font-sans tracking-widest uppercase block mb-0.5">
                          {item.label}
                        </span>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-sm font-light hover:text-black transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm font-light">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealWrapper>

            <CalendlyEmbed />
          </div>
        </div>
      </section>
    </>
  )
}
