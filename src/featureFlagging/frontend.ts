/** Source of flags: this reads the state of flags from wherever they're set:
 *  - URI parameters, to begin with.
 *
 *  - configs?
 */


import {parseFlag} from "./common";

/**  IMPORTANT! Over time, different feature flags may be scattered around the code base. Typescript help will come
 *   really handy for maintaining this, especially when it's time for cleanup. So:
 *   When setting up a new feature toggle,
 *   - declare it by name as an EXPLICIT KEY with a boolean type in the interface 'FrontendFeatureToggles',
 *   - and with a false value by that key in the object 'flags'
 *   - then use 'toggleByURIParams' to implement whatever logic for setting it - specifically and explicitly for each flag.
 */
export interface FrontendFeatureToggles {
	performances: boolean
	debuglog: boolean
};
export type FrontendFeatureToggleName = keyof FrontendFeatureToggles;

export const flags: FrontendFeatureToggles = {
	performances: false,
	debuglog: false
}


export const toggleByURIParams = (searchParams: URLSearchParams) => {
	flags.performances = parseFlag(searchParams.get("performances"));
	flags.debuglog = parseFlag(searchParams.get("debuglog"));
}
