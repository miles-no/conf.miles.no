import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { fetchUser } from '$lib/server/cvpartnerClient';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, cookies }) {
  const authCode = url.searchParams.get('code');
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: JSON.stringify({
          client_id: env.GOOGLE_CLIENT_ID,
          client_secret: env.GOOGLE_CLIENT_SECRET,
          redirect_uri: `${env.ORIGIN}/oauth2/callback/google`,
          grant_type: 'authorization_code',
          code: authCode,
      })
  });
  const test = JSON.stringify({
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${env.ORIGIN}/oauth2/callback/google`,
    grant_type: 'authorization_code',
    code: authCode,
});
  const data = await tokenResponse.json();
  if(data.error) {
    console.error(data.error);
    throw redirect(307, '/');
  } else {
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
    });
    const profileData = await profileResponse.json();
    const cvpartner = await fetchUser(profileData.email);
    const authInfo = {
      isAuthenticated: true,
      id: profileData.id,
      name: `${profileData.given_name} ${profileData.family_name}`,
      email: profileData.email,
      profileImage: profileData.picture,
      cvpartnerUserId: cvpartner.userid,
      cvpartnerOfficeId: cvpartner.officeid,
      access_token: data.access_token,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token,
      scope: data.scope,
      token_type: data.token_type,
      id_token: data.id_token
    };
    cookies.set('session', JSON.stringify(authInfo), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: !dev,
        maxAge: authInfo.expires_in
    });
    throw redirect(307, '/');
  }
}