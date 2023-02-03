import { fetchConferences } from '$lib/sanityClient';

let allConferencesLoaded = false;
export async function load() {
    const conferences = await fetchConferences();

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