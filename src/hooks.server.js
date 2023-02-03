export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');
    // if (!session && !unProtectedRoutes.includes(event.url.pathname))
    //     return redirect('/login', 'No authenticated user.');

    if(session) {
        const currentUser = JSON.parse(session);
        console.log(currentUser);

        if (currentUser) {
            event.locals.user = currentUser;
        }
    }
    return resolve(event);
};