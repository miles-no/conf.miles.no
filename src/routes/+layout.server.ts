import { fetchSiteSettings } from '$lib/sanityClient';
import type { User } from '$lib/types/user.js';
import type { ISiteSetting } from '../model/site-setting.js';
import type { LayoutServerLoad } from './$types';

export interface ILayoutPageLoadData {
	settings: ISiteSetting;
	user: User | undefined;
}

export const prerender = true;
export const ssr = false;
export const csr = true;

export const load = (async ({ locals }): Promise<ILayoutPageLoadData> => {
	const { user } = locals;

	const result = await fetchSiteSettings();

	return {
		settings: {
			siteLogo: result.siteLogo,
			siteName: result.siteName
		},
		user: user
	};
}) satisfies LayoutServerLoad;
