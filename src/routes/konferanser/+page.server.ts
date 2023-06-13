import { fetchConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import { error, redirect } from '@sveltejs/kit';
import type { IConference } from '../../model/conference';
import type { User } from '$lib/types/user';
import type { PageServerLoad } from './$types';

export interface IConferencesPageLoadData {
	conferences: IConference[];
	user: User;
}

export const prerender = false;

export const load = (async ({ cookies }): Promise<IConferencesPageLoadData> => {
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login');
	}

	const conferences = await fetchConferences();

	if (!conferences) {
		throw error(404, 'Side ikke funnet');
	}

	return {
		user,
		conferences
	};
}) satisfies PageServerLoad;
