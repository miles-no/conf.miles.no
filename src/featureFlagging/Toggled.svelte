<!-- Displays a component nested in this component, only if the feature toggle named to by the toggle prop is true.
     Usage example (all svelte):

        <Toggled flag="testFeature">
            <p>
                This paragraph is displayed only if:
                 - the attribute `testFeature` is defined in frontend.flags AND parsed there from something truthy in runtime,
                     eg. the URI param `testFeature` and that a truthy URI parameter  (`...?testFeature=somethingTruthy`)
                 - OR if `testFeature` is defined in server.flags and parsed from something truthy there,
                     eg. an environment variable
            </p>
        </Toggled>

-->

<script lang="ts">
	import {flags as server} from './server.ts';
	import type {ServersideFeatureToggleName} from './server.ts';
	import {flags as frontend} from './frontend.ts';
	import type {FrontendFeatureToggleName} from './frontend.ts';

	type FlagName = FrontendFeatureToggleName | ServersideFeatureToggleName;
	type IFlags = {
		[flagName in FlagName]: boolean;
	};

	// Because lifecycles, this merger must in general occur in the script section of consuming svelte components,
    // like here. Also note, frontend flags will overwrite backend ones:
	const flags: IFlags = {...server, ...frontend};

	export let flagName: FlagName;
</script>

{#if flags[flagName]}
    <slot />
{/if}
