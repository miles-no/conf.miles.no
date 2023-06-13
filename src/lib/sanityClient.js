import sanityClient from '@sanity/client';
import { env } from '$env/dynamic/public';

export const client = sanityClient({
	projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: env?.PUBLIC_SANITY_DATASET ?? 'test',
	apiVersion: '2022-03-24',
	useCdn: false
});

export async function fetchSiteSettings() {
	const result = await client.fetch(
		/* groq */
		`
            {
            'settings': *[_type == 'siteSettings'][0] {
                ...,
                "siteLogo": siteLogo.asset->url
            }
            }
        `
	);

	return {
		siteLogo: result.settings.siteLogo,
		siteName: result.settings.siteName
	};
}

export async function fetchEvents(user) {
	let events = await client.fetch(/* groq */ `
        *[_type == "event"] | order(endDate desc) {
            ...,
            "slug": slug.current,
            "imageUrl": image.asset->url,
        }
    `);

	if (!user.isAuthenticated) {
		events = events.filter((c) => c.showExternally);
	}

	return events;
}

export async function fetchExternalConferences() {
	let externalConferences = await client.fetch(/* groq */ `
        *[_type == "externalConference"] | order(startDate desc) {
            ...,
            "slug": slug.current,
            "imageUrl": image.asset->url,
            performances[] | order(dateAndTime asc)
            {...,
                submission->{
                    ...,
                    "slug": slug.current,
                    authors[]->{
                        ...,
                        "imageUrl": image.asset->url
                    }
                }
            }
        }
    `);

	return {
		externalConferences
	};
}

export async function fetchEvent(slug) {
	return await client.fetch(
		/* groq */ `
        *[
            _type == "event" &&
            slug.current == $slug
        ][0] {
            ...,
            "slug": slug.current,
            "imageUrl": image.asset->url,
            performances[]{
                dateAndTime,
                location,
                performanceUrls,
                submission->{..., "slug": slug.current, authors[]->{..., "imageUrl": image.asset->url}}
            }
        }
    `,
		{ slug }
	);
}

export async function fetchEventPerformance(event, slug) {
	return await client.fetch(
		/* groq */ `
            *[
        _type == "event" &&
        slug.current == $event
        ][0] {
        ...,
        "slug": slug.current,
        "performance": performances[submission->slug.current match $slug][0]{
            dateAndTime,
            location,
            performanceUrls,
            submission->{
            ...,
            "slug": slug.current,
            authors[]->{
                ...,
                "imageUrl": image.asset->url,
                "socials": [
                { "type": 'facebook', "handle": facebook },
                { "type": 'twitter', "handle": twitter },
                { "type": 'linkedin', "handle": linkedin },
                { "type": 'instagram', "handle": instagram },
                { "type": 'email', "handle": email }
                ]
            }
            }
        }
        }
        `,
		{ event, slug }
	);
}

export async function fetchExternalConferencePerformance(konferanse, slug) {
	const conference = await client.fetch(
		/* groq */ `
            *[
        _type == "externalConference" &&
        slug.current == $konferanse
        ][0] {
        ...,
        "slug": slug.current,
        "performance": performances[submission->slug.current match $slug][0]{
            dateAndTime,
            location,
            performanceUrls,
            submission->{
            ...,
            "slug": slug.current,
            authors[]->{
                ...,
                "imageUrl": image.asset->url,
                "socials": [
                { "type": 'facebook', "handle": facebook },
                { "type": 'twitter', "handle": twitter },
                { "type": 'linkedin', "handle": linkedin },
                { "type": 'instagram', "handle": instagram },
                { "type": 'email', "handle": email }
                ]
            }
            }
        }
        }
        `,
		{ konferanse, slug }
	);
	return {
		conference: conference
	};
}
