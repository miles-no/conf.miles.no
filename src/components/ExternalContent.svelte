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

<div>
	<h1 class="mdc-typography--headline4 pt-4" style="font-weight: bold;">Dette skjer i Miles:</h1>
	<LayoutGrid>
		{#each to_be.reverse() as conference (conference.title)}
			<Cell>
				<EventCard event={conference} />
			</Cell>
		{/each}
	</LayoutGrid>
</div>
