import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
 
/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
  const authHeader = request.headers.get('Authorization');
  if(authHeader !== env.CONF_API_KEY) {
    return new Response(JSON.stringify({message: 'Invalid credentials'}), {status: 401});
  }
  const url = `https://miles.cvpartner.com/api/v1/countries`;
  const response = await fetch(url, {
  mode: 'same-origin',
  headers: {
      'Authorization': `Token token=${env.CVPARTNER_API_KEY}`
  }
  });
  const data = await response.json();
  let officesTotal = [];
  data.forEach(element => {
      const offices = element.offices.filter(c => c.name == 'Bergen' || c.Name == 'Oslo' || c.name == 'Stavanger' || c.name == 'Trondheim' || c.name == 'Ålesund').map((data) => {
          return {
              id: data._id,
              name: data.name,
              num_users: data.num_users
          }
      });
      officesTotal = [...officesTotal,...offices];
  });
  return json({
    total: officesTotal.length,
    offices: officesTotal
  });
}