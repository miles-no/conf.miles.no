import type {FrontendFeatureToggleName} from "./frontend";
import type {ServersideFeatureToggleName} from "./server";

export type FlagName = FrontendFeatureToggleName | ServersideFeatureToggleName;
export type IFlags = {
	[flagName in FlagName]: boolean;
};


import {flags as server, getIsProd} from './server';
import {flags as frontend} from './frontend';



type DefaultFlagOverrides = {dev:boolean}|{prod:boolean}|{dev:boolean, prod:boolean}
const DEFAULTFLAGS: DefaultFlagOverrides = {
	dev: true,
	prod: false
};

/** Flag-value parsing, taking care of override logic and possible values of flagValue,
 *  which can come from env variables or URI parameters.
 *
 *  If flagValue is set, parses true/"true" or positive integers to true, and anything else to false - and returns it.
 *  If flagValue is not set, returns a default value that depends on the environment - and can be overridden.
 * @param flagValue
 */
export const parseFlag = (flagValue: boolean|string|number|undefined|null, defaultValues?: DefaultFlagOverrides): boolean => {
	if (null == flagValue) {
		const defaults = {
			...DEFAULTFLAGS,
			...defaultValues
		};
		return (getIsProd() ? defaults.prod : defaults.dev);
	}

	const flagString = (flagValue + "").trim().toLowerCase();
	return "true" === flagString || parseInt(flagString) > 0;
};

// Because lifecycles, this must be called from the script section of consuming svelte components.
// Also note, frontend flags will overwrite backend ones:
export const featureIsToggledOn = (flagName: FlagName): boolean => {
	// @ts-ignore
	return (
		frontend[flagName] ?? (
			server[flagName] ?? (
				getIsProd() ? DEFAULTFLAGS.prod : DEFAULTFLAGS.dev
			)
		)
	);
}
