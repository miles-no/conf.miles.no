export default {
  name: 'submission',
  type: 'document',
  title: 'Submissions',
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
      title: 'Authors',
      name: 'authors',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'author' }]
      }]
    },
    {
      title: 'Submission type',
      name: 'submissionType',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Lightning talk', value: 'lightningTalk' },
          { title: 'Presentation', value: 'presentation' },
          { title: 'Workshop', value: 'workshop' },
        ]
      }
    },
    {
      title: 'Description',
      name: 'description',
      type: 'portableText'
    },
    {
      title: 'Duration',
      name: 'duration',
      type: 'number',
      description: 'The submission duration in minutes'
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
  ]
}