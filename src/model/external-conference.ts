import type { ConferenceCategoryType } from '../enums/conference-category';
import type { StatusKeyType } from '../enums/status';
import type { IDescription, IImage } from './conference';

export interface IExternalConference {
	categoryTag: ConferenceCategoryType[];
	endDate: string;
	_createdAt: string;
	location: string;
	image: IImage;
	startDate: string;
	_id: string;
	employees: IEmployee[];
	description: IDescription[];
	price: string;
	_type: string;
	_updatedAt: string;
	title: string;
	slug: string;
	_rev: string;
	tickettype: string;
	imageUrl: string;
	url: string;
}

export interface IEmployee {
	status: StatusKeyType;
	_key: string;
	email: string;
}
