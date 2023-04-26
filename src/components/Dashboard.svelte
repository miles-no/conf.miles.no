<script>
	import Conference from './Conference.svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import { endOfDay } from 'date-fns';
	import EventCard from './EventCard.svelte';
	import SmallConferenceCard from './SmallConferenceCard.svelte';
	export let conferences = [];

	$: being = conferences.filter(
		(conf) =>
			new Date(conf.startDate) <= Date.now() && Date.now() <= endOfDay(new Date(conf.endDate))
	);
	$: to_be = conferences.filter((conf) => new Date(conf.startDate) >= Date.now());
	$: done = conferences.filter((conf) => new Date(conf.endDate) < Date.now());
	console.log(done);
</script>

<div>
	<LayoutGrid>
		<Cell span={4}>
			{#if being.length > 0}
				<h1>Det neste arrangementet</h1>
				<EventCard event={to_be[to_be.length - 1]} />
			{:else if to_be.length > 0}
				<h1>Det neste arrangementet</h1>
				<EventCard event={to_be[to_be.length - 1]} />
			{/if}
		</Cell>
		<Cell span={8}>
			<h1>Kommende arrangementer</h1>
			{#each to_be.reverse() as conference (conference.title)}
				<SmallConferenceCard {conference} />
			{/each}
		</Cell>
		<Cell span={8}>
			<h1>Tidligere arrangementer</h1>
			{#each done.reverse() as conference (conference.title)}
				<Conference {conference} />
			{/each}
		</Cell>
	</LayoutGrid>
</div>

<style>
	.heading {
		font-weight: 300;
		margin: 1em 0 0.25em 1vw;
		font-size: 300%;
	}
</style>
