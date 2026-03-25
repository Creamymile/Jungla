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

export interface BookableProperty {
  _id: string
  name: string
  project: Project
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
