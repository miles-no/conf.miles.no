import { fetchConference } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const ssr = true;

export async function load({ params, cookies }) {
	const { slug } = params;

	const conference = await fetchConference(slug);
	const user = getUserFromCookie(cookies.get('session'));
	if (!conference) {
		return {
			status: 404
		};
	}

	if (!user.isAuthenticated && !conference.conference.showExternally) {
		throw redirect(307, '/');
	}

	return {
		user: user,
		conference: conference.conference
	};
}
