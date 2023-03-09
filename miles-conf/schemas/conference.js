export default {
	name: 'conference',
	type: 'document',
	title: 'Conferences',
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
			type: 'text',
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
		{
			title: 'Link to signup',
			name: 'signupLink',
			type: 'url',
			fieldset: 'signUp'
		},
		{ title: 'Signup Deadline', name: 'deadline', type: 'datetime', fieldset: 'signUp' },
		{
			title: 'Internal',
			name: 'internal',
			type: 'boolean',
			description: 'Event is hosted by Miles'
		},
		{
			title: 'Visible to offices',
			name: 'visibleTo',
			type: 'array',
			of: [{ type: 'string' }],
			description:
				'Internal conference will only be vissble to selected offices or all offices if non is selected'
		},
		{
			title: 'Show externally',
			name: 'showExternally',
			type: 'boolean',
			description: 'Make event visible to not-logged in users(external users)'
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image',
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
			fieldset: 'external'
		},
		{
			title: 'Itinerary',
			name: 'itinerary',
			type: 'array',
			of: [
				{
					type: 'itinerary'
				}
			],
			fieldset: 'internal'
		}
	]
};
