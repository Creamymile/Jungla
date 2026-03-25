import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || ''

export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId)

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token: token || undefined,
    })
  : null

const builder = client ? imageUrlBuilder(client) : null
export const urlFor = (source: any) => {
  if (!builder) throw new Error('Sanity not configured')
  return builder.image(source)
}
