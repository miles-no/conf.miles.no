import { fetchEventPerformance, fetchConferencePerformance } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const ssr = false;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	const { arrangement, slug } = params;
	let event = await fetchEventPerformance(arrangement, slug);

	if (event === null) {
		event = await fetchConferencePerformance(arrangement, slug);
	}

	const user = getUserFromCookie(cookies.get('session'));
	if (event === null || !event.performance) {
		return {
			status: 404
		};
	}
	if (!user.isAuthenticated && !event.showExternally) {
		throw redirect(307, '/login');
	}

	return {
		event,
		performance: event.performance,
		submission: event.performance.submission
	};
}
