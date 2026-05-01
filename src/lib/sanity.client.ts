/**
 * Sanity client — partial server / client usage:
 *
 *  ✅ Client-safe exports : isSanityConfigured, urlFor
 *     (used in client components for image URL construction)
 *
 *  🔒 Server-only exports : client, sanityFetch, SANITY_CACHE_TAG
 *     These call SANITY_API_TOKEN which is undefined in the browser bundle.
 *     Only ever call sanityFetch() from Server Components or API routes.
 */
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId)

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true, // CDN cache; on-demand invalidation via /api/revalidate
      perspective: 'published',
      stega: false,
    })
  : null

/**
 * Fetch helper that participates in Next.js Data Cache for ISR.
 * Pages set their own `revalidate` interval; this fetch is tagged so the
 * cache can be invalidated on-demand via /api/revalidate (called by Sanity webhook).
 */
export const SANITY_CACHE_TAG = 'sanity'

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  if (!client) throw new Error('Sanity client not configured')
  return client.fetch<T>(query, params ?? {}, {
    next: { tags: [SANITY_CACHE_TAG], revalidate: 60 },
  } as any)
}

const builder = client ? createImageUrlBuilder(client) : null
export const urlFor = (source: any) => {
  if (!builder) throw new Error('Sanity not configured')
  return builder.image(source)
}
