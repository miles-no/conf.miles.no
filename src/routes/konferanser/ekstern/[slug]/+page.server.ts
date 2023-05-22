import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchExternalConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import type { IExternalConference } from '../../../../model/external-conference';
import type { StatusKeyType } from '../../../../enums/status';

export interface IPageLoadData {
	conference: IExternalConference;
	myStatus: StatusKeyType | undefined;
	user: any;
}

export const load = (async ({ params, cookies }): Promise<IPageLoadData> => {
	const user = getUserFromCookie(cookies.get('session'));
	const data = await fetchExternalConferences(user);
	const externalConferences = data.externalConferences as unknown as IExternalConference[];
	const conference = externalConferences.find((item) => item.slug === params.slug);
	const status = conference?.employees.find((i) => i.email === user?.email)?.status;

	if (!conference) {
		throw error(404, 'Side ikke funnet');
	}

	return {
		conference: conference,
		myStatus: status,
		user: user
	};
}) satisfies PageServerLoad;
