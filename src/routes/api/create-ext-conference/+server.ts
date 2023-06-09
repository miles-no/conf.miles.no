import {json, type RequestHandler} from '@sveltejs/kit';
import {createConference} from "$lib/server/sanityClient";
import {Conference} from "$lib/types/conference";
import type { ConferenceType} from "$lib/types/conference";

import sanityClient from "@sanity/client";
import {env} from "$env/dynamic/private";

const client = sanityClient({
    projectId: env?.PUBLIC_SANITY_PROJECTID ?? 'mhv8s2ia',
    dataset: env?.PUBLIC_SANITY_DATASET ?? 'test',
    token: env?.SANITY_TOKEN,
    apiVersion: '2022-03-24',
    useCdn: false
});

const verifyAndNormalizeConferenceData = (confData: ConferenceType) => {
    Conference.parse(confData);

    // Normalize dates (without time-of-day for external conferences), simplifies is-new check
    // TODO: Verify it's actually unimportant according to figma sketches?
    const startDate = new Date(new Date(confData.startDate).toDateString());
    const endDate = new Date(new Date(confData.endDate).toDateString());
    const now = new Date(new Date().toDateString());

    if (startDate<now || endDate<now) {
        throw Error("Start or end date can't be in the past");
    }
    if (endDate < startDate) {
        throw Error("End date can't be before start date");
    }

    confData.startDate = startDate.toString()
    confData.endDate = endDate.toString()
}

const verifyConferenceIsNew = async (title: string, startDate: string) => {
    const duplicateResults = await client.fetch(`*[_type == "conference" && title == "${title}" && startDate == "${startDate}"]`);
    if (duplicateResults && duplicateResults.length > 0) {
        throw Error("Conference with this title and start date already exists.");
    }

    const possibleDupeResults = await client.fetch(`*[_type == "conference" && title == "${title}"]`);
    if (!possibleDupeResults || possibleDupeResults.length < 1) {
        return undefined;
    }

    const now = new Date(new Date().toDateString());
    const likelyDupeResults = possibleDupeResults.filter((result, i) => {
        console.log("#",i,":", JSON.stringify(result, null, 2));
        const endDate = new Date(result.endDate);
        return (endDate > now);
    })

    return (likelyDupeResults.length)
         ? (likelyDupeResults.length + " current or future conference(s) already registered with the title '" + title + "' (for example in the timespan " + likelyDupeResults[0].startDate + " - " + likelyDupeResults[0].endDate +").")
        : undefined;
}

// /api/external-conference PUT
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


    let newExternalConference, warning;
    try {
        newExternalConference = (await request.json()) as ConferenceType;

        verifyAndNormalizeConferenceData(newExternalConference);
        warning = await verifyConferenceIsNew(newExternalConference.title, newExternalConference.startDate);

    } catch (userError) {
        console.error(`POST /api/create-ext-conference: ${userError}`);
        console.error(`    ...from request: ${request}`);
        return json({
            success: false,
            ok: false,
            status: 403,
            statusText: "Conference data error: " + userError
        });
    }

    try {
        //createConference(newExternalConference);

        return json({
            success: true,
            ok: true,
            statusText: warning
                ? ("Warning: " +  warning)
                : undefined
        });

    } catch (error) {
        console.error(`POST /api/create-ext-conference: ${error}`);
        return json({
            success: false,
            ok: false,
            status: 500,
            statusText: "Error when storing conference. See log for details.",
        });
    }






    /*
	try {
		const externalConferenceToBeUpdated = (await request.json()) as IExternalConference;
		await client
			.patch(externalConferenceToBeUpdated._id)
			.set({
				...externalConferenceToBeUpdated,
				slug: { _type: 'slug', current: externalConferenceToBeUpdated.slug }
			})
			.commit();

		return json({ success: true });
	} catch (error) {
		console.error(`PUT /api/external-conference: ${error}`);
		return json({ success: false });
	}*/
}) satisfies RequestHandler;
