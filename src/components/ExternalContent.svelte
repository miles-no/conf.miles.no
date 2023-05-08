<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import EventCard from './EventCard.svelte';
	import LocationButtonGroup from './button/location-button-group/LocationButtonGroup.svelte';
	import type { LocationType } from '../enums/location';
	import type { EventType } from '../enums/event';
	import EventTypeButtonGroup from './button/event-type-button-group/EventTypeButtonGroup.svelte';
	import type { IConference } from '../model/conference';

	export let conferences: IConference[] = [];

	let selectedCity: LocationType | undefined = undefined;
	let selectedEvent: EventType | undefined = undefined;

	$: futureEvents = conferences.filter(
		(conf: IConference) => Date.parse(conf.startDate) >= Date.now()
	);
	$: showedEvents = [...futureEvents];

	$: {
		if (selectedCity) {
			showedEvents = futureEvents
				.filter((conf: IConference) =>
					conf.location?.toLowerCase().includes(selectedCity!.toLowerCase())
				)
				.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
		}
	}

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
	<div class="page-container-filter">
		<LocationButtonGroup bind:selectedCity />
		<EventTypeButtonGroup isExternal bind:selectedEvent />
	</div>
	<div class="page-container-content">
		<LayoutGrid>
			{#each showedEvents as conference (conference.title)}
				<Cell>
					<EventCard event={conference} />
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

	.page-container-content {
		border: 1px solid $black;
		border-radius: 0.5rem;
	}
</style>
