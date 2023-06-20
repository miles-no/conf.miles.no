import { SparkleIcon } from '@sanity/icons';
import { Rule } from 'sanity';

export default {
	name: 'submission',
	type: 'document',
	title: 'Submissions',
	icon: SparkleIcon,
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (Rule: Rule) => Rule.required()
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
			title: 'Authors',
			name: 'authors',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'author' }]
				}
			],
			validation: (Rule: Rule) => Rule.required()
		},
		{
			title: 'Submission type',
			name: 'submissionType',
			type: 'string',
			options: {
				layout: 'radio',
				list: [
					{ title: 'Lightning talk', value: 'lightningTalk' },
					{ title: 'Presentation', value: 'presentation' },
					{ title: 'Workshop', value: 'workshop' }
				]
			},
			validation: (Rule: Rule) => Rule.required()
		},
		{
			title: 'Description',
			name: 'description',
			type: 'portableText',
			validation: (Rule: Rule) => Rule.required()
		},
		{
			title: 'Duration',
			name: 'duration',
			type: 'number',
			description: 'The submission duration in minutes',
			validation: (Rule: Rule) => Rule.required().min(10).max(180)
		},
		{
			title: 'Keywords',
			name: 'keywords',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags'
			}
		}
	]
};
