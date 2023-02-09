export function getUserFromCookie(user) {
    if(!user) {
        return {
            isAuthenticated: false
        }
    }

    return JSON.parse(user);
}