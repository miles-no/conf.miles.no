export enum Submission {
	presentation = 'Foredrag',
	lightningTalk = 'Lyntale',
	workshop = 'Workshop'
}

export type SubmissionType = keyof typeof Submission;
