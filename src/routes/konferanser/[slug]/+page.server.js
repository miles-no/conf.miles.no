import client from '../../../sanityClient';

export async function load({ params }) {
    const { slug } = params;

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

    if (!conference) {
        return {
            status: 404
        };
    }

    return {
        conference
    };
}