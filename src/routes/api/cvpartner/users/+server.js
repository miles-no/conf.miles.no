import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { fetchUsers } from '$lib/server/cvpartnerClient';
 
/** @type {import('./$types').RequestHandler} */
export async function GET({ request, url }) {
  const authHeader = request.headers.get('Authorization');
  if(authHeader !== env.CONF_API_KEY) {
    return new Response(JSON.stringify({message: 'Invalid credentials'}), {status: 401});
  }
  const officeId = url.searchParams.get('officeid');
  const data = await fetchUsers(officeId)
  return json({
    total: data.length,
    data
  });
}