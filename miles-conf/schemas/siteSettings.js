export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['create', 'update', 'publish'],
  fields: [
    {
      name: 'siteName',
      type: 'string',
      title: 'Site Name',
      validation: Rule => Rule.required()
    },
    {
      title: 'Site Logo',
      name: 'siteLogo',
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
  ]
}