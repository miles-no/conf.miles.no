export default {
    name: 'signupEvent',
    type: 'object',
    title: 'Signup Event',
    fields: [
      {
        title: 'Max participants',
        name: 'maxParticipants',
        type: 'number'
      },
      {
        title: 'Participants',
        name: 'participants',
        type: 'array',
        of: [{
          type: 'signupParticipants'
        }],
      }
    ]
  }