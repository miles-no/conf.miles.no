import { json, type RequestHandler } from '@sveltejs/kit';
import type { IConference } from '../../../model/conference.js';
import { updateConference } from '$lib/server/sanityClient';

// /api/conference PUT
export const PUT = (async ({ request }) => {
	try {
		const conference = (await request.json()) as IConference;
		await updateConference(conference);

		return json({ success: true });
	} catch (error) {
		console.error(`PUT /api/external-conference: ${error}`);
		return json({ success: false });
	}
}) satisfies RequestHandler;
