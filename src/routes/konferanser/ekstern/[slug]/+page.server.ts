import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchExternalConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import type { IExternalConference } from '../../../../model/external-conference';

export interface IPageLoadData {
	user: any;
	conference: IExternalConference;
}

export const load = (async ({ params, cookies }): Promise<IPageLoadData> => {
	const user = getUserFromCookie(cookies.get('session'));

	const data = await fetchExternalConferences(user);
	const externalConferences = data.externalConferences as unknown as IExternalConference[];
	const conference = externalConferences.find((item) => item.slug === params.slug);

	if (!conference) {
		throw error(404, 'Not found');
	}

	return {
		user: user,
		conference: conference
	};
}) satisfies PageServerLoad;
