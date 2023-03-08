<script>
	import { endOfDay } from 'date-fns';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import EventCard from './EventCard.svelte';
	export let conferences = [];

	$: being = conferences.filter(
		(conf) =>
			new Date(conf.startDate) <= Date.now() && Date.now() <= endOfDay(new Date(conf.endDate))
	);
	$: to_be = conferences.filter((conf) => new Date(conf.startDate) >= Date.now());
	$: done = conferences.filter((conf) => new Date(conf.endDate) < Date.now());
</script>

<LayoutGrid>
	{#each to_be.reverse() as conference (conference.title)}
		<Cell>
			<EventCard event={conference} />
		</Cell>
	{/each}
</LayoutGrid>
