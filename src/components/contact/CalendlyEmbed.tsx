'use client'

import RevealWrapper from '@/components/ui/RevealWrapper'

interface CalendlyEmbedProps {
  url?: string
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const calendlyUrl = url || 'https://calendly.com/jungla-lombok/discovery-call'

  return (
    <RevealWrapper>
      <div className="bg-cream p-8 md:p-10">
        <h3 className="font-serif text-xl mb-2">Schedule a Call</h3>
        <p className="text-muted text-sm font-light mb-6">
          Pick a time that works for you and we&apos;ll connect to discuss your
          project or investment goals.
        </p>
        <div className="border border-black/10 bg-white min-h-[500px]">
          <iframe
            src={`${calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1`}
            title="Schedule a call with Jungla"
            className="w-full min-h-[500px] border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </div>
    </RevealWrapper>
  )
}
