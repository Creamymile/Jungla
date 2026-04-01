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

const investLeadSchema = z.object({
  firstName: z.string().max(100).optional().default('').transform(s => s.trim()),
  lastName: z.string().max(100).optional().default('').transform(s => s.trim()),
  email: safeEmail,
  phone: z.string().min(5).max(30),
  country: z.string().min(1).max(100).transform(s => s.trim()),
  budget: z.string().max(100).optional().default(''),
  message: z.string().max(5000).optional().default(''),
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
    const result = investLeadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      )
    }

    const { firstName, lastName, email, phone, country, budget, message } = result.data
    const fullName = `${firstName} ${lastName}`.trim()
    const safeName = escapeHtml(fullName)
    const safeEmailDisplay = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeCountry = escapeHtml(country)
    const safeBudget = escapeHtml(budget || 'Not specified')
    const safeMessage = escapeHtml(message || 'No message provided')
    const safeFirstName = escapeHtml(firstName || 'Investor')

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jungla.com'

    // Notify team
    await resend.emails.send({
      from: 'Jungla Website <noreply@jungla.com>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New Investment Lead: ${safeName}`,
      html: `
        <h2>New Investment Lead</h2>
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmailDisplay}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <p><b>Country:</b> ${safeCountry}</p>
        <p><b>Budget Range:</b> ${safeBudget}</p>
        <p><b>Message:</b></p>
        <p>${safeMessage}</p>
      `,
    })

    // Auto-reply to investor
    await resend.emails.send({
      from: 'Jungla <hello@jungla.com>',
      to: email,
      subject: 'Your investment inquiry — Jungla Lombok',
      html: `
        <p>Dear ${safeFirstName},</p>
        <p>Thank you for your interest in investing with Jungla. We have received your inquiry and our investment team will be in touch within 24 hours.</p>
        <p>In the meantime, you can explore our current <a href="${siteUrl}/invest">investment opportunities</a> or <a href="${siteUrl}/projects">completed projects</a>.</p>
        <p>Warm regards,<br/>The Jungla Investment Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
