import { fetchExternalConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';

export const prerender = false;

export async function load({ cookies }) {
	const user = getUserFromCookie(cookies.get('session'));
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
