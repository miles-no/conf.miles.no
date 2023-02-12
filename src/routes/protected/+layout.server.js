import {  fetchSiteSettings } from '$lib/sanityClient';

export const prerender = false;
export const ssr = true;
export const csr = false;

export async function load({ params, locals }) {
    const { slug = '', konferanse = '' } = params;
    const result = await fetchSiteSettings(slug, konferanse);

    return {
        settings: {
            siteLogo: result.siteLogo,
            siteName: result.siteName
        },
        user: locals.user
    };
}