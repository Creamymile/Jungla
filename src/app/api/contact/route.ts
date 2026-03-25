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

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(30).optional().default(''),
  message: z.string().min(10).max(5000),
})

export async function POST(req: NextRequest) {
  try {
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
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone || 'Not provided')
    const safeMessage = escapeHtml(message)

    // Notify team
    await resend.emails.send({
      from: 'Jungla Website <noreply@jungla.com>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New Contact: ${safeName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
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
        <p>In the meantime, feel free to explore our <a href="https://jungla.com/projects">projects</a> or <a href="https://jungla.com/invest">investment opportunities</a>.</p>
        <p>Warm regards,<br/>The Jungla Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
