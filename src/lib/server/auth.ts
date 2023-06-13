import type { User } from "$lib/types/user";

export function getUserFromCookie(user: any): User {
    if(!user) {
        return {
            isAuthenticated: false
        }
    }

    return JSON.parse(user);
}