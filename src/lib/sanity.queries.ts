// Featured projects for homepage (max 5)
// !(_id in path("drafts.**")) ensures unpublished/draft documents are excluded
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true && !(_id in path("drafts.**"))] | order(_createdAt desc) [0...5] {
    _id, title, slug, status, category, location,
    bedrooms, poolType, isBookable, coverImage
  }
`

// All projects with filters
export const ALL_PROJECTS_QUERY = `
  *[_type == "project" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    _id, title, slug, status, category, location,
    bedrooms, sizeSqm, poolType, isBookable, coverImage
  }
`

// Single project by slug
export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id, title, slug, status, category, location,
    bedrooms, sizeSqm, poolType, description,
    gallery, coverImage, isBookable, bookingId, seo
  }
`

// All investment opportunities
export const INVEST_OPPORTUNITIES_QUERY = `
  *[_type == "investmentOpportunity" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    _id, title, slug, status, investmentRange,
    expectedROI, timeline, coverImage, keyFacts
  }
`

// Single investment opportunity by slug
export const INVEST_BY_SLUG_QUERY = `
  *[_type == "investmentOpportunity" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id, title, slug, status, description,
    investmentRange, expectedROI, timeline,
    gallery, coverImage, keyFacts, brochureUrl, seo
  }
`

// Featured testimonials for homepage (max 3)
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && featured == true && !(_id in path("drafts.**"))] | order(_createdAt asc) [0...3] {
    _id, authorName, roleOrigin, type, quote, stars, photo
  }
`

// All team members ordered by display order
export const TEAM_QUERY = `
  *[_type == "teamMember" && !(_id in path("drafts.**"))] | order(order asc) {
    _id, fullName, role, department, bio, photo
  }
`

// Bookable properties
export const BOOKABLE_PROPERTIES_QUERY = `
  *[_type == "bookableProperty" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
    _id, name, priceFrom, currency, maxGuests,
    channelManagerId, status, amenities, coverImage,
    project->{ title, slug, location }
  }
`

// Site settings (singleton)
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
    whatsappNumber, email, instagramUrl,
    calendlyUrl, companyName, address, defaultSEO
  }
`
