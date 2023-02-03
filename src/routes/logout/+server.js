import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies }) {
    await cookies.delete('session');
    throw redirect(307, "/");
}