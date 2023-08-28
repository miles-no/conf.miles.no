import {getUserFromCookie} from "$lib/server/auth";
import {redirect} from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import {fetchAllUsersCached, type UsersByOffice} from "$lib/server/cvpartnerClient";


export const prerender = false;

export interface UsersByOfficeData {
    usersByOffice: UsersByOffice
}

export const load = (async ({ cookies, url }): Promise<UsersByOfficeData> => {
    const user = getUserFromCookie(cookies.get('session'));

    if (!user.isAuthenticated) {
        throw redirect(307, '/login?redirect_uri=' + url.pathname);
    }

    return {usersByOffice: await fetchAllUsersCached()};
}) satisfies PageServerLoad;
