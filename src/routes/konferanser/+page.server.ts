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

export const load = (async ({ cookies, url }): Promise<IConferencesPageLoadData> => {
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login?redirect_uri=' + url.pathname);
	}

	const year = parseInt(url.searchParams.get('year') || '');
	
	const conferences = await fetchConferences(year);

	if (!conferences) {
		throw error(404, 'Side ikke funnet');
	}

	return {
		user,
		conferences
	};
}) satisfies PageServerLoad;
