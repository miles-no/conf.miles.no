<script lang="ts">
	import { endOfDay } from 'date-fns';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import EventCard from './EventCard.svelte';
	import Tag from './tag/Tag.svelte';
	import LocationButtonGroup from './button/location-button-group/LocationButtonGroup.svelte';
	import type { LocationType } from '../enums/location';

	export let conferences = [];

	$: being = conferences.filter(
		(conf) =>
			new Date(conf.startDate) <= Date.now() && Date.now() <= endOfDay(new Date(conf.endDate))
	);
	$: to_be = conferences.filter((conf) => new Date(conf.startDate) >= Date.now());
	$: done = conferences.filter((conf) => new Date(conf.endDate) < Date.now());

	let selectedCity: LocationType | undefined = undefined;
</script>

<div class="page-container">
	<h1 class="page-container-title">Dette skjer hos oss i Miles</h1>
	<div class="page-container-filter">
		<LocationButtonGroup bind:selectedCity />
		<div class="page-container-filter-content">
			<p>Jeg ønsker</p>
			<div class="page-container-filter-content-options">
				<Tag variant="outlined" color="error" size="small">Sosial påfyll</Tag>
			</div>
		</div>
	</div>
	<div class="page-container-content">
		<LayoutGrid>
			{#each to_be.reverse() as conference (conference.title)}
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

	.page-container-filter-content {
		display: flex;
		align-self: flex-end;
		gap: 2rem;
		width: 50%;

		p {
			letter-spacing: 1.3px;
			font-weight: 600;
		}
	}

	.page-container-content {
		border: 1px solid $black;
		border-radius: 0.5rem;
	}
</style>
