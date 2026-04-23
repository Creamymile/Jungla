import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { SANITY_CACHE_TAG } from '@/lib/sanity.client'

/**
 * Webhook endpoint for Sanity to flush the Next.js cache when content changes.
 * Configure in Sanity Manage → API → Webhooks:
 *   URL: https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *   Method: POST
 *   Trigger: Create/Update/Delete on any document
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  // Refuse entirely if the secret env var is not configured — prevents
  // accidental cache-flush when deployed without the variable set.
  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Revalidate secret not configured' }, { status: 500 })
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    // Flush all Sanity-fetched data + re-render any dependent layouts
    revalidateTag(SANITY_CACHE_TAG)
    revalidatePath('/', 'layout')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
