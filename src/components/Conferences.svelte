<script>
	import Conference from './Conference.svelte';
	export let conferences = [];
</script>

<div class="mb-5">
	{#each conferences as conference}
		<Conference {conference} />
	{/each}
</div>
