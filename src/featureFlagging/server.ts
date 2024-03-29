/** Source of flags: this reads the state of flags from wherever they're set:
 *  -  public .env variables, to begin with
 *
 *  - configs?
 */

let isProd: boolean|undefined = undefined;
let prodIsLogged = false;

export function parseIsProd(env: {PUBLIC_SANITY_DATASET: string}) {
	isProd = (!!env.PUBLIC_SANITY_DATASET && !!env.PUBLIC_SANITY_DATASET.startsWith('prod'));
	if (!prodIsLogged) {
		console.log("isProd:", isProd);
		prodIsLogged = true;
	}
}
export function setIsProd(isProd_: boolean) {
	isProd = isProd_;
}

export function getIsProd() {
	return isProd;
}


/**  IMPORTANT! Over time, different feature flags may be scattered around the code base. Typescript help will come
 *   really handy for maintaining this, especially when it's time for cleanup. So:
 *   When setting up a new feature toggle,
 *   - declare it by name as an EXPLICIT KEY with a boolean type in the interface 'FrontendFeatureToggles',
 *   - and with a false value by that key in the object 'flags'
 *   - then use 'setServersideToggle' in serverside code to implement whatever logic for setting it.
 *       Specifically and explicitly for each flag, one at a time (in order to not risk exposing anything by inadvertently
 *       sending it in through an object).
 */
export interface ServersideFeatureToggles {
	strictAlphaNumericSlug: boolean,
	forceNavigate: boolean,
};
export type ServersideFeatureToggleName = keyof ServersideFeatureToggles;
export const flags: ServersideFeatureToggles = {
	strictAlphaNumericSlug: false,
	forceNavigate: false,
}

export const setServersideToggle = (name: ServersideFeatureToggleName, flag: boolean) => {
	if (Object.keys(flags).indexOf(name) === -1) {
		console.warn("Can't set serverside feature flag '" + name + "': name must be declared in 'flags' and the 'ServersideFeatureToggles' interface.");
	} else {
		// @ts-ignore
		// If environment is prod, then use the 'flag' arg to set the toggle value.
		// If environment is not prod, just flag it as true / toggle on.
		flags[name] = flag;
		console.log("Serverside feature flag:", name, "=", JSON.stringify(flags[name]));
	}
}

