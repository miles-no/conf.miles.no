//import * as queryString from 'query-string';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
 
/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    //const stringifiedParams = queryString.stringify({
    //    client_id: env.GOOGLE_CLIENT_ID,
    //    redirect_uri: `${env.ORIGIN}/oauth2/callback/google`,
    //    scope: [
    //        'https://www.googleapis.com/auth/userinfo.email',
    //        'https://www.googleapis.com/auth/userinfo.profile',
    //    ].join(' '),
    //    response_type: 'code',
    //    access_type: 'offline',
    //    prompt: 'consent'
    //});
    //const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    const redirectUri = `${env.ORIGIN}/oauth2/callback/google`;
    const scope = scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ')
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`;
    throw redirect(307, googleLoginUrl);
}
