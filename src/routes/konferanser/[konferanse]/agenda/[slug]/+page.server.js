import { fetchConferencePerformance } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const ssr = false;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	const { konferanse, slug } = params;
	const conference = await fetchConferencePerformance(konferanse, slug);
	const user = getUserFromCookie(cookies.get('session'));
	if (!conference.conference || !conference.conference.performance) {
		return {
			status: 404
		};
	}
	if (!user.isAuthenticated && !conference.conference.showExternally) {
		throw redirect(307, '/');
	}

	return {
		conference: conference.conference,
		performance: conference.conference.performance,
		submission: conference.conference.performance.submission
	};
}
