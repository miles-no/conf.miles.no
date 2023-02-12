import { fetchConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';

export const prerender = false;

export async function load({ cookies }) {
    const user = getUserFromCookie(cookies.get('session'));
    const conferences = await fetchConferences(user);
    return {
        conferences: conferences.conferences
    }
}