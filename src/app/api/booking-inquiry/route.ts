import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { siteConfig } from '@/lib/site.config'
import {
  escapeHtml,
  safeEmail,
  honeypot,
  checkOrigin,
  isRateLimited,
  getClientIp,
} from '@/lib/security'

const resend = new Resend(process.env.RESEND_API_KEY)

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')

const bookingSchema = z
  .object({
    propertyName: z.string().min(1).max(200).transform((s) => s.trim()),
    propertySlug: z.string().max(200).optional().default(''),
    checkIn:      isoDate,
    checkOut:     isoDate,
    guests:       z.coerce.number().int().min(1).max(50),
    name:         z.string().min(1).max(200).transform((s) => s.trim()),
    email:        safeEmail,
    phone:        z.string().max(30).optional().default(''),
    message:      z.string().max(2000).optional().default(''),
    // Honeypot
    website: honeypot,
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: 'Check-out must be after check-in',
    path: ['checkOut'],
  })

export async function POST(req: NextRequest) {
  try {
    // CSRF: reject cross-origin requests
    if (!checkOrigin(req)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Rate limiting (best-effort — see security.ts for serverless caveat)
    const ip = getClientIp(req)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()

    // Honeypot — silently accept to fool bots
    if (body?.website) {
      return NextResponse.json({ success: true, nights: 0 })
    }

    const result = bookingSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid form data' },
        { status: 400 }
      )
    }

    const {
      propertyName, propertySlug,
      checkIn, checkOut, guests,
      name, email, phone, message,
    } = result.data

    const safeProperty     = escapeHtml(propertyName)
    const safeName         = escapeHtml(name)
    const safeEmailDisplay = escapeHtml(email)
    const safePhone        = escapeHtml(phone || 'Not provided')
    const safeMessage      = escapeHtml(message || 'No additional message')
    const safeCheckIn      = escapeHtml(checkIn)
    const safeCheckOut     = escapeHtml(checkOut)

    const siteUrl     = siteConfig.url
    const propertyUrl = propertySlug ? `${siteUrl}/projects/${propertySlug}` : siteUrl

    // Calculate nights
    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    )

    // Notify team
    await resend.emails.send({
      from:    `${siteConfig.name} Bookings <${siteConfig.emailNoReply}>`,
      to:      process.env.CONTACT_EMAIL!,
      subject: `New Booking Inquiry: ${safeProperty} (${nights} nights)`,
      html: `
        <h2>New Booking Inquiry</h2>
        <p><b>Property:</b> <a href="${propertyUrl}">${safeProperty}</a></p>
        <hr/>
        <h3>Stay Details</h3>
        <p><b>Check-in:</b> ${safeCheckIn}</p>
        <p><b>Check-out:</b> ${safeCheckOut}</p>
        <p><b>Nights:</b> ${nights}</p>
        <p><b>Guests:</b> ${guests}</p>
        <hr/>
        <h3>Guest Information</h3>
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmailDisplay}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <h3>Message</h3>
        <p>${safeMessage}</p>
      `,
    })

    // Auto-reply to guest
    await resend.emails.send({
      from:    `${siteConfig.name} <${siteConfig.email}>`,
      to:      email,
      subject: `Booking Inquiry Received — ${propertyName}`,
      html: `
        <p>Dear ${safeName},</p>
        <p>Thank you for your interest in <strong>${safeProperty}</strong>. We have received your booking inquiry and will check availability for your dates.</p>
        <h3>Your Inquiry</h3>
        <ul>
          <li><b>Check-in:</b> ${safeCheckIn}</li>
          <li><b>Check-out:</b> ${safeCheckOut}</li>
          <li><b>Nights:</b> ${nights}</li>
          <li><b>Guests:</b> ${guests}</li>
        </ul>
        <p>Our reservations team will contact you within 24 hours to confirm availability and provide booking details, including pricing and payment instructions.</p>
        <p>If your stay is urgent, you can also reach us directly via WhatsApp.</p>
        <p>Warm regards,<br/>The ${siteConfig.name} Reservations Team</p>
      `,
    })

    return NextResponse.json({ success: true, nights })
  } catch {
    return NextResponse.json({ error: 'Failed to send inquiry' }, { status: 500 })
  }
}
