<script>
	import Conference from './Conference.svelte';
	import Hoverable from '../components/Hoverable.svelte';
	export let conferences = [];
</script>

<div>
	{#each conferences as conference}
		<Hoverable let:hovering={active}>
			<div class:active>
                <Conference {conference} {active} />
			</div>
		</Hoverable>
	{/each}
</div>

<style>
	div {
		padding: 1em;
		margin: 0 0 1em 0;
		background-color: #eee;
	}

	.active {
		background-color: #ff3e00;
		color: white;
	}
</style>
