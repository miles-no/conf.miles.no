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
      of: [{ type: 'urls' }]
    }
  ],
  preview: {
    select: {
      title: 'submission.title',
      dateAndTime: 'dateAndTime',
      location: 'location'
    },
    prepare(selection) {
      const { title, dateAndTime, location } = selection;
      return {
        title: title,
        subtitle: `${location ? location+' - ' : ''}${new Intl.DateTimeFormat('no-NO', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Etc/UTC'}).format(new Date(dateAndTime))}`
      }
    }
  }
}