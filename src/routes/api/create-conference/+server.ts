import { json, type RequestHandler } from '@sveltejs/kit';
import { createConference } from '$lib/server/sanityClient';
import { Conference } from '$lib/types/conference';
import type { ConferenceType } from '$lib/types/conference';

import sanityClient from '@sanity/client';
import { env } from '$env/dynamic/private';
import { formatDateYYYYMMDD } from '../../../utils/date-time-utils';

const client = sanityClient({
	projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
	dataset: env?.PUBLIC_SANITY_DATASET ?? 'production',
	token: env?.SANITY_TOKEN,
	apiVersion: '2022-03-24',
	useCdn: false
});

const CONFERENCE_TYPE = 'conference';

const urlStartPattern = /^https?:\/\//;

const verifyAndNormalizeConferenceData = (confData: ConferenceType) => {
	if (!urlStartPattern.test(confData.url)) {
		confData.url = 'https://' + confData.url;
	}

	Conference.safeParse(confData);

	const now = formatDateYYYYMMDD(new Date()) as string;
	if (confData.startDate < now || confData.endDate < now) {
		throw Error("Start or end date can't be in the past");
	}
    if (confData.endDate < confData.startDate) {
        throw Error("Start date can't be after End date");
    }
    if (!!confData.callForPapersDate && confData.endDate < confData.callForPapersDate) {
        throw Error("Call-for-papers date can't be after End date");
    }
};

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

/*
Consider moving to frontend?

// https://dmitripavlutin.com/timeout-fetch-request/
 */
const fetchWithTimeout = async (url: string, options = {}) => {
	const timeout = 10000;
	const controller = new AbortController();
	const id = setTimeout(() => {
		console.warn('Conference-URL-checking request timed out: ' + url);
		controller.abort();
	}, timeout);

	const response = await fetch(url, {
		...options,
		signal: controller.signal
	});
	clearTimeout(id);

	return response;
};

const verifyConferenceUrl = async (url: string) => {
	let checkResult;
	try {
		checkResult = await fetchWithTimeout(url, { method: 'HEAD' });

		if (checkResult.ok) {
			return undefined;
		}
		console.warn(`Conference url (${url}) failed check: not .ok`);
		console.warn('    status:    ', await checkResult.status);
		console.warn('    statusText:', await checkResult.statusText);
		console.warn('    headers:   ', await checkResult.headers, '\n');
		return `Couldn't reach the conference URL: ${url}`;
	} catch (e) {
		console.log(e);
		return `Couldn't reach the conference URL: ${url}`;
	}
};

// /api/conference PUT
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
			statusText: 'Error when storing new conference. See server log for details.'
		});
	}

}) satisfies RequestHandler;
