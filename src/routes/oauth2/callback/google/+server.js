import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { redirect, error } from '@sveltejs/kit';
import { fetchUser } from '$lib/server/cvpartnerClient';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, cookies }) {
	const token = await getToken(url);
	const profileData = await getUserProfile(token.access_token);
	const cvpartnerData = await fetchUser(profileData.email);
	const authInfo = createAuthInfo(profileData, cvpartnerData, token);
	const state = url.searchParams.get('state');

	cookies.set('session', JSON.stringify(authInfo), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: authInfo.expires_in
	});
	
	throw redirect(307, state || '/');
}

const getToken = async (url) => {
	try {
		const authCode = url.searchParams.get('code');
		const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			body: JSON.stringify({
				client_id: env.GOOGLE_CLIENT_ID,
				client_secret: env.GOOGLE_CLIENT_SECRET,
				redirect_uri: `${env.ORIGIN}/oauth2/callback/google`,
				grant_type: 'authorization_code',
				code: authCode
			})
		});

		const data = await tokenResponse.json();

		if (data.error) {
			console.error(`GET Google token failed: ${data.error}`);
			throw error(401, 'Failed to login');
		}

		return data;
	} catch (err) {
		console.error(`GET Google token failed: ${err}`);
		throw error(401, 'Failed to login');
	}
};

const getUserProfile = async (accessToken) => {
	try {
		const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		return await profileResponse.json();
	} catch (err) {
		console.error(`GET User profile failed: ${err}`);
		throw error(500, 'Failed to get user profile');
	}
};

const createAuthInfo = (profileData, cvpartnerData, token) => {
	return {
		isAuthenticated: true,
		id: profileData.id,
		name: `${profileData.given_name} ${profileData.family_name}`,
		email: profileData.email,
		profileImage: profileData.picture,
		cvpartnerUserId: cvpartnerData ? cvpartnerData.id : undefined,
		cvpartnerOfficeId: cvpartnerData ? cvpartnerData.office : undefined,
		access_token: token.access_token,
		expires_in: token.expires_in,
		refresh_token: token.refresh_token,
		scope: token.scope,
		token_type: token.token_type,
		id_token: token.id_token
	};
};
