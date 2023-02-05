import { fetchConferences } from '$lib/sanityClient';

export async function load() {
    const conferences = await fetchConferences();
    return {
        conferences: conferences.conferences
    }
}