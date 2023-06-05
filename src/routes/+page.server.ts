import { fetchConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import type { User } from 'lucide-svelte';
import type { IConference } from '../model/conference';

export interface IPageLoadData {
	conferences: IConference[];
	user: User;
}

export async function load({ cookies }) {
	const user = getUserFromCookie(cookies.get('session'));
	const conferences = await fetchConferences(user);

	if (!conferences) {
		return {
			status: 404
		};
	}
	return {
		user: user,
		conferences: conferences.conferences
	};
}
