import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { fetchOffices, fetchUsers } from '$lib/server/cvpartnerClient';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, url }) {
	const authHeader = request.headers.get('Authorization');
	if (authHeader !== env.CONF_API_KEY) {
		return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
	}

	const officeIds = await fetchOffices();

	const data = await fetchUsers(officeIds);
	return json({
		total: data.length,
		users: data
	});
}
