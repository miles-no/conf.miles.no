import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import type { UserAuthData } from '$lib/types/userAuthData';
import type { RefreshTokenResponse } from '$lib/types/refreshTokenResponse';

const THIRTY_MINUTES_IN_MS = 1000 * 60 * 30;

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('session');

	if (sessionCookie) {
		try {
			const session: UserAuthData = JSON.parse(sessionCookie);
			const timeUntilTokenExpires = session.token.expire_timestamp - new Date().getTime();

			if (!timeUntilTokenExpires) {
				console.log('Session token is defined, but Can not read expire time of session token. Deleting the token.');
				event.cookies.delete('session');
			}

			if (timeUntilTokenExpires < THIRTY_MINUTES_IN_MS) {
				console.log('Less than 30 minutes until token expires, refreshing it.');
				const refreshedToken = await refreshToken(session);
				const updatedToken = createUpdatedToken(session, refreshedToken);

				event.cookies.set('session', JSON.stringify(updatedToken), {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: !dev
				});
			}

			event.locals.user = session.user;
		} catch (err) {
			console.error(err);
		}
	}

	if (!sessionCookie && event.url.pathname.startsWith('/protected')) {
		throw redirect(307, '/login?redirect_uri=' + event.url.pathname);
	}

	return resolve(event);
};

const refreshToken = async ({ token }: UserAuthData): Promise<RefreshTokenResponse> => {
	try {
		const request = await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			body: JSON.stringify({
				client_id: env.GOOGLE_CLIENT_ID,
				client_secret: env.GOOGLE_CLIENT_SECRET,
				grant_type: 'refresh_token',
				refresh_token: token.refresh_token
			})
		});

		const response: RefreshTokenResponse = await request.json();

		return response;
	} catch (err) {
		console.error(`Failed to refresh token: ${err}`);
	}
	return Promise.reject();
};

const createUpdatedToken = (
	session: UserAuthData,
	refreshedToken: RefreshTokenResponse
): UserAuthData => {
	const expire_time = new Date().getTime() + refreshedToken.expires_in * 1000;
	return {
		user: session.user,
		token: {
			...session.token,
			access_token: refreshedToken.access_token,
			scope: refreshedToken.scope,
			token_type: refreshedToken.token_type,
			expire_timestamp: expire_time
		}
	};
};
