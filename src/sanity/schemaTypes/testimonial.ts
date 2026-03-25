import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'authorName', type: 'string' }),
    defineField({ name: 'roleOrigin', type: 'string' }),
    defineField({ name: 'type', type: 'string', options: { list: ['guest', 'investor'] } }),
    defineField({ name: 'quote', type: 'text' }),
    defineField({ name: 'stars', type: 'number', initialValue: 5 }),
    defineField({ name: 'photo', type: 'image' }),
    defineField({ name: 'source', type: 'string', options: { list: ['airbnb', 'booking', 'direct', 'other'] } }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
})
