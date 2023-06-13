import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchConferences } from '$lib/sanityClient';
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
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login');
	}

	const data = await fetchConferences();
	const conferences = data as IConference[];
	const conference = conferences?.find((item) => item.slug === params.slug);

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
