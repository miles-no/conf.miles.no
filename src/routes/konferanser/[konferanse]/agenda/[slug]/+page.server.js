import { fetchConferencePerformance } from '$lib/sanityClient';

export const prerender = false;
export const ssr = false;
export const csr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { konferanse, slug } = params;
    const conference = await fetchConferencePerformance(konferanse, slug);

    if (!conference.conference || !conference.conference.performance) {
        return {
            status: 404
        };
    }

    return {
        conference: conference.conference,
        performance: conference.conference.performance,
        submission: conference.conference.performance.submission
    };
}