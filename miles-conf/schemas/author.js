export default {
  name: 'author',
  type: 'document',
  title: 'Authors',
  fieldsets: [
    { name: 'social', title: 'Social media handles' }
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      }
    },
    {
      name: 'bio',
      type: 'portableText',
      title: 'Bio',
    },
    {
      title: 'Twitter',
      name: 'twitter',
      type: 'string',
      fieldset: 'social'
    },
    {
      title: 'Instagram',
      name: 'instagram',
      type: 'string',
      fieldset: 'social'
    },
    {
      title: 'Facebook',
      name: 'facebook',
      type: 'string',
      fieldset: 'social'
    },
    {
      title: 'LinkedIn',
      name: 'linkedin',
      type: 'string',
      fieldset: 'social'
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
      fieldset: 'social'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true
      },
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
    }
  ]
}