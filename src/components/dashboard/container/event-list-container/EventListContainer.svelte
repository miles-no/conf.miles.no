<script lang="ts">
	import type { IEvent } from '../../../../model/event';
	import { formatDate } from '../../../../utils/date-time-utils';
	import EventCard from '../../../EventCard.svelte';

	export let events: IEvent[];

	interface IEventMapByMonth {
		[key: string]: IEvent[];
	}

	$: allMonths = Array.from(
		new Set(
			events
				?.filter((c) => Date.parse(c.startDate) >= Date.now())
				?.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))
				.map((c) => formatDate(c.startDate, { month: 'long' }))
		)
	);

	$: eventMapByMonth = allMonths?.reduce((previousValue, currentValue) => {
		const filtered = events?.filter(
			(c) => formatDate(c.startDate, { month: 'long' }) === currentValue
		);
		if (filtered !== undefined) {
			return {
				...previousValue,
				[currentValue]: filtered
			};
		}
	}, undefined as IEventMapByMonth | undefined);
</script>

<div class="event-list-container">
	<h2 class="visuallyhidden">Alle arrangement</h2>
	{#if allMonths.length > 0 && eventMapByMonth}
		{#each allMonths as month}
			<div>
				<h3>{month}</h3>
				<ul class="list-container">
					{#each eventMapByMonth[month] as event}
						<li>
							<EventCard {event} />
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	@use '../../../../styles/mixin' as *;

	h2 {
		font-size: 1.25rem;
		letter-spacing: 0.3px;
		font-weight: 600;
		text-transform: uppercase;
	}

	h3 {
		font-size: 1.15rem;
		letter-spacing: 0.16px;
	}

	.visuallyhidden {
		@include visuallyhidden();
	}

	.event-list-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-transform: capitalize;
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		.list-container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}

	@media (min-width: 970px) {
		.event-list-container {
			.list-container {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				li {
					width: 20rem;
				}
			}
		}
	}
</style>
