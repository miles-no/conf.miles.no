import { redirect } from '@sveltejs/kit';
import { fetchEvents } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import type { User } from '$lib/types/user';
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

	if (user.isAuthenticated) {
		throw redirect(308, '/konferanser');
	}

	return {
		user,
		events,
	};
}
