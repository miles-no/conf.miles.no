import * as queryString from 'query-string';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
 
// /** @type {import('./$types').LayoutServerLoad} */
// export function load({ locals }) {
/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    const stringifiedParams = queryString.stringify({
        client_id: env.GOOGLE_CLIENT_ID,
        redirect_uri: 'http://localhost:3000/oauth2/callback/google',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '),
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent'
    });
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    throw redirect(307, googleLoginUrl);
}