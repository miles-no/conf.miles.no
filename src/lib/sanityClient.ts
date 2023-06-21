import sanityClient from '@sanity/client';
import { env } from '$env/dynamic/public';
import type { IConference } from '../model/conference';
import type { IEvent } from '../model/event';
import type { User } from './types/user';

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

export async function fetchEvents(user: User): Promise<IEvent[]> {
	let events = await client.fetch(/* groq */ `
        *[_type == "event"] | order(endDate desc) {
            ...,
            "slug": slug.current,
            "imageUrl": image.asset->url,
        }
    `);

	if (!user.isAuthenticated) {
		events = events.filter((e: IEvent) => e.showExternally);
	}

	return events;
}

export async function fetchConferences(): Promise<IConference[]> {
	return await client.fetch(/* groq */ `
        *[_type == "conference"] | order(startDate desc) {
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
}

export async function fetchEvent(slug: string): Promise<IEvent> {
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

export async function fetchEventPerformance(eventSlug: string, performanceSlug: string) {
	return await client.fetch(
		/* groq */ `
        *[
        _type == "event" &&
        slug.current == $eventSlug
        ][0] {
        ...,
        "slug": slug.current,
        "performances": performances[submission->slug.current match $performanceSlug][]{
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
		{ eventSlug, performanceSlug }
	);
}

export async function fetchConferencePerformance(conferenceSlug: string, performanceSlug: string) {
	return await client.fetch(
		/* groq */ `
            *[
        _type == "conference" &&
        slug.current == $conferenceSlug
        ][0] {
        ...,
        "slug": slug.current,
        "performances": performances[submission->slug.current match $performanceSlug][]{
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
		{ conferenceSlug, performanceSlug }
	);
}
