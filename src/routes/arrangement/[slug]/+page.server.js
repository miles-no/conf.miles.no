import { fetchEvent } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import { error, redirect } from '@sveltejs/kit';

export const prerender = false;
export const ssr = true;

export async function load({ params, cookies, url }) {
	const { slug } = params;

	const event = await fetchEvent(slug);
	const user = getUserFromCookie(cookies.get('session'));
	
	if (event == null) {
		throw error(404, 'Side ikke funnet');
	}

	if (!user.isAuthenticated && !event.showExternally) {
		throw redirect(307, '/');
	}

	return {
		user,
		event,
		url: url.href
	};
}
