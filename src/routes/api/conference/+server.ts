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
		const conference = (await request.json()) as IConference;
		// imageUrl is not a part of conference schema and updating conference should not update its references to other schemas.
		const { imageUrl, performances, image, _createdAt, _updatedAt, _id, _rev, location, ...rest } =
			conference;

		await client
			.patch(conference._id)
			.set({
				...rest,
				slug: { _type: 'slug', current: conference.slug }
			})
			.commit();

		return json({ success: true });
	} catch (error) {
		const { token, ...rest } = client.config();

		console.error(`PUT /api/conference: ${error} ${JSON.stringify(rest)}`);
		return json({ success: false });
	}
}) satisfies RequestHandler;
