import queryString from 'query-string';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const orgUrl = url.searchParams.get('originalUrl');
	const stringifiedParams = queryString.stringify({
		client_id: env.GOOGLE_CLIENT_ID,
		redirect_uri: `${env.ORIGIN}/oauth2/callback/google`,
		scope: [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
		].join(' '),
		response_type: 'code',
		access_type: 'offline',
		prompt: 'consent',
		state: orgUrl
	});
	const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
	throw redirect(307, googleLoginUrl);
}
