import { redirect } from '@sveltejs/kit';
import { fetchEvents } from '$lib/sanityClient';
import { getUserFromCookie } from '$lib/server/auth.js';
import type { User } from '$lib/types/user';
import type { IEvent } from '../model/event';
import {featureIsToggledOn} from "../featureFlagging/common";

export interface IPageLoadData {
	events: IEvent[];
	user: User;
	forceNavigate: string|undefined,
}

export async function load({ cookies }) {
	const user = getUserFromCookie(cookies.get('session'));
	const events = await fetchEvents(user);

	if (!events) {
		return {
			status: 404
		};
	}

	let forceNavigate = undefined;
	if (user.isAuthenticated) {
		const redirectTarget = '/konferanser';
		if (!featureIsToggledOn("forceNavigate")) {
			throw redirect(308, redirectTarget);
		}
		forceNavigate = redirectTarget;
	}

	return {
		user,
		events,
		forceNavigate
	};
}
