import { env } from '$env/dynamic/private';
import { fetchExternalConferences } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import sanityClient from '@sanity/client';
import { v4 as uuidv4 } from 'uuid';

export const prerender = false;

const client = sanityClient({
	projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: env?.PUBLIC_SANITY_DATASET ?? 'test',
	token: env?.SANITY_TOKEN,
	apiVersion: '2022-03-24',
	useCdn: false
});

export async function load({ cookies }) {
	const user = getUserFromCookie(cookies.get('session'));
	const externalConferences = await fetchExternalConferences(user);

	if (!externalConferences) {
		return {
			status: 404
		};
	}
	return {
		user: user,
		externalConferences: externalConferences.externalConferences
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	updateStatus: async ({ cookies, request }) => {
		const user = getUserFromCookie(cookies.get('session'));
		const data = await request.formData();
		const status = data.get('status');
		const conferenceId = data.get('conferenceId');
		console.log(data);

		if (conferenceId) {
			addAttendee(conferenceId, user.email, status);
		}
		return { success: true };
	}
};

async function addAttendee(conferenceId, email, status) {
	try {
		const conference = await client.getDocument(conferenceId);
		const employeeList = conference.employees || [];
		const existingAttendee = employeeList.find((attendee) => attendee.email === email);
		let updatedConference;
		if (existingAttendee && existingAttendee.status !== status) {
			const updatedAttendees = conference.employees.map((attendee) => {
				if (attendee.email === email) {
					return {
						...attendee,
						status
					};
				}
			});
			updatedConference = {
				...conference,
				employees: updatedAttendees
			};
		} else if (!existingAttendee) {
			console.log(status);
			updatedConference = {
				...conference,
				employees: [
					...employeeList,
					{
						email: email,
						status: status,
						_key: uuidv4()
					}
				]
			};
		}

		await client.patch(conferenceId).set(updatedConference).commit();
		return { success: true };
	} catch (err) {
		console.log(err);
	}
}
