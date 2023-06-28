import {getUserFromCookie} from "$lib/server/auth";
import {redirect} from "@sveltejs/kit";
import type { PageServerLoad } from './$types';


export const prerender = false;

export interface IConferenceSlugPageLoadData {
}

export const load = (async ({ cookies }): Promise<IConferenceSlugPageLoadData> => {
    const user = getUserFromCookie(cookies.get('session'));

    if (!user.isAuthenticated) {
        throw redirect(307, '/login');
    }


    return {};
}) satisfies PageServerLoad;
