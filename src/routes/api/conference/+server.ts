import {json, redirect} from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import type { IConference } from '../../../model/conference.js';
import { updateConference } from '$lib/server/sanityClient';
import {fetchConference} from "$lib/sanityClient";
import {verifyAndNormalizeConferenceData, verifyConferenceUrl} from "../../../utils/conference-utils";



let warnings = [];

// /api/conference PUT
export const PUT = (async ({ request }) => {

    /* TODO: Should there be an auth check here, or does that happen behind the scenes elsewhere during this call?
    if (!user.isAuthenticated) {
        throw redirect(307, '/login?redirect_uri=' + url.pathname);
    } */


	try {
		const conference = await request.json();

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
        existingConference.callForPapersDate = conference.callForPapersDate ?? existingConference.callForPapersDate;
        existingConference.categoryTag = conference.categoryTag ?? existingConference.categoryTag;
        existingConference.description = conference.description ?? existingConference.description;

        await updateConference(existingConference as IConference);

        if (warnings.length) {
            console.warn(`${warnings.length} warning(s) when trying to update a conference (slug = '${conference.slug}'): ${ + JSON.stringify(warnings, null, 2)}`);
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
