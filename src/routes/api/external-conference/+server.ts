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

export const POST = (async ({ request }) => {
	const externalConference = (await request.json()) as IExternalConference;
	const res = await client
		.patch(externalConference._id)
		.set({ ...externalConference, slug: { _type: 'slug', current: externalConference.slug } })
		.commit();

	return json({ id: res._id }, { status: 201 });
}) satisfies RequestHandler;
