import {defineType, defineField} from 'sanity'

export const services = defineType({
  name: 'services',
  title: "Services",
  type: 'document',
  fields: [
    defineField({
      name: "rubrik",
      title: "Rubrik",
      type: 'string',
    }),
    defineField({
      name: "text",
      title: "Text",
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: "slug",
      title: "Adress",
      type: 'slug',
      options: {source: "rubrik", maxLength: 96},
    }),
    defineField({
      name: "innehall",
      title: "Innehåll",
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: "ordning",
      title: "Ordning",
      type: 'number',
    }),
  ],
  orderings: [{title: 'Ordning', name: 'ordning', by: [{field: 'ordning', direction: 'asc'}]}],
})
