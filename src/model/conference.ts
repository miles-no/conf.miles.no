import type { ConferenceCategoryType } from '../enums/conference-category';
import type { EventType } from '../enums/event';
import type { StatusKeyType } from '../enums/status';
import type { ISubmission } from './submission';

export interface IConference {
	_id: string;
	_rev: string;
	itinerary?: IItinerary[];
	showExternally: boolean;
	internal: boolean;
	signupLink: string;
	startTime: string;
	_updatedAt: string;
	timeperiod: string;
	image: IImage;
	title: string;
	_createdAt: string;
	description: IDescription[];
	performances?: IPerformance[];
	startDate: string;
	deadline: string;
	imageUrl: string;
	endDate: string;
	_type: string;
	location?: string;
	slug: string;
	eventType: EventType[];
	visibleTo: string[];
	employees?: IEmployee[];
	categoryTag?: ConferenceCategoryType[];
}

export interface IPerformance {
	internal?: boolean;
	dateAndTime: string;
	location: string;
	_type: string;
	_key: string;
	submission: ISubmission;
}

export interface IDescription {
	_type: string;
	style: string;
	_key: string;
	markDefs: ImarkDefs[];
	children: IChildren[];
}

export interface IImage {
	alt: string;
	asset: IAsset;
	crop: ICrop;
	hotspot: IHotspot;
	_type: string;
}

interface IHotspot {
	x: number;
	y: number;
	height: number;
	_type: string;
	width: number;
}

interface ICrop {
	top: number;
	left: number;
	bottom: number;
	_type: string;
	right: number;
}

export interface IAsset {
	_ref: string;
	_type: string;
}

interface IItinerary {
	_key: string;
	events: IEvent[];
	itineraryDate: string;
	_type: string;
}

interface IEvent {
	startTime: string;
	endTime?: string;
	_key: string;
	_type: string;
	description: string;
	info?: IInfo[];
	containsPerformances?: boolean;
}

interface IInfo {
	_type: string;
	style: string;
	_key: string;
	markDefs: ImarkDefs[];
	children: IChildren[];
}

export interface IChildren {
	_type: string;
	marks: string[];
	text: string;
	_key: string;
}

export interface ImarkDefs {
	_key: string;
	_type: string;
	href: string;
}

export interface IEmployee {
	status: StatusKeyType;
	_key: string;
	email: string;
}
