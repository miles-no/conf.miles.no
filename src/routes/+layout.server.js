import { fetchSiteSettings } from '$lib/sanityClient';

export const prerender = true;
export const ssr = false;
export const csr = true;

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
