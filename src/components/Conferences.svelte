<script>
	import Conference from './Conference.svelte';
	import Hoverable from '../components/Hoverable.svelte';
  import { user } from '../stores';
	export let conferences = [];
</script>

<div>
	{#each conferences as conference}
		<Hoverable let:hovering={active}>
			<Conference {conference} {active} />
		</Hoverable>
	{/each}
</div>
