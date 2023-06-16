<script lang="ts">
	import type { IEvent } from '../../../../model/event';
	import EventCard from '../../../EventCard.svelte';

	export let myUpcomingEvents: IEvent[] | undefined = undefined;
</script>

<div class="my-upcoming-events-container">
	<h2 class="visuallyhidden">Mine utvalgte</h2>
	{#if myUpcomingEvents && myUpcomingEvents.length > 0}
		<ul class="my-upcoming-events-list-container">
			{#each myUpcomingEvents as event}
				<li>
					<EventCard {event} />
				</li>
			{/each}
		</ul>
	{:else}
		<p>Ingen utvalgte arrangement</p>
	{/if}
</div>

<style lang="scss">
	@use '../../../../styles/mixin' as *;

	.visuallyhidden {
		@include visuallyhidden();
	}

	.my-upcoming-events-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-transform: capitalize;
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		.my-upcoming-events-list-container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}

	@media (min-width: 758px) {
		.my-upcoming-events-container {
			.my-upcoming-events-list-container {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
			}
		}
	}
</style>
