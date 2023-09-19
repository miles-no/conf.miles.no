<!-- Displays a component nested in this component, only if the feature toggle named to by the toggle prop is true. -->
<script lang="ts">
	import {flags as server} from './server.ts';
	import {flags as frontend} from './frontend.ts'

    // Frontend flags will overwrite backend ones
	const flags = {...server, ...frontend};

	export let toggle: string;
</script>

{#if flags[toggle]}
    <slot />
{/if}
