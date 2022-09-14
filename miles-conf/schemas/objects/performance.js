export default {
  name: 'performance',
  type: 'object',
  title: 'Performance',
  fields: [
    {
      title: 'Date and time',
      name: 'dateAndTime',
      type: 'datetime'
    },
    {
      title: 'Location',
      name: 'location',
      type: 'string'
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
      title: 'Links',
      name: 'performanceUrls',
      type: 'array',
      of: [{ type: 'url' }]
    },
    {
      title: 'Conference',
      name: 'performanceConference',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'conference' }],
      }]
    },
  ]
}