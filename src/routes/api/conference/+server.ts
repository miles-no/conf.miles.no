import {json, redirect} from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { IConference } from '../../../model/conference.js';
import { updateConference } from '$lib/server/sanityClient';
import {fetchConference} from "$lib/sanityClient";
import {getMinimalPortableText} from "../../../utils/sanityclient-utils";
import {verifyAndNormalizeConferenceData, verifyConferenceUrl} from "../../../utils/conference-utils";
import type {ConferenceType} from "$lib/types/conference";



let warnings = [];

// /api/conference PUT
export const PUT = (async ({ request }) => {

	try {
		const conference: ConferenceType = await request.json();

        verifyAndNormalizeConferenceData(conference);
        const warning = await verifyConferenceUrl(conference.url);
        if (warning) {
            warnings.push(warning);
        }

        if (!conference.slug) {
            throw Error("Can't update conference data, slug was missing from the request");
        }

        const existingConference: IConference = await fetchConference(conference.slug);
        existingConference.title = conference.title ?? existingConference.title;
        existingConference.url = conference.url ?? existingConference.url;
        existingConference.location = conference.location ?? existingConference.location;
        existingConference.startDate = conference.startDate ?? existingConference.startDate;
        existingConference.endDate = conference.endDate ?? existingConference.endDate;
        existingConference.callForPapersDate = conference.callForPapersDate != null
            ? new Date(Date.parse(conference.callForPapersDate))
            : existingConference.callForPapersDate;
        existingConference.categoryTag = conference.categoryTag ?? existingConference.categoryTag;

        // TODO: Works badly! FIX!
        existingConference.description = conference.description != null
            ? getMinimalPortableText(conference.description)
            : existingConference.description;

        await updateConference(existingConference as IConference);

        if (warnings.length) {
            console.warn("Warnings when trying to update conference with slug '" + conference.slug + "': " + JSON.stringify(warnings, null, 2));
        }

		return json({
            success: true,
            ok: true,
            warnings: warnings.length ? warnings : undefined,
            slug: conference.slug
        });

	} catch (error) {
		console.error(`PUT /api/external-conference: ${error}`);
		return json({ success: false });
	}
}) satisfies RequestHandler;
