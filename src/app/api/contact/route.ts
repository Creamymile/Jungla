import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Simple in-memory rate limiter (per IP, 5 requests per hour)
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Email injection prevention
const safeEmail = z.string().email().max(320)
  .refine(e => !/[\r\n%0A%0D]/.test(e), 'Invalid email address')

const contactSchema = z.object({
  name: z.string().min(1).max(200).transform(s => s.trim()),
  email: safeEmail,
  phone: z.string().max(30).optional().default(''),
  message: z.string().min(10).max(5000).transform(s => s.trim()),
})

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = result.data
    const safeName = escapeHtml(name)
    const safeEmailDisplay = escapeHtml(email)
    const safePhone = escapeHtml(phone || 'Not provided')
    const safeMessage = escapeHtml(message)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jungla.com'

    // Notify team
    await resend.emails.send({
      from: 'Jungla Website <noreply@jungla.com>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New Contact: ${safeName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmailDisplay}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <p><b>Message:</b></p>
        <p>${safeMessage}</p>
      `,
    })

    // Auto-reply to user
    await resend.emails.send({
      from: 'Jungla <hello@jungla.com>',
      to: email,
      subject: 'We received your message — Jungla Lombok',
      html: `
        <p>Dear ${safeName},</p>
        <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our <a href="${siteUrl}/projects">projects</a> or <a href="${siteUrl}/invest">investment opportunities</a>.</p>
        <p>Warm regards,<br/>The Jungla Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
