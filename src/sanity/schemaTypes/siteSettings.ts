import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'whatsappNumber', type: 'string', description: 'Include country code, e.g. 6281234567890' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({ name: 'calendlyUrl', type: 'url' }),
    defineField({ name: 'companyName', type: 'string', initialValue: 'PT Jungla Lombok' }),
    defineField({ name: 'address', type: 'text' }),
    defineField({
      name: 'defaultSEO', type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'ogImage', type: 'image' },
      ]
    }),
  ],
})
