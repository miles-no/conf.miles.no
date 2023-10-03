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
	import type {FlagName, IFlags} from "./common";
	import {featureIsToggledOn} from "./common";

	export let showPlaceholder: boolean = false;

	export let flagName: FlagName;
	const isToggledOn = featureIsToggledOn(flagName);
</script>

{#if isToggledOn}
    <slot />
{:else if showPlaceholder}
    <div class="placeholder">({flagName})</div>
{/if}

<style>
    .placeholder {
        opacity: 30%;
	    color: white;
	    background-color: rgba(127,127,127, .6);
	    padding: 1px 4px;
	    border-radius: 4px;
	    text-shadow: 1px 1px 2px black;
	    box-shadow: 0 0 8px #888;
    }
</style>
