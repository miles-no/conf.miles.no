<script>
	import Conference from './Conference.svelte';
	import Hoverable from '../components/Hoverable.svelte';
  export let conferences = [];
</script>

<div class="mb-5">
	{#each conferences as conference}
		<Hoverable let:hovering={active}>
			<Conference {conference} {active} />
		</Hoverable>
	{/each}
</div>
