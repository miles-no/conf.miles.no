export default {
  name: 'conference',
  type: 'document',
  title: 'Conferences',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Internal',
      name: 'internal',
      type: 'boolean',
      description: 'Internal conferences will only be visible for logged-in Miles users'
    },
    {
      title: 'Logo',
      name: 'image',
      type: 'image',
      validation: Rule => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          options: {
            isHighlighted: true
          }
        },
      ]
    },
    {
      title: 'Start date',
      name: 'startDate',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      title: 'End date',
      name: 'endDate',
      type: 'date',
      validation: Rule => Rule.required().min(Rule.valueOfField('startDate'))
    },
    {
      title: 'Homepage',
      name: 'url',
      type: 'url',
      validation: Rule => Rule.required()
    },
    {
      title: 'Performances',
      name: 'performances',
      type: 'array',
      of: [{ type: 'performance' }]
    }
  ]
}