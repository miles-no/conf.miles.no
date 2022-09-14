export default {
  name: 'portableText',
  title: 'Portable text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal text', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
      }
    }
  ]
};
