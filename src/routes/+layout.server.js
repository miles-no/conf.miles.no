import {  fetchSiteSettings } from '$lib/sanityClient';

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