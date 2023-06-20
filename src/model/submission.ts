import type { SubmissionType } from '../enums/submission-type';
import type { IAuthor } from './author';
import type { IDescription } from './event';

export interface ISubmission {
	slug: string;
	duration: number;
	_id: string;
	title: string;
	_rev: string;
	authors: IAuthor[];
	submissionType: SubmissionType;
	_createdAt: string;
	description: IDescription[];
	_updatedAt: string;
	_type: string;
	keywords: string[];
	_ref: string;
}
