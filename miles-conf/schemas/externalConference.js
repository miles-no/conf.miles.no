export default {
	name: 'externalConference',
	type: 'document',
	title: 'External Conferences',
	fieldsets: [
		{ name: 'signUp', title: 'Signup' },
		{
			name: 'internal',
			title: 'Internal Conference',
			hidden: ({ parent }) => !parent?.internal
		},
		{
			name: 'external',
			title: 'External Conference',
			hidden: ({ parent }) => parent?.internal
		}
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'description',
			type: 'portableText',
			title: 'Description'
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title'
			},
			validation: (Rule) => Rule.required()
		},
		{
			title: 'Start date',
			name: 'startDate',
			type: 'date',
			validation: (Rule) => Rule.required()
		},
		{
			title: 'Timeperiod',
			name: 'timeperiod',
			type: 'string',
			description: 'Timeperiod for the event, e.g 10:00-14:00. Independent from itinerary.'
		},
		{
			title: 'End date',
			name: 'endDate',
			type: 'date',
			validation: (Rule) => Rule.required().min(Rule.valueOfField('startDate'))
		},
		{ name: 'location', title: 'Location', type: 'string' },
		{
			title: 'Performances',
			name: 'performances',
			type: 'array',
			of: [{ type: 'performance' }]
		},
		{ title: 'Signup Deadline', name: 'deadline', type: 'datetime', fieldset: 'signUp' },
		{
			title: 'TicketType',
			name: 'tickettype',
			type: 'string',
			description: 'The current type of ticket that is available'
		},
        {
			title: 'Price',
			name: 'price',
			type: 'string',
			description: 'The cost of the conference at the current time'
		},
		{
			title: 'Category',
			name:"categoryTag",
			type: "array",
			of: [{type:"string"}],
			options:{

				list:  [{title: "Smidig", value:"Smidig"}, {title: "UX/Design", value:"UX/Design"}, {title: "Utvikling", value:"Utvikling"}],
			},
			description:"For who is the conference relevant?"
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
				}
			]
		},
		{
			title: 'Homepage',
			name: 'url',
			type: 'url',
		},
		{
			title: 'Attending',
			name: 'attending',
			type: 'array',
			of: [{type: "string"}]
		},
		{
			title: 'Interested',
			name: 'interested',
			type: 'array',
			of: [{type: "string"}]
		},
		
		
	]
};
