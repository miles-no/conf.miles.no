export default {
    name: 'signupConference',
    type: 'object',
    title: 'Signup Conference',
    fields: [
      {
        title: 'Name',
        name: 'name',
        type: 'string'
      },
      {
        title: 'Email',
        name: 'email',
        type: 'string',
      },
      {
        title: 'Has signed up',
        name: 'hasSignedup',
        type: 'boolean'
      },
      {
        title: 'Comment',
        name: 'comment',
        type: 'text'
      }
    ]
  }