import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchConference } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth';
import type { IConference } from '../../../../model/conference';
import {fetchAllUsersCached, type UsersByOffice} from "$lib/server/cvpartnerClient";

export const prerender = false;

export type EditConferenceData = {
    conference: IConference,
    usersByOffice: UsersByOffice
}

export const load = (async ({ params, cookies, url }): Promise<EditConferenceData> => {
    const { slug } = params;

    const user = getUserFromCookie(cookies.get('session'));

    if (!user.isAuthenticated) {
        throw redirect(307, '/login?redirect_uri=' + url.pathname);
    }

    const conference = await fetchConference(slug);

    if (!conference) {
        throw error(404, 'Side ikke funnet');
    }

    return {
        conference,
        usersByOffice: await fetchAllUsersCached()
    };
}) satisfies PageServerLoad;
