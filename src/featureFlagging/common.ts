import type {FrontendFeatureToggleName} from "./frontend";
import type {ServersideFeatureToggleName} from "./server";

export type FlagName = FrontendFeatureToggleName | ServersideFeatureToggleName;
export type IFlags = {
	[flagName in FlagName]: boolean;
};


import {flags as server} from './server';
import {flags as frontend} from './frontend';

// Because lifecycles, this must be called from the script section of consuming svelte components.
// Also note, frontend flags will overwrite backend ones:
export const featureIsToggledOn = (flagName: FlagName): boolean => {
	// @ts-ignore
	return frontend[flagName] || server[flagName];
}
