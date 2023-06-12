import { fetchEvents } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import type { User } from 'lucide-svelte';
import type { IEvent } from '../model/event';

export interface IPageLoadData {
	events: IEvent[];
	user: User;
}

export async function load({ cookies }) {
	const user = getUserFromCookie(cookies.get('session'));
	const events = await fetchEvents(user);

	if (!events) {
		return {
			status: 404
		};
	}
	return {
		user,
		events,
	};
}
