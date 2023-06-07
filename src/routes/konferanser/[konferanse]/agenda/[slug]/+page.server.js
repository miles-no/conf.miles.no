import { fetchConferencePerformance, fetchExternalConferencePerformance } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const ssr = false;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	const { konferanse, slug } = params;
	let conference = await fetchConferencePerformance(konferanse, slug);

	if (conference.conference === null) {
		conference = await fetchExternalConferencePerformance(konferanse, slug);
	}

	const user = getUserFromCookie(cookies.get('session'));
	if (conference.conference === null || !conference.conference.performance) {
		return {
			status: 404
		};
	}
	if (!user.isAuthenticated && !conference.conference.showExternally) {
		throw redirect(307, '/login');
	}

	return {
		conference: conference.conference,
		performance: conference.conference.performance,
		submission: conference.conference.performance.submission
	};
}
