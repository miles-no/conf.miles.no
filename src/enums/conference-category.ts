export enum ConferenceCategory {
	UX_Design = 'UX/Design',
	Utvikling = 'Utvikling',
	Smidig = 'Smidig',
	Prosjektledelse = 'Prosjektledelse',
	Innovasjon = 'Innovasjon',
	Admin = 'Admin',
	Test = 'Test/Testledelse',
	AI = 'AI'
}

export type ConferenceCategoryType = keyof typeof ConferenceCategory;
