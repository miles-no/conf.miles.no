import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { redirect, error } from '@sveltejs/kit';
import { fetchUser } from '$lib/server/cvpartnerClient';
import type { User } from '$lib/types/user.js';
import type { TokenResponse } from '$lib/types/tokenSchema.js';
import type { UserProfileResponse } from '$lib/types/userProfileResponse.js';
import type { UserAuthData } from '$lib/types/userAuthData.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, cookies }) {
	const token = await getToken(url);
	const profileData = await getUserProfile(token.access_token);
	const user = await fetchUser(profileData.email);
	const authInfo = createAuthInfo(user, token);
	const state = url.searchParams.get('state');

	cookies.set('session', JSON.stringify(authInfo), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev
	});

	throw redirect(307, state || '/');
}

const getToken = async (url: URL): Promise<TokenResponse> => {
	try {
		const authCode = url.searchParams.get('code');
		const request = await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			body: JSON.stringify({
				client_id: env.GOOGLE_CLIENT_ID,
				client_secret: env.GOOGLE_CLIENT_SECRET,
				redirect_uri: `${env.ORIGIN}/oauth2/callback/google`,
				grant_type: 'authorization_code',
				code: authCode
			})
		});

		const response: TokenResponse = await request.json();

		return response;
	} catch (err) {
		console.error(`GET Google token failed: ${err}`);
		throw error(401, 'Failed to login');
	}
};

const getUserProfile = async (accessToken: string): Promise<UserProfileResponse> => {
	try {
		const request = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		const response: UserProfileResponse = await request.json();

		return response;
	} catch (err) {
		console.error(`GET User profile failed: ${err}`);
		throw error(500, 'Failed to get user profile');
	}
};

const createAuthInfo = (user: User, token: TokenResponse): UserAuthData => {
	const expire_time = new Date().getTime() + token.expires_in * 1000;
	return {
		user,
		token: {
			access_token: token.access_token,
			refresh_token: token.refresh_token,
			scope: token.scope,
			token_type: token.token_type,
			expire_timestamp: expire_time
		}
	};
};
