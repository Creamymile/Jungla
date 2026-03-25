import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'investmentOpportunity',
  title: 'Investment Opportunities',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'status', type: 'string', options: { list: ['available', 'in-progress', 'completed'] } }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'investmentRange', type: 'string' }),
    defineField({ name: 'expectedROI', type: 'string' }),
    defineField({ name: 'timeline', type: 'string' }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'keyFacts', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'label', type: 'string' },
        { name: 'value', type: 'string' },
      ]}]
    }),
    defineField({ name: 'brochureUrl', type: 'url' }),
  ],
})
