'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'
import RevealWrapper from '@/components/ui/RevealWrapper'

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(5, 'Valid phone required'),
  country: z.string().min(1, 'Required'),
  budget: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const budgetOptions = [
  'Under €100k',
  '€100k–€250k',
  '€250k–€500k',
  '€500k+',
  'Undisclosed',
]

export default function LeadForm() {
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
      const res = await fetch('/api/invest-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
    }
  }

  const inputClass =
    'w-full h-12 px-4 bg-transparent border border-black/20 text-sm font-light focus:border-black focus:outline-none transition-colors placeholder:text-muted/50'

  if (submitted) {
    return (
      <section id="lead-form" className="bg-cream px-[5.5vw] py-[120px]">
        <RevealWrapper>
          <div className="max-w-xl mx-auto text-center">
            <CheckCircle2 size={48} className="text-taupe mx-auto mb-6" />
            <h2 className="font-serif text-3xl mb-4">Thank You</h2>
            <p className="text-muted text-lg font-light">
              We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        </RevealWrapper>
      </section>
    )
  }

  return (
    <section id="lead-form" className="bg-cream px-[5.5vw] py-[120px]">
      <div className="max-w-3xl mx-auto">
        <RevealWrapper>
          <div className="mb-12">
            <p className="text-muted text-[11px] font-sans font-medium tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-black/20" />
              Get Started
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.2] mb-4">
              Request Investment Info
            </h2>
            <p className="text-muted text-base font-light max-w-lg">
              Tell us about your investment goals and we&apos;ll match you with
              the right opportunity.
            </p>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={0.15}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input
                  {...register('firstName')}
                  placeholder="First Name"
                  className={inputClass}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register('lastName')}
                  placeholder="Last Name"
                  className={inputClass}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
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
                  placeholder="Phone *"
                  className={inputClass}
                />
                {errors.phone && (
                  <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input
                  {...register('country')}
                  placeholder="Country *"
                  className={inputClass}
                />
                {errors.country && (
                  <p className="text-red-600 text-xs mt-1">{errors.country.message}</p>
                )}
              </div>
              <div>
                <select
                  {...register('budget')}
                  className={`${inputClass} appearance-none`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Budget Range
                  </option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <textarea
                {...register('message')}
                placeholder="Message (optional)"
                rows={4}
                className={`${inputClass} h-auto py-3 resize-none`}
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-10 bg-black text-cream text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending…' : 'Submit Inquiry'}
            </button>
          </form>
        </RevealWrapper>
      </div>
    </section>
  )
}
