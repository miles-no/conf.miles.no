import { fetchExternalConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

export async function load({ cookies }) {
	const user = getUserFromCookie(cookies.get('session'));

	if (!user.isAuthenticated) {
		throw redirect(307, '/login');
	}

	const externalConferences = await fetchExternalConferences(user);

	if (!externalConferences) {
		return {
			status: 404
		};
	}
	return {
		user: user,
		externalConferences: externalConferences.externalConferences
	};
}
