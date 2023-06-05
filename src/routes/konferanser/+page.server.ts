import { fetchExternalConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import { error, redirect } from '@sveltejs/kit';
import type { IExternalConference } from '../../model/external-conference';
import type { User } from '$lib/types/user';
import type { PageServerLoad } from './$types';

export interface IExternalConferencesPageLoadData {
	externalConferences: IExternalConference[];
	user: User;
}

export const prerender = false;

export const load = (async ({ params, cookies }): Promise<IExternalConferencesPageLoadData> => {
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login');
	}

	const externalConferences = await fetchExternalConferences();

	if (!externalConferences) {
		throw error(404, 'Side ikke funnet');
	}

	return {
		user: user,
		externalConferences: externalConferences.externalConferences
	};
}) satisfies PageServerLoad;
