export interface IConference {
	_rev: string;
	itinerary: IItinerary[];
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
	performances: IPerformance[];
	startDate: string;
	deadline: string;
	imageUrl: string;
	endDate: string;
	_type: string;
	location?: string;
	slug: string;
	_id: string;
}

interface IPerformance {
	internal?: boolean;
	dateAndTime: string;
	_type: string;
	submission: IAsset;
	_key: string;
}

<<<<<<< HEAD
export interface IDescription {
=======
interface IDescription {
>>>>>>> dev
	_type: string;
	style: string;
	_key: string;
	markDefs: ImarkDefs[];
	children: IChildren[];
}

<<<<<<< HEAD
export interface IImage {
=======
interface IImage {
>>>>>>> dev
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

<<<<<<< HEAD
export interface IAsset {
=======
interface IAsset {
>>>>>>> dev
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

<<<<<<< HEAD
export interface IChildren {
=======
interface IChildren {
>>>>>>> dev
	_type: string;
	marks: string[];
	text: string;
	_key: string;
}

<<<<<<< HEAD
export interface ImarkDefs {
=======
interface ImarkDefs {
>>>>>>> dev
	_key: string;
	_type: string;
	href: string;
}
