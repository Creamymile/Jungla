'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Calendar, Users } from 'lucide-react'

const schema = z
  .object({
    checkIn: z.string().min(1, 'Required'),
    checkOut: z.string().min(1, 'Required'),
    guests: z
      .union([z.string(), z.number()])
      .transform((v) => (typeof v === 'string' ? parseInt(v, 10) : v))
      .pipe(z.number().int().min(1, 'Required').max(50)),
    name: z.string().min(1, 'Required'),
    email: z.string().email('Valid email required'),
    phone: z.string().optional(),
    message: z.string().optional(),
    // Honeypot
    website: z.string().max(0).optional(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: 'Check-out must be after check-in',
    path: ['checkOut'],
  })

type FormInput = z.input<typeof schema>
type FormOutput = z.output<typeof schema>

interface BookingInquiryModalProps {
  open: boolean
  onClose: () => void
  propertyName: string
  propertySlug?: string
  maxGuests?: number
  pricePerNight?: number
  currency?: string
}

export default function BookingInquiryModal({
  open,
  onClose,
  propertyName,
  propertySlug,
  maxGuests,
  pricePerNight,
  currency,
}: BookingInquiryModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  // Use en-CA locale to get YYYY-MM-DD in the *guest's local timezone*, not UTC.
  // toISOString() returns UTC midnight which can show the wrong date for guests
  // in UTC+7 or higher (e.g. Jakarta at 00:30 → still Dec 31 in UTC).
  const today = new Date().toLocaleDateString('en-CA')
  const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('en-CA')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      checkIn: today,
      checkOut: tomorrow,
      guests: 2,
    },
  })

  const checkIn = watch('checkIn')
  const checkOut = watch('checkOut')

  // Calculate nights and estimated total
  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
          )
        )
      : 0
  const estimatedTotal = pricePerNight && nights > 0 ? pricePerNight * nights : 0

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSubmitted(false)
        setServerError('')
        reset()
      }, 300)
    }
  }, [open, reset])

  const onSubmit = async (data: FormOutput) => {
    setServerError('')
    try {
      const res = await fetch('/api/booking-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          propertyName,
          propertySlug: propertySlug || '',
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setServerError(json.error || 'Failed to send inquiry')
        return
      }
      setSubmitted(true)
    } catch {
      setServerError('Network error. Please try again.')
    }
  }

  const formatPrice = (value: number) => {
    if (currency === 'EUR') return `€${value.toLocaleString()}`
    if (currency === 'USD') return `$${value.toLocaleString()}`
    return `Rp${value.toLocaleString()}`
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-black/60"
            onClick={onClose}
          />

          {/* Modal wrapper — bottom-sheet on mobile, centred on desktop */}
          <div role="dialog" aria-label={`Book ${propertyName}`} className="fixed inset-0 z-[9991] flex items-end lg:items-center justify-center lg:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full rounded-t-2xl lg:rounded-xl lg:max-w-xl max-h-[92dvh] lg:max-h-[90vh] bg-white overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 flex-shrink-0">
                <div>
                  <p className="text-[10px] font-sans font-medium tracking-widest uppercase text-muted">
                    Booking Inquiry
                  </p>
                  <h3 className="font-serif text-xl text-black mt-0.5">{propertyName}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Close booking inquiry"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1">
                {submitted ? (
                  <div className="px-6 py-16 text-center">
                    <CheckCircle2 size={48} className="text-taupe mx-auto mb-4" />
                    <h4 className="font-serif text-2xl text-black mb-3">Inquiry Received</h4>
                    <p className="text-muted text-sm font-light leading-relaxed max-w-sm mx-auto mb-6">
                      Thank you. Our reservations team will contact you within 24 hours to confirm
                      availability and provide booking details.
                    </p>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center justify-center h-11 px-6 bg-black text-cream text-[11px] font-sans font-medium tracking-widest uppercase hover:bg-charcoal transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
                    {/* Honeypot — hidden from humans, bots fill it */}
                    <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
                      <label htmlFor="booking-website">Website</label>
                      <input
                        {...register('website')}
                        id="booking-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="block text-[10px] font-sans font-medium tracking-widest uppercase text-muted mb-2">
                          Check-in
                        </label>
                        <div className="relative">
                          <Calendar
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe pointer-events-none"
                          />
                          <input
                            type="date"
                            min={today}
                            {...register('checkIn')}
                            className="w-full h-12 pl-10 pr-3 bg-cream/50 border border-black/10 text-black text-sm font-light focus:outline-none focus:border-black/40 transition-colors"
                          />
                        </div>
                        {errors.checkIn && (
                          <p className="text-red-600 text-xs mt-1">{errors.checkIn.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans font-medium tracking-widest uppercase text-muted mb-2">
                          Check-out
                        </label>
                        <div className="relative">
                          <Calendar
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe pointer-events-none"
                          />
                          <input
                            type="date"
                            min={checkIn || tomorrow}
                            {...register('checkOut')}
                            className="w-full h-12 pl-10 pr-3 bg-cream/50 border border-black/10 text-black text-sm font-light focus:outline-none focus:border-black/40 transition-colors"
                          />
                        </div>
                        {errors.checkOut && (
                          <p className="text-red-600 text-xs mt-1">{errors.checkOut.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="mb-4">
                      <label className="block text-[10px] font-sans font-medium tracking-widest uppercase text-muted mb-2">
                        Guests
                      </label>
                      <div className="relative">
                        <Users
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe pointer-events-none"
                        />
                        <input
                          type="number"
                          min={1}
                          max={maxGuests || 50}
                          {...register('guests')}
                          className="w-full h-12 pl-10 pr-3 bg-cream/50 border border-black/10 text-black text-sm font-light focus:outline-none focus:border-black/40 transition-colors"
                        />
                      </div>
                      {maxGuests && (
                        <p className="text-muted text-xs mt-1">Maximum {maxGuests} guests</p>
                      )}
                      {errors.guests && (
                        <p className="text-red-600 text-xs mt-1">{errors.guests.message}</p>
                      )}
                    </div>

                    {/* Estimated total */}
                    {pricePerNight && nights > 0 && (
                      <div className="mb-5 p-4 bg-cream/50 border border-black/10">
                        <div className="flex justify-between text-sm font-light text-muted mb-1">
                          <span>
                            {formatPrice(pricePerNight)} × {nights} night{nights > 1 ? 's' : ''}
                          </span>
                          <span>{formatPrice(estimatedTotal)}</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-2 border-t border-black/10">
                          <span className="font-serif text-sm text-black">Estimated total</span>
                          <span className="font-serif text-xl text-black">
                            {formatPrice(estimatedTotal)}
                          </span>
                        </div>
                        <p className="text-muted text-[10px] mt-2">
                          Final price confirmed on availability check
                        </p>
                      </div>
                    )}

                    {/* Contact info */}
                    <div className="space-y-3 mb-5">
                      <div>
                        <label htmlFor="booking-name" className="sr-only">
                          Full name
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          placeholder="Full name"
                          {...register('name')}
                          className="w-full h-12 px-4 bg-cream/50 border border-black/10 text-black text-sm font-light placeholder:text-muted/60 focus:outline-none focus:border-black/40 transition-colors"
                        />
                        {errors.name && (
                          <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="booking-email" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="booking-email"
                          type="email"
                          placeholder="Email"
                          {...register('email')}
                          className="w-full h-12 px-4 bg-cream/50 border border-black/10 text-black text-sm font-light placeholder:text-muted/60 focus:outline-none focus:border-black/40 transition-colors"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="booking-phone" className="sr-only">
                          Phone number
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          placeholder="Phone (optional)"
                          {...register('phone')}
                          className="w-full h-12 px-4 bg-cream/50 border border-black/10 text-black text-sm font-light placeholder:text-muted/60 focus:outline-none focus:border-black/40 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="booking-message" className="sr-only">
                          Special requests
                        </label>
                        <textarea
                          id="booking-message"
                          rows={3}
                          placeholder="Special requests (optional)"
                          {...register('message')}
                          className="w-full px-4 py-3 bg-cream/50 border border-black/10 text-black text-sm font-light placeholder:text-muted/60 focus:outline-none focus:border-black/40 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {serverError && (
                      <p className="text-red-600 text-sm font-light mb-4">{serverError}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-black text-cream text-[12px] font-sans font-medium tracking-widest uppercase hover:bg-charcoal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending…' : 'Send Inquiry'}
                    </button>
                    <p className="text-muted text-[11px] text-center mt-3 font-light">
                      No payment required. Our team will confirm availability first.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
