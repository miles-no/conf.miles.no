<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import EventCard from './EventCard.svelte';
	import type { LocationType } from '../enums/location';
	import type { EventType } from '../enums/event';
	import type { IEvent } from '../model/event';

	export let events: IEvent[] = [];

	let selectedCity: LocationType | undefined = undefined;
	let selectedEvent: EventType | undefined = undefined;

	$: futureEvents = events.filter(
		(conf) => Date.parse(conf.startDate) >= Date.now()
	);
	$: showedEvents = [...futureEvents];

	// TODO: clearify if filter should be in this page
	// $: {
	// 	if (selectedCity) {
	// 		showedEvents = futureEvents
	// 			.filter((conf: IEvent) =>
	// 				conf.location?.toLowerCase().includes(selectedCity!.toLowerCase())
	// 			)
	// 			.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
	// 	}
	// }

	// TODO: filter event type
	// $: {
	// 	if (selectedEvent) {
	// 		showedEvents = futureEvents.filter((conf) =>
	// 			conf.location?.toLowerCase().includes(selectedCity?.toLowerCase())
	// 		);
	// 	}
	// }
</script>

<div class="page-container">
	<h1 class="page-container-title">Dette skjer hos oss i Miles</h1>
	<!-- TODO: clearify if filter should be in this page -->
	<!-- <div class="page-container-filter">
		<LocationButtonGroup bind:selectedCity />
		<EventTypeButtonGroup isExternal bind:selectedEvent />
	</div> -->
	<div class="page-container-content">
		<LayoutGrid>
			{#each showedEvents as event (event.title)}
				<Cell>
					<EventCard {event} />
				</Cell>
			{/each}
		</LayoutGrid>
	</div>
</div>

<style lang="scss">
	@use '../styles/colors' as *;

	.page-container-title {
		font-size: 2.5rem;
		letter-spacing: 1.3px;
		font-weight: 700;
	}

	.page-container-filter {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-bottom: 1.5rem;
	}
</style>
