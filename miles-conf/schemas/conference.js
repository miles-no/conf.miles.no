import { isValidTime } from './objects/itineraryEvent';

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
			type: 'portableText',
			title: 'Description',
			validation: (Rule) => Rule.required()
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
		},
		{
			title: 'EventType',
			name: 'eventType',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'Sosial', value: 'Sosial' },
					{ title: 'Faglig', value: 'Faglig' },
					{ title: 'SMiles', value: 'SMiles' }
				]
			},
			validation: (Rule) => Rule.required(),
			description: 'Event type'
		},
		{
			title: 'Relevent Employees',
			name: 'employees',
			type: 'array',
			of: [
				{
					title: 'Employee Status',
					type: 'object',
					fields: [
						{
							name: 'email',
							title: 'Email',
							type: 'string',
							validation: (Rule) => Rule.required().email(),
							unique: true
						},
						{
							name: 'status',
							title: 'Status',
							type: 'string',
							options: {
								list: [
									{ title: 'Attending', value: 'attending' },
									{ title: 'Interested', value: 'interested' },
									{ title: 'Not Going', value: 'notGoing' }
								]
							},
							validation: (Rule) => Rule.required()
						}
					]
				}
			]
		},
		{
			title: 'Category',
			name: 'categoryTag',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'Smidig', value: 'Smidig' },
					{ title: 'UX/Design', value: 'UX/Design' },
					{ title: 'Utvikling', value: 'Utvikling' },
					{ title: 'Prosjektledelse', value: 'Prosjektledelse' },
					{ title: 'Admin', value: 'Admin' }
				]
			},
			validation: (Rule) => Rule.required(),
			description: 'For who is the conference relevant?'
		}
	]
};
