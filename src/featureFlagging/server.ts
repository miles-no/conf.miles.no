/** Source of flags: this reads the state of flags from wherever they're set:
 *  -  public .env variables, to begin with
 *
 *  - configs?
 */



/**  IMPORTANT! Over time, different feature flags may be scattered around the code base. Typescript help will come
 *   really handy for maintaining this, especially when it's time for cleanup. So:
 *   When setting up a new feature toggle,
 *   - declare it by name as an EXPLICIT KEY with a boolean type in the interface 'FrontendFeatureToggles',
 *   - and with a false value by that key in the object 'flags'
 *   - then use 'setServersideToggle' to implement whatever logic for setting it - specifically and explicitly for each
 *   flag, one at a time in order to not risk exposing anything by inadvertently sending it in through an object.
 */
export interface ServersideFeatureToggles {
	// exampleFeatureName: boolean
};
export type ServersideFeatureToggleName = keyof ServersideFeatureToggles;
export const flags: ServersideFeatureToggles = {
	// exampleFeatureName: false
}

export const setServersideToggle = (name: string, flag: boolean) => {
	console.log("Serverside feature flag:", name, "=", JSON.stringify(flag));
}
