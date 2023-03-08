const isValidTime = (time) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

export default {
	name: 'itineraryEvent',
	type: 'object',
	title: 'Itinerary Event',
	fieldsets: [
		{
			name: 'times',
			title: 'When',
			options: {
				columns: 2
			}
		}
	],
	fields: [
		{
			title: 'Event',
			name: 'description',
			type: 'string'
		},
		// {
		// 	title: 'Connect to submission (Optional)',
		// 	name: 'connectedSubmission',
		// 	description: 'Select single submission as itinerary event',
		// 	type: 'reference',
		// 	to: [{ type: 'submission' }]
		// },
		// {
		// 	title: 'Itinerary event type',
		// 	description: 'Specify the itinerary event type (Optional)',
		// 	name: 'eventType',
		// 	type: 'string',
		// 	options: {
		// 		layout: 'radio',
		// 		list: [
		// 			{ title: 'Lightning talk', value: 'lightningTalk' },
		// 			{ title: 'Presentation', value: 'presentation' },
		// 			{ title: 'Workshop', value: 'workshop' },
		// 			{ title: 'Activity', value: 'activity' }
		// 		]
		// 	}
		// },
		// {
		// 	title: 'Speakers',
		// 	name: 'authors',
		// 	type: 'array',
		// 	of: [
		// 		{
		// 			type: 'reference',
		// 			to: [{ type: 'author' }]
		// 		}
		// 	],
		// 	hidden: ({ parent }) =>
		// 		!(parent?.eventType === 'presentation' || parent?.eventType === 'lightningTalk')
		// },
		{
			title: 'Start',
			name: 'startTime',
			type: 'string',
			fieldset: 'times',
			description: 'e.g 10:00',
			validation: (Rule) =>
				Rule.custom((time) => {
					return isValidTime(time) ? true : 'The field must be in HH:MM format.';
				})
		},
		{
			title: 'End',
			name: 'endTime',
			type: 'string',
			fieldset: 'times',
			description: 'e.g 11:00. Optional',
			validation: (Rule) =>
				Rule.custom((time) => {
					if (!time) {
						return true;
					}

					return isValidTime(time) ? true : 'The field must be in HH:MM format.';
				})
		},
		{
			title: 'Contains Performances',
			name: 'containsPerformances',
			type: 'boolean',
			description:
				'Marks if the event should list conference performances scheduled to this timeslot'
		},
		{
			title: 'Extra info',
			name: 'info',
			type: 'portableText'
		}
	]
};
