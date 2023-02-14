import type { Actions } from './$types';
// @ts-ignore
import { createAuthor, createSubmission } from '$lib/server/sanityClient';
// @ts-ignore
import { fetchUser, fetchUserById, fetchCv } from '$lib/server/cvpartnerClient';

export const prerender = false;
export const ssr = true;
export const csr = true;

/** @type {import('./$types').Actions} */
export const actions = {
    // @ts-ignore
    create: async ({request}) => {
        // const data = await request.formData();
        // const email = data.get('email');
        // const userEmail = await fetchUser(email);
        // const user = await fetchUserById(userEmail.userid);
        // const cv = await fetchCv(userEmail.userid, user.cvid);
        // const authorDoc = {
        //     name: user.name,
        //     email: email,
        //     bio: cv.bio,
        //     image: user.image,
        //     twitter: '',
        //     instagram: '',
        //     facebook: '',
        //     linkedin: ''
        // };
        // const author = await createAuthor(authorDoc);
        // const submissionDoc = {
        //     title: data.get('title'),
        //     submissionType: data.get('type'),
        //     description: data.get('description'),
        //     duration: data.get('duration'),
        //     keywords: [ 'Test' ]
        // };
        // const submission = await createSubmission(submissionDoc, [author]);
        return {
            success: true
        }
    }
  } satisfies Actions;