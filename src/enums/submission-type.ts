/** KEYS IN THIS ENUM MUST MATCH value's IN options.list IN /Users/espennorderud/source/miles/conf.miles.no/studio/schemas/submission.ts */
export enum Submission {
	presentation = 'Foredrag',
	lightningTalk = 'Lyntale',
	workshop = 'Workshop'
}

export type SubmissionType = keyof typeof Submission;
