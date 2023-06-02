import type { IConference } from './conference';

export interface IExternalConference extends IConference {
	price?: string;
	tickettype?: string;
	url?: string;
}
