import { fetchConferencePerformance } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import { fetchCvByEmail } from '$lib/server/cvpartnerClient';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IEvent, IPerformance } from '../../../../../model/event';
import type { ISubmission } from '../../../../../model/submission';
import type { Cv } from '$lib/types/cv';

export interface IAgendaPageLoadData {
	event: IEvent;
	performance: IPerformance;
	submission: ISubmission;
	cvs: Cv[];
}

export const prerender = false;

export const load = (async ({ params, cookies, url }): Promise<IAgendaPageLoadData> => {
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login?redirect_uri=' + url.pathname);
	}

	const { slug: conferenceSlug, submissionSlug } = params;

	let conference = (await fetchConferencePerformance(conferenceSlug, submissionSlug)) as IEvent;

	if (!conference) {
		throw error(404, 'Side ikke funnet');
	}

	const performance = conference.performances ? conference.performances[0] : undefined;

	if (!performance || !performance.submission) {
		throw error(404, 'Fant ingen informasjon om agenda');
	}

	const cvPartnerData = await Promise.all(
		performance.submission.authors.map(async (author) => await fetchCvByEmail(author.email))
	);

	return {
		event: conference,
		performance: performance,
		submission: performance.submission,
		cvs: cvPartnerData
	};
}) satisfies PageServerLoad;
