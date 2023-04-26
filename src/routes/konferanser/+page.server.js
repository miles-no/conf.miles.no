import { env } from '$env/dynamic/public';
import { SANITY_TOKEN } from '$env/static/private';
import {  fetchExternalConferences, } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import sanityClient from '@sanity/client';

let allConferencesLoaded = false;
export async function load({ cookies }) {
	const user = getUserFromCookie(cookies.get('session'));
	const externalConferences = await fetchExternalConferences(user);

	const client = sanityClient({
		projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
		dataset: env?.PUBLIC_SANITY_DATASET ?? 'test',
		apiVersion: '2022-03-24',
		token: SANITY_TOKEN,
		useCdn: false
	  });
	  
	const updateStatus = (conferenceId, userEmail) =>{
		client
		.patch(conferenceId)
		.append("attending", [userEmail])
		.commit()
		.then((updatedDoc) => {
		  console.log('Element added successfully:', updatedDoc);
		})
		.catch((error) => {
		  console.error('Error adding element:', error);
		});
		
	} 
	if ( !externalConferences) {
		return {
			status: 404
		};
	}
	allConferencesLoaded = true;
	return {
		user: user,
		externalConferences: externalConferences.externalConferences,
		updateStatus: updateStatus
	};
}
