import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bookableProperty',
  title: 'Bookable Properties',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'project', type: 'reference', to: [{ type: 'project' }] }),
    defineField({ name: 'priceFrom', type: 'number' }),
    defineField({ name: 'currency', type: 'string', options: { list: ['EUR', 'USD', 'IDR'] }, initialValue: 'EUR' }),
    defineField({ name: 'maxGuests', type: 'number' }),
    defineField({ name: 'channelManagerId', type: 'string' }),
    defineField({ name: 'status', type: 'string', options: { list: ['active', 'coming-soon'] }, initialValue: 'active' }),
    defineField({ name: 'amenities', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
  ],
})
