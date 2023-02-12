import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { fetchOffices } from '$lib/server/cvpartnerClient';
 
/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
  const authHeader = request.headers.get('Authorization');
  if(authHeader !== env.CONF_API_KEY) {
    return new Response(JSON.stringify({message: 'Invalid credentials'}), {status: 401});
  }
  const officesTotal = await fetchOffices();
  return json({
    total: officesTotal.length,
    offices: officesTotal
  });
}