import sanityClient from '@sanity/client';
import { SANITY_TOKEN } from '$env/static/private';

const client = sanityClient({
  projectId: 'mhv8s2ia',
  dataset: 'production',
  apiVersion: "2022-03-24",
  useCdn: false,
  token: SANITY_TOKEN,
});

export function createConference(body) {
    const doc = {
        _type: 'conference',
        title: body.title,
        slug: body.slug,
        startDate: body.startDate,
        endDate: body.endDate,
        internal: body.internal,
        url: body.url
    }
    client.create(doc).then((response) => {
        return {
            success: true,
            id: response._id
        }
    })
}