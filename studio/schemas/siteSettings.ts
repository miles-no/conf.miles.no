import { Rule } from "sanity";

export default {
	name: 'siteSettings',
	type: 'document',
	title: 'Site Settings',
	fields: [
		{
			name: 'siteName',
			type: 'string',
			title: 'Site Name',
			validation: (Rule: Rule) => Rule.required()
		},
		{
			title: 'Site Logo',
			name: 'siteLogo',
			type: 'image',
			validation: (Rule: Rule) => Rule.required(),
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative text'
				}
			]
		}
	]
};
