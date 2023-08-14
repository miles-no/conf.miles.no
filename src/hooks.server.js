import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');
    if(!session && event.url.pathname.startsWith('/protected')) {
        throw redirect(307, '/login?redirect_uri=' + url.pathname);
    }

    if(session) {
        const currentUser = JSON.parse(session);
        if (currentUser) {
            event.locals.user = currentUser;
        }
    }
    return resolve(event);
};