import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schema'

export default defineConfig({
  name: 'jungla',
  title: 'Jungla Lombok',
  projectId: '66e986fl',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
