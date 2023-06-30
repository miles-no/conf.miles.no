import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchConference } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import type { IConference } from '../../../model/conference';
import type { StatusKeyType } from '../../../enums/status';
import type { User } from '$lib/types/user';

export interface IConferenceSlugPageLoadData {
	conference: IConference;
	myStatus: StatusKeyType | undefined;
	user: User;
}

export const prerender = false;

export const load = (async ({ params, cookies }): Promise<IConferenceSlugPageLoadData> => {
	const { slug } = params;
	
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login');
	}

	const conference = await fetchConference(slug);

	if (!conference) {
		throw error(404, 'Side ikke funnet');
	}

	const status = conference.employees?.find((i) => i.email === user?.email)?.status;

	return {
		conference,
		myStatus: status,
		user
	};
}) satisfies PageServerLoad;
