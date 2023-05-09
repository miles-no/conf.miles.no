import type { IDescription, IImage } from './conference';

export interface IExternalConference {
	categoryTag: string[];
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

interface IEmployee {
	status: string;
	_key: string;
	email: string;
}
