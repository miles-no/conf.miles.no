import { fetchConferences } from '$lib/sanityClient';

export const prerender = false;

export async function load() {
    const conferences = await fetchConferences();
    return {
        conferences: conferences.conferences
    }
}