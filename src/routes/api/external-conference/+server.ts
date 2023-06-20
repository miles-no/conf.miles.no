import { json, type RequestHandler } from '@sveltejs/kit';
import type { IExternalConference } from '../../../model/external-conference.js';
import { env } from '$env/dynamic/private';

import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: env.PUBLIC_SANITY_PROJECTID,
	dataset: env.PUBLIC_SANITY_DATASET,
	token: env.SANITY_TOKEN,
	apiVersion: '2022-03-24',
	useCdn: false
});

// /api/external-conference PUT
export const PUT = (async ({ request }) => {
	try {
		const externalConference = (await request.json()) as IExternalConference;
		// imageUrl is not a part of external conference schema and updating external conference should not update its references to other schemas.
		const { imageUrl, performances, image, _createdAt, _updatedAt, _id, _rev, location, ...rest } =
			externalConference;

		await client
			.patch(externalConference._id)
			.set({
				...rest,
				slug: { _type: 'slug', current: externalConference.slug }
			})
			.commit();

		return json({ success: true });
	} catch (error) {
		const { token, ...rest } = client.config();

		console.error(`PUT /api/external-conference: ${error} ${JSON.stringify(rest)}`);
		return json({ success: false });
	}
}) satisfies RequestHandler;
