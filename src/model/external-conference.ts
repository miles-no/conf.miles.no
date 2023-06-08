import type { IEvent } from './event';

export interface IExternalConference
	extends Omit<IEvent, 'visibleTo' | 'showExternally' | 'signupLink' | 'itinerary'> {
	price?: string;
	tickettype?: string;
	url?: string;
}
