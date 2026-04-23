export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
}

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: { current: string }
  status: 'delivered' | 'in-progress' | 'upcoming'
  category: 'villa' | 'entertainment' | 'horeca'
  location: string
  bedrooms?: number
  sizeSqm?: number
  poolType?: 'private' | 'shared' | 'none'
  description: any[]
  gallery: SanityImage[]
  coverImage: SanityImage
  amenities?: string[]
  isBookable: boolean
  bookingId?: string
  featured: boolean
  seo?: SEOMeta
}

export interface InvestmentOpportunity {
  _id: string
  _type: 'investmentOpportunity'
  title: string
  slug: { current: string }
  status: 'available' | 'in-progress' | 'completed'
  description: any[]
  investmentRange?: string
  expectedROI?: string
  timeline?: string
  gallery: SanityImage[]
  coverImage: SanityImage
  keyFacts?: { label: string; value: string }[]
  brochureUrl?: string
  seo?: SEOMeta
}

export interface Testimonial {
  _id: string
  authorName: string
  roleOrigin: string
  type: 'guest' | 'investor'
  quote: string
  stars: number
  photo?: SanityImage
  source?: 'airbnb' | 'booking' | 'direct' | 'other'
  featured: boolean
}

export interface TeamMember {
  _id: string
  fullName: string
  role: string
  department: 'leadership' | 'construction' | 'operations' | 'administration'
  bio?: any[]
  photo?: SanityImage
  order: number
}

/**
 * Partial project reference — only the fields projected by
 * BOOKABLE_PROPERTIES_QUERY via `project->{ _id, title, slug, location }`.
 * Use this instead of the full Project type to avoid accessing fields
 * that were never fetched from Sanity.
 */
export interface ProjectRef {
  _id: string
  title: string
  slug: { current: string }
  location?: string
}

export interface BookableProperty {
  _id: string
  name: string
  /** Partial project reference — only _id, title, slug, location are fetched */
  project: ProjectRef
  priceFrom: number
  currency: 'EUR' | 'USD' | 'IDR'
  maxGuests: number
  channelManagerId?: string
  status: 'active' | 'coming-soon'
  amenities?: string[]
  coverImage: SanityImage
}

export interface SiteSettings {
  whatsappNumber: string
  email: string
  instagramUrl?: string
  calendlyUrl?: string
  companyName: string
  address: string
  defaultSEO: SEOMeta
}

export interface SEOMeta {
  title?: string
  description?: string
  ogImage?: SanityImage
}
