export default {
	name: 'deadline',
	type: 'object',
	title: 'Deadline',
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string',
			description: 'What kind of deadline is this?'
		},
		{
			title: 'Date',
			name: 'date',
			type: 'date'
		}
	],
};
