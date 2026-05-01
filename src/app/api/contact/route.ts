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

const contactSchema = z.object({
  name:    z.string().min(1).max(200).transform((s) => s.trim()),
  email:   safeEmail,
  phone:   z.string().max(30).optional().default(''),
  message: z.string().min(10).max(5000).transform((s) => s.trim()),
  // Honeypot — bots fill this; humans never see it
  website: honeypot,
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

    // Honeypot — silently accept to fool bots, but don't send email
    if (body?.website) {
      return NextResponse.json({ success: true })
    }

    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid form data' },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = result.data
    const safeName         = escapeHtml(name)
    const safeEmailDisplay = escapeHtml(email)
    const safePhone        = escapeHtml(phone || 'Not provided')
    const safeMessage      = escapeHtml(message)
    const siteUrl          = siteConfig.url

    // Notify team
    await resend.emails.send({
      from:    `${siteConfig.name} Website <${siteConfig.emailNoReply}>`,
      to:      process.env.CONTACT_EMAIL!,
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
      from:    `${siteConfig.name} <${siteConfig.email}>`,
      to:      email,
      subject: `We received your message — ${siteConfig.name} Lombok`,
      html: `
        <p>Dear ${safeName},</p>
        <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our <a href="${siteUrl}/projects">projects</a> or <a href="${siteUrl}/invest">investment opportunities</a>.</p>
        <p>Warm regards,<br/>The ${siteConfig.name} Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
