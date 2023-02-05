import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    const protectedRoutes = [
        '/protected'
    ];
    const session = event.cookies.get('session');
    if(!session && protectedRoutes.includes(event.url.pathname)) {
        throw redirect(307, '/login');
    }

    if(session) {
        const currentUser = JSON.parse(session);
        if (currentUser) {
            event.locals.user = currentUser;
        }
    }
    return resolve(event);
};