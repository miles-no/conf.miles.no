import type {FrontendFeatureToggleName} from "./frontend";
import type {ServersideFeatureToggleName} from "./server";

export type FlagName = FrontendFeatureToggleName | ServersideFeatureToggleName;
export type IFlags = {
	[flagName in FlagName]: boolean;
};


import {flags as server} from './server';
import {flags as frontend} from './frontend';

// TODO: if the flags from the server side are relevant to the client, we might needto add a function here that mutates the 'servers' object and is called from +layout.svelte?
// Because lifecycles, this must be called from the script section of consuming svelte components.
// Also note, frontend flags will overwrite backend ones:
export const featureIsToggledOn = (flagName: FlagName): boolean => {
	// @ts-ignore
	return frontend[flagName] || server[flagName];
}
