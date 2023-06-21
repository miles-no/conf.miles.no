import type { IEvent } from './event';

export interface IConference
	extends Omit<IEvent, 'visibleTo' | 'showExternally' | 'signupLink' | 'itinerary'> {
	price?: string;
	tickettype?: string;
	url?: string;
}
