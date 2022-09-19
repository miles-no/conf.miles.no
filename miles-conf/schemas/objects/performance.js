export default {
  name: 'performance',
  type: 'object',
  title: 'Performance',
  fields: [
    {
      title: 'Submission',
      name: 'submission',
      type: 'reference',
      to: [{ type: 'submission' }],
    },
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
      title: 'Links',
      name: 'performanceUrls',
      type: 'array',
      of: [{ type: 'url' }]
    },

  ]
}