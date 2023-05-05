<script lang="ts">
	import Button, { Label } from '@smui/button';
	import type { EventType } from '../../../enums/event';
	import { Event } from '../../../enums/event';

	export let selectedEvent: EventType | undefined = undefined;
	const eventList: EventType[] = Object.values(Event);
</script>

<div class="eventtype-button-group-container">
	<span>Arrangementstype</span>
	<div class="eventtype-button-group-container-options">
		{#each eventList as event}
			<Button
				color="primary"
				variant="outlined"
				class={`eventtype-button-group-container-options-btn button-shaped-round ${
					selectedEvent === event ? 'mdc-ripple-upgraded--background-focused' : ''
				}`}
				on:click={() => (selectedEvent = event)}
				selected={selectedEvent === event}
			>
				<Label>{event}</Label>
			</Button>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../../styles/colors' as *;
	.eventtype-button-group-container {
		display: flex;
		align-self: flex-end;
		align-items: center;
		gap: 2rem;
		width: 50%;

		span {
			letter-spacing: 1.3px;
			font-weight: 600;
		}
	}

	.eventtype-button-group-container-options {
		display: flex;
		gap: 0.4rem;
	}

	* :global(.eventtype-button-group-container-options-btn) {
		border-color: $primary-red;
		text-transform: none;
	}
</style>
