export default {
  name: 'conference',
  type: 'document',
  title: 'Conferences',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      }
    },
    {
      title: 'Logo',
      name: 'image',
      type: 'image',
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
      type: 'date'
    },
    {
      title: 'End date',
      name: 'endDate',
      type: 'date'
    },
    {
      title: 'Homepage',
      name: 'editionUrl',
      type: 'url'
    }
  ]
}