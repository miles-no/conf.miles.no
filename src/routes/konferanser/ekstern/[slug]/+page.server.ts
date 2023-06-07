import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchExternalConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import type { IExternalConference } from '../../../../model/external-conference';
import type { StatusKeyType } from '../../../../enums/status';
import type { User } from '$lib/types/user';

export interface IExternalConferenceSlugPageLoadData {
	conference: IExternalConference;
	myStatus: StatusKeyType | undefined;
	user: User;
}

export const prerender = false;

export const load = (async ({ params, cookies }): Promise<IExternalConferenceSlugPageLoadData> => {
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login');
	}

	const data = await fetchExternalConferences();
	const externalConferences = data.externalConferences as unknown as IExternalConference[];
	const conference = externalConferences?.find((item) => item.slug === params.slug);

	if (!conference) {
		throw error(404, 'Side ikke funnet');
	}

	const status = conference.employees?.find((i) => i.email === user?.email)?.status;

	return {
		conference: conference,
		myStatus: status,
		user: user
	};
}) satisfies PageServerLoad;
