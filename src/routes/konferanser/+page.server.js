import {  fetchExternalConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';

let allConferencesLoaded = false;
export async function load({ cookies }) {
	const user = getUserFromCookie(cookies.get('session'));
	const externalConferences = await fetchExternalConferences(user);

	if ( !externalConferences) {
		return {
			status: 404
		};
	}
	allConferencesLoaded = true;
	return {
		user: user,
		externalConferences: externalConferences.externalConferences
	};
}