<!-- TODO: Depending on whether the feature toggle named to by the 'toggle' prop is true or not, displays one of two components. -->
<script lang="ts">
	import {flags as server} from './server.ts';
	import {flags as frontend} from './frontend.ts'

	// Frontend flags will overwrite backend ones
	const flags = {...server, ...frontend};

	export let toggle: string;
</script>

{#if flags[toggle]}
    <slot />
{:else}
    SOMETHING SOMTHING
{/if}
