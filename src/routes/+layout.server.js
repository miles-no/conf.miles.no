import client from '../sanityClient';

export async function load({ params }) {
    const { slug = '', konferanse = '' } = params;
    const result = await client.fetch(/* groq */ 
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

    if (!result) {
        return {
            status: 404
        };
    }

    return {
        settings: {
            siteLogo: result.settings.siteLogo,
            siteName: result.settings.siteName
        }
    };
}