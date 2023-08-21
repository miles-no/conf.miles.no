import { CalendarIcon } from '@sanity/icons';
import { Rule } from 'sanity';

export default {
	name: 'conference',
	type: 'document',
	title: 'Conferences',
	icon: CalendarIcon,
	fieldsets: [
		{ name: 'signUp', title: 'Signup' },
		{
			name: 'internal',
			title: 'Internal Conference',
			hidden: ({ parent }: { parent: { internal: boolean } }) => !parent?.internal
		},
		{
			name: 'external',
			title: 'External Conference',
			hidden: ({ parent }: { parent: { internal: boolean } }) => parent?.internal
		}
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (Rule: Rule) => Rule.required()
		},
		{
			name: 'description',
			type: 'portableText',
			title: 'Description',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title'
			},
			validation: (Rule: Rule) => Rule.required()
		},
		{
			title: 'Start date',
			name: 'startDate',
			type: 'date',
			validation: (Rule: Rule) => Rule.required()
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
			validation: (Rule: Rule) => Rule.required().min(Rule.valueOfField('startDate'))
		},
		{ name: 'location', title: 'Location', type: 'string' },
		{
			title: 'Performances',
			name: 'performances',
			type: 'array',
			of: [{ type: 'performance' }],
			description: `Miles contribution to the event`
		},
        {
            name: 'callForPapersDate',
            type: 'date',
            title: 'Call for papers',
            description: 'Call-for-papers deadline'
        },
		{
			title: 'Deadlines',
			name: 'deadlines',
			type: 'array',
			of: [{ type: 'deadline' }],
			description: `Deadlines related to the conference`
		},
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
			name: 'categoryTag',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'Smidig', value: 'Smidig' },
					{ title: 'UX/Design', value: 'UX/Design' },
					{ title: 'Utvikling', value: 'Utvikling' },
					{ title: 'Prosjektledelse', value: 'Prosjektledelse' },
					{ title: 'Innovasjon', value: 'Innovasjon' },
					{ title: 'Admin', value: 'Admin' },
					{ title: 'Test', value: 'Test/Testledelse' }
				]
			},
			description: 'For who is the conference relevant?'
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
					title: 'Alternative text'
				}
			]
		},
		{
			title: 'Homepage',
			name: 'url',
			type: 'url'
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
							validation: (Rule: Rule) => Rule.required().email(),
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
							validation: (Rule: Rule) => Rule.required()
						}
					]
				}
			]
		}
	]
};
