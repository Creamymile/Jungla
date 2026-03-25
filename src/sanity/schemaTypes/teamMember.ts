import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({ name: 'fullName', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'department', type: 'string', options: { list: ['leadership', 'construction', 'operations', 'administration'] } }),
    defineField({ name: 'bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', type: 'number', initialValue: 99 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
