import client from '../../../../../sanityClient';

export async function load({ params }) {
    const { konferanse, slug } = params;

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

    if (!conference || !conference.performance) {
        return {
            status: 404
        };
    }

    return {
        conference,
        performance: conference.performance,
        submission: conference.performance.submission
    };
}