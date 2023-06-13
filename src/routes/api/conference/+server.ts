import { json, type RequestHandler } from '@sveltejs/kit';
import type { IConference } from '../../../model/conference.js';
import { env } from '$env/dynamic/private';
import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: env?.PUBLIC_SANITY_DATASET ?? 'test',
	token: env?.SANITY_TOKEN,
	apiVersion: '2022-03-24',
	useCdn: false
});

// /api/conference PUT
export const PUT = (async ({ request }) => {
	try {
		const conferenceToBeUpdated = (await request.json()) as IConference;

		// imageUrl is not a part of external conference schema and updating external conference should not update its references to other schemas.
		const { imageUrl, performances, ...rest } = conferenceToBeUpdated;

		await client
			.patch(conferenceToBeUpdated._id)
			.set({
				...rest,
				slug: { _type: 'slug', current: conferenceToBeUpdated.slug }
			})
			.commit();

		return json({ success: true });
	} catch (error) {
		console.error(`PUT /api/conference: ${error}`);
		return json({ success: false });
	}
}) satisfies RequestHandler;
