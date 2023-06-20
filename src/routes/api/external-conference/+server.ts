import { json, type RequestHandler } from '@sveltejs/kit';
import type { IExternalConference } from '../../../model/external-conference.js';
import sanityClient from '@sanity/client';
import { env } from '$env/dynamic/private';

const client = sanityClient({
	// TODO: sanity projectid and dataset should not be public because they are not accessible on server side
	projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: env?.PUBLIC_SANITY_DATASET ?? 'production',
	token: env?.SANITY_TOKEN,
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
