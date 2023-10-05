import {getUserFromCookie} from "$lib/server/auth";
import {redirect} from "@sveltejs/kit";
import {fetchAllUsersCached, type UsersByOffice} from "$lib/server/cvpartnerClient";
import type { PageServerLoad } from "../$types";


export const prerender = false;

export interface UsersByOfficeData {
    usersByOffice: UsersByOffice,
	user: {email: string, name: string}
}

export const load = (async ({ cookies, url }): Promise<UsersByOfficeData> => {
    const user = getUserFromCookie(cookies.get('session'));

    if (!user.isAuthenticated) {
        throw redirect(307, '/login?redirect_uri=' + url.pathname);
    }

    return {
		usersByOffice: await fetchAllUsersCached(),
	    user: {name: user.name, email: user.email}
	};
}) satisfies PageServerLoad;
