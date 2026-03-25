import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'status', type: 'string', options: { list: ['delivered', 'in-progress', 'upcoming'] } }),
    defineField({ name: 'category', type: 'string', options: { list: ['villa', 'entertainment', 'horeca'] } }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'bedrooms', type: 'number' }),
    defineField({ name: 'sizeSqm', type: 'number' }),
    defineField({ name: 'poolType', type: 'string', options: { list: ['private', 'shared', 'none'] } }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isBookable', type: 'boolean', initialValue: false }),
    defineField({ name: 'bookingId', type: 'string', description: 'Channel manager property ID' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'seo', type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'ogImage', type: 'image' },
      ]
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'status', media: 'coverImage' } }
})
