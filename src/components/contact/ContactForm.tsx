'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'
import RevealWrapper from '@/components/ui/RevealWrapper'

const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please write at least a few words'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or reach us via WhatsApp.')
    }
  }

  const inputClass =
    'w-full h-12 px-4 bg-transparent border border-black/20 text-sm font-light focus:border-black focus:outline-none transition-colors placeholder:text-muted/50'

  if (submitted) {
    return (
      <RevealWrapper>
        <div className="text-center py-16">
          <CheckCircle2 size={48} className="text-taupe mx-auto mb-6" />
          <h3 className="font-serif text-2xl mb-3">Message Sent</h3>
          <p className="text-muted text-base font-light">
            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </RevealWrapper>
    )
  }

  return (
    <RevealWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            {...register('name')}
            placeholder="Full Name *"
            className={inputClass}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email *"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('phone')}
              type="tel"
              placeholder="Phone (optional)"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <textarea
            {...register('message')}
            placeholder="Your Message *"
            rows={6}
            className={`${inputClass} h-auto py-3 resize-none`}
          />
          {errors.message && (
            <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-10 bg-black text-cream text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </RevealWrapper>
  )
}
