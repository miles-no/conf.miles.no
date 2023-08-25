import type { IDescription, IImage } from './event';

export interface IAuthor {
	bio: IDescription[];
	title: string;
	_createdAt: string;
	_rev: string;
	_type: string;
	_updatedAt: string;
	slug: string;
	image: IImage;
	name: string;
	_id: string;
	imageUrl: string;
	twitter: string;
	email: string;
}
