import { json, type RequestHandler } from '@sveltejs/kit';
import type { IExternalConference } from '../../../model/external-conference.js';
import { updateExternalConference } from '$lib/server/sanityClient.ts';

// /api/external-conference PUT
export const PUT = (async ({ request }) => {
	try {
		const externalConference = (await request.json()) as IExternalConference;
		await updateExternalConference(externalConference);

		return json({ success: true });
	} catch (error) {
		console.error(`PUT /api/external-conference: ${error}`);
		return json({ success: false });
	}
}) satisfies RequestHandler;
