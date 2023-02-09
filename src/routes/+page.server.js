import { fetchConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';

let allConferencesLoaded = false;
export async function load({ cookies }) {
    const user = getUserFromCookie(cookies.get('session'));
    const conferences = await fetchConferences(user);

    if (!conferences) {
        return {
            status: 404
        };
    }
    allConferencesLoaded = true;
    return {
        conferences: conferences.conferences
    };
}