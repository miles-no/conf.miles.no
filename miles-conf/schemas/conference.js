export default {
  name: 'conference',
  type: 'document',
  title: 'Conferences',
  fieldsets: [
    {
      name: 'internal',
      title: 'Internal Conference',
      hidden: ({ parent }) => !parent?.internal
    },
    {
      name: 'external',
      title: 'External Conference',
      hidden: ({ parent }) => parent?.internal
    }
  ],
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
      title: 'Performances',
      name: 'performances',
      type: 'array',
      of: [{ type: 'performance' }]
    },
    {
      title: 'Internal',
      name: 'internal',
      type: 'boolean',
      description: 'Internal conferences will only be visible for logged-in Miles users'
    },
    {
      title: 'Visible to offices',
      name: 'visibleTo',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Internal conference will only be vissble to selected offices or all offices if non is selected'
    },
    {
      title: 'Logo',
      name: 'image',
      type: 'image',
      fieldset: 'external',
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
      title: 'Homepage',
      name: 'url',
      type: 'url',
      fieldset: 'external',
    },
    {
      title: 'Itinerary',
      name: 'itinerary',
      type: 'array',
      of: [{
        type: 'itinerary'
      }],
      fieldset: 'internal',
    },
    {
      title: 'Signup conference',
      name: 'signupConference',
      type: 'array',
      of: [{ type: 'signupConference' }]
    }
  ]
}