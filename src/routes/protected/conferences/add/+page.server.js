// import { fetchConferences } from '$lib/sanityClient';
import { createConference } from '$lib/server/sanityClient';

export const prerender = false;
export const ssr = true;
export const csr = false;

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({request}) => {
        const data = await request.formData();
        const conferemceDoc = {
            title: data.get('inputTitle'),
            slug: data.get('inputSlug'),
            startDate: data.get('inputStartDate'),
            endDate: data.get('inputEndDate'),
            internal: data.get('inputInternal'),
            url: data.get('inputUrl')
        };
        const imgDoc = {
            file: data.get('inputImage'),
            alt: data.get('inputAlttext')
        };
        console.log(conferemceDoc);
        console.log(imgDoc);
    }
  };