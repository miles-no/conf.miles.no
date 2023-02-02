import { json } from '@sveltejs/kit';
import 'dotenv/config'
 
/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
  let shouldContinue = true;
  let dataTotal = [];
  let offset = 0;
  while(shouldContinue) {
    let url = `https://miles.cvpartner.com/api/v1/users?offset=${offset}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Token token=${process.env.CVPARTNER_API_KEY}`
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