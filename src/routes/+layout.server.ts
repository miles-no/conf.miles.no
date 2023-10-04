
import { env } from '$env/dynamic/public'
import {parseIsProd, setServersideToggle, getIsProd} from "../featureFlagging/server";

$: {
	parseIsProd(env);

	console.log("PUBLIC_FLAG_ALPHANUMERICSLUG:", env.PUBLIC_FLAG_ALPHANUMERICSLUG === "true");
	setServersideToggle("strictAlphaNumericSlug", env.PUBLIC_FLAG_ALPHANUMERICSLUG === "true");
}

import { fetchSiteSettings } from '$lib/sanityClient';
import type { User } from '$lib/types/user.js';
import type { ISiteSetting } from '../model/site-setting.js';
import type { LayoutServerLoad } from './$types';

export interface ILayoutPageLoadData {
	settings: ISiteSetting;
	user: User | undefined;
	isProd: boolean
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
		user: user,
		isProd: getIsProd()
	};
}) satisfies LayoutServerLoad;
