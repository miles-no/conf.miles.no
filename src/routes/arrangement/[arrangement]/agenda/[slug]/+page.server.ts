import { fetchEventPerformance } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import { error, redirect } from '@sveltejs/kit';
import type { IEvent } from '../../../../../model/event';
import type { PageServerLoad } from './$types';
import type { IAgendaPageLoadData } from '../../../../konferanser/[slug]/agenda/[submissionSlug]/+page.server';
import {fetchCvByEmail} from "$lib/server/cvpartnerClient";

export const prerender = false;
export const ssr = false;
export const csr = true;

export const load = (async ({ params, cookies, url }): Promise<IAgendaPageLoadData> => {
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login?redirect_uri=' + url.pathname);
	}

	const { arrangement, slug } = params;

	let event = (await fetchEventPerformance(arrangement, slug)) as IEvent;

	if (!event) {
		throw error(404, 'Side ikke funnet');
	}

	const performance = event.performances ? event.performances[0] : undefined;

	if (!performance?.submission) {
		throw error(404, 'Fant ingen informasjon om agenda');
	}

	const cvPartnerData = (!(performance.submission.authors || []).length)
		? []
		: await Promise.all(
			performance.submission.authors.map(async (author) => await fetchCvByEmail(author.email))
		);

	return {
		event: event,
		performance: performance,
		submission: performance.submission,
		cvs: cvPartnerData
	};
}) satisfies PageServerLoad;
