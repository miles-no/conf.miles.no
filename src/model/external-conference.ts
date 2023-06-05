import type { IConference } from './conference';

export interface IExternalConference
	extends Omit<IConference, 'visibleTo' | 'showExternally' | 'signupLink' | 'itinerary'> {
	price?: string;
	tickettype?: string;
	url?: string;
}
