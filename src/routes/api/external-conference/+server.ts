import { json, type RequestHandler } from '@sveltejs/kit';
import type { IExternalConference } from '../../../model/external-conference.js';
import { env } from '$env/dynamic/private';
import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: env?.PUBLIC_SANITY_DATASET ?? 'test',
	token: env?.SANITY_TOKEN,
	apiVersion: '2022-03-24',
	useCdn: false
});

// /api/external-conference PUT
export const PUT = (async ({ request }) => {
	try {
		const externalConference = (await request.json()) as IExternalConference;
		await client
			.patch(externalConference._id)
			.set({ ...externalConference, slug: { _type: 'slug', current: externalConference.slug } })
			.commit();

		return json({ success: true });
	} catch (error) {
		console.error(`/api/external-conference: ${error}`);
		return json({ success: false });
	}
}) satisfies RequestHandler;
