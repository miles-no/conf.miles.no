import { fetchConference } from '$lib/sanityClient';

export const prerender = false;

export async function load({ params }) {
    const { slug } = params;

    const conference = await fetchConference(slug);

    if (!conference) {
        return {
            status: 404
        };
    }

    return {
        conference: conference.conference
    };
}