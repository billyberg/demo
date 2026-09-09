import {defineType, defineField} from 'sanity'

export const sidaStart = defineType({
  name: 'sidaStart',
  title: "Startsida",
  type: 'document',
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: 'string',
    }),
  ],
})
