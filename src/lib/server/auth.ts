import type { User } from "$lib/types/user";
import type { UserAuthData } from "$lib/types/userAuthData";

export function getUserFromCookie(cookie: string): User {
    if (!cookie) {
        return {
            isAuthenticated: false
        }
    }
    const userAuthData: UserAuthData = JSON.parse(cookie);
    return userAuthData.user;
}