import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

import { createConference } from '$lib/server/sanityClient';
import type { ConferenceType } from '$lib/types/conference';

import sanityClient from '@sanity/client';
import { env } from '$env/dynamic/private';
import {verifyAndNormalizeConferenceData, verifyConferenceUrl} from "../../../utils/conference-utils";

const client = sanityClient({
	projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: env?.PUBLIC_SANITY_DATASET ?? 'production',
	token: env?.SANITY_TOKEN,
	apiVersion: '2022-03-24',
	useCdn: false
});

const CONFERENCE_TYPE = 'conference';

const verifyConferenceIsNew = async (title: string, startDate: string) => {
	const duplicateResults = await client.fetch(
		`*[_type == "${CONFERENCE_TYPE}" && title == "${title}" && startDate == "${startDate}"]`
	);
	if (duplicateResults && duplicateResults.length) {
		console.error('Duplicate title-and-startdate conferences:', JSON.stringify(duplicateResults));
		throw Error('Conference with this title and start date already exists.');
	}

	const possibleDupeResults = await client.fetch(
		`*[_type == "${CONFERENCE_TYPE}" && title == "${title}"]`
	);
	if (!possibleDupeResults || possibleDupeResults.length < 1) {
		return undefined;
	}

	console.warn('Possibly duplicated conferences:', JSON.stringify(possibleDupeResults));
	const now = new Date(new Date().toDateString());
	const likelyDupeResults = possibleDupeResults.filter((result: { endDate: string }, i: number) => {
		const endDate = new Date(result?.endDate);
		return endDate > now;
	});

	return likelyDupeResults.length
		? likelyDupeResults.length +
				' current or future conference(s) already registered with this title (' +
				title +
				'). For example, found it in the timespan ' +
				likelyDupeResults[0].startDate +
				' - ' +
				likelyDupeResults[0].endDate +
				'.'
		: undefined;
};

// /api/conference POST
export const POST = (async ({ request }) => {
	/* Request:
        {
            title: string
            startDate: string,
            endDate: string,
            categoryTag?: ConferenceCategoryType[],
            signupLink: string
        }

        // Generated:
        {
            slug: ???,
            _createdAt
            _updatedAt
            _rev
            _id
        }

        // Known and must be supplied:
        {
            internal: false,
            _type: 'conference'
        }

        // From "legg til mer info" (should be optional? How to handle this missing info?):
        {
            description: IDescription[],
            location?: string[],
            performances: IPerformance[],
            deadline: string, but more???

            where is price ???
        }

        // Wat? Not optional but not apparently part of the fields either?
        {
            showExternally: boolean,
            timeperiod: string,
            startTime: string,
            imageUrl: string,
            eventType: EventType[],
            visibleTo: string[],
            startTime: string,
        }

        // Optional:
        {
            image?: IImage,
            itinerary?: IItinerary[],
            employees?: IEmployee[]
        }
    */

	let newConference;
	let warnings = [];
	try {
		newConference = (await request.json()) as ConferenceType;

		verifyAndNormalizeConferenceData(newConference);
		warnings.push(
			await verifyConferenceIsNew(newConference.title, newConference.startDate)
		);
		warnings.push(await verifyConferenceUrl(newConference.url));
		warnings = warnings.filter((w) => !!w);
	} catch (userError: any) {
		console.error(`POST /api/create-conference: ${userError} (${typeof userError})`);
		console.log('UserError.keys:', JSON.stringify(Object.keys((userError || {}).issues || {})));

		const errorMessage = userError?.issues
			? `Conference data error(s): '${userError.issues
					.map((issue: { message: string }) => issue.message)
					.join("', '")}'`
			: userError.message;

		return json({
			success: false,
			ok: false,
			status: 400,
			statusText: errorMessage
		});
	}

	try {
		const slug = await createConference(newConference, CONFERENCE_TYPE);

		if (warnings && warnings.length) {
			console.warn(
				`POST /api/create-conference completed with ${
					warnings.length
				} warning(s): '${warnings.join("', '")}'`
			);
			return json({
				success: true,
				ok: true,
				statusText: `Completed with ${warnings.length} warning(s)`,
				slug,
				warnings
			});
		} else {
			return json({
				success: true,
				ok: true,
				slug,
				statusText: 'OK'
			});
		}
	} catch (error) {
		console.error(`POST /api/create-conference: ${error}`);
		return json({
			success: false,
			ok: false,
			status: 500,
			statusText: 'Error when storing new conference. See server log for details.',
        /*error: {
                message: ('undefined' !== typeof error?.message) ? error?.message : undefined,
                stack: "Stack :" + error.stack
            }*/
		});
	}

}) satisfies RequestHandler;
