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
	import {flags as frontend} from './frontend.ts'
	import type {FrontendFeatureToggleName} from './frontend.ts';

    // Frontend flags will overwrite backend ones
	const flags = {...server, ...frontend};

	type FlagName = FrontendFeatureToggleName | ServersideFeatureToggleName;

	export let flag: FlagName;
</script>

{#if flags[flag]}
    <slot />
{/if}
