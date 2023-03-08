import sanityClient from '@sanity/client';
import { env } from '$env/dynamic/public';

export const client = sanityClient({
	projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: env?.PUBLIC_SANITY_DATASET ?? 'test',
	apiVersion: '2022-03-24',
	useCdn: false
});

export async function fetchSiteSettings(slug, konferanse) {
	const result = await client.fetch(
		/* groq */
		`
            {
            'settings': *[_type == 'siteSettings'][0] {
                ...,
                "siteLogo": siteLogo.asset->url
            }
            }
        `,
		{ slug, konferanse }
	);

	return {
		siteLogo: result.settings.siteLogo,
		siteName: result.settings.siteName
	};
}

export async function fetchConferences(user) {
	const officeId = user.cvpartnerOfficeId;
	let conferences = await client.fetch(/* groq */ `
        *[_type == "conference"] | order(endDate desc) {
            ...,
            "slug": slug.current,
            "imageUrl": image.asset->url,
        }
    `);
	if (!user.isAuthenticated) {
		// conferences = conferences.filter((c) => c.showExternally || !c.internal);
		conferences = conferences.filter((c) => c.showExternally);
	} else {
		conferences = conferences.filter(
			(c) => !c.visibleTo || c.visibleTo?.includes(officeId) || c.visibleTo?.length == 0
		);
	}
	return {
		conferences
	};
}

export async function fetchConference(slug) {
	const conference = await client.fetch(
		/* groq */ `
        *[
            _type == "conference" &&
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
	return {
		conference: conference
	};
}

export async function fetchConferencePerformance(konferanse, slug) {
	const conference = await client.fetch(
		/* groq */ `
            *[
        _type == "conference" &&
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
