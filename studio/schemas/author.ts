import { UserIcon } from '@sanity/icons';
import { Rule } from 'sanity';

export default {
	name: 'author',
	type: 'document',
	title: 'Authors',
	icon: UserIcon,
	fieldsets: [{ name: 'social', title: 'Social media handles' }],
	fields: [
		{
			name: 'name',
			type: 'string',
			title: 'Name',
			validation: (Rule: Rule) => Rule.required()
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name'
			},
			validation: (Rule: Rule) => Rule.required()
		},
		{
			title: 'Title (workposition)',
			name: 'title',
			type: 'string'
		},
		{
			name: 'bio',
			type: 'portableText',
			title: 'Bio',
			validation: (Rule: Rule) => Rule.required()
		},
		{
			title: 'Twitter',
			name: 'twitter',
			type: 'string',
			fieldset: 'social'
		},
		{
			title: 'Instagram',
			name: 'instagram',
			type: 'string',
			fieldset: 'social'
		},
		{
			title: 'Facebook',
			name: 'facebook',
			type: 'string',
			fieldset: 'social'
		},
		{
			title: 'LinkedIn',
			name: 'linkedin',
			type: 'string',
			fieldset: 'social'
		},
		{
			title: 'Email',
			name: 'email',
			type: 'string',
			fieldset: 'social'
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image',
			validation: (Rule: Rule) => Rule.required(),
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
		}
	],
	preview: {
		select: {
			media: 'image',
			title: 'name',
			subtitle: 'title'
		}
	}
};
