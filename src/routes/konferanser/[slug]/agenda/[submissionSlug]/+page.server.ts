import { fetchExternalConferencePerformance, fetchExternalConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IEvent, IPerformance } from '../../../../../model/event';
import type { ISubmission } from '../../../../../model/submission';

export interface IAgendaPageLoadData {
	event: IEvent;
	performance: IPerformance;
	submission: ISubmission;
}

export const prerender = false;

export const load = (async ({ params, cookies }): Promise<IAgendaPageLoadData> => {
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login');
	}

	const { slug: conferenceSlug, submissionSlug } = params;

	let event = (await fetchExternalConferencePerformance(
		conferenceSlug,
		submissionSlug
	)) as unknown as IEvent;

	if (!event) {
		throw error(404, 'Side ikke funnet');
	}

	const performance = event.performances ? event.performances[0] : undefined;

	if (!performance || !performance.submission) {
		throw error(404, 'Fant ingen informasjon om agenda');
	}

	return {
		event: event,
		performance: performance,
		submission: performance.submission
	};
}) satisfies PageServerLoad;
