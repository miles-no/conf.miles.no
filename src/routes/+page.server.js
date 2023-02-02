import client from '../sanityClient';

let allConferencesLoaded = false;
export async function load() {
    const conferences = await client.fetch(/* groq */ `
        *[_type == "conference"] | order(endDate desc) {
            ...,
            "slug": slug.current,
            "imageUrl": image.asset->url,
        }
    `);

    if (!conferences) {
        return {
            status: 404
        };
    }
    allConferencesLoaded = true;
    return {
        conferences: conferences
    };
}