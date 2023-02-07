import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
 
/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
  const authHeader = request.headers.get('Authorization');
  if(authHeader !== env.CONF_API_KEY) {
    return new Response(JSON.stringify({message: 'Invalid credentials'}), {status: 401});
  }
  let shouldContinue = true;
  let dataTotal = [];
  let offset = 0;
  while(shouldContinue) {
    let url = `https://miles.cvpartner.com/api/v1/users?offset=${offset}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Token token=${env.CVPARTNER_API_KEY}`
      }
    });
    const data = await response.json();
    if(data.length == 0) {
      shouldContinue = false;
    } else {
      dataTotal = [...dataTotal,...data];
      offset += 100;
    }
  }
  const users = dataTotal.map((cvusers) => {
    return {
      id: cvusers.user_id,
      email: cvusers.email,
      name: cvusers.name,
      profileImage: cvusers.image.url,
      office: cvusers.office_name
    }
  });
  return json({
    total: users.length,
    users
  });
}