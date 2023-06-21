import { fetchEvents } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';

export const prerender = false;

export async function load({ cookies }) {
    const user = getUserFromCookie(cookies.get('session'));
    const events = await fetchEvents(user);
    return {
        events: events.events
    }
}