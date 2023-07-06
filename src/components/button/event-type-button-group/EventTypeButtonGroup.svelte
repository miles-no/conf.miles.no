<script lang="ts">
	import Button, { Label } from '@smui/button';
	import type { EventType } from '../../../enums/event';
	import { Event } from '../../../enums/event';

	export let selectedEventType: EventType | undefined = undefined;
	export let isExternal: boolean = false;
	const eventTypes: EventType[] = isExternal
		? Object.values(Event).filter((eventType) => eventType !== Event.SMiles)
		: Object.values(Event);
</script>

<div class="eventtype-btn-group-container">
	<span>Arrangementstype</span>
	<div class="eventtype-btn-group-container-options">
		{#each eventTypes as eventType}
			<Button
				variant="outlined"
				class={`eventtype-btn-group-container-options-btn button-shaped-round ${
					selectedEventType === eventType ? 'btn--selected' : ''
				}`}
				on:click={() => (selectedEventType = selectedEventType === eventType ? undefined : eventType)}

				selected={selectedEventType === eventType}
			>
				<Label>{eventType}</Label>
			</Button>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../../styles/mixin' as *;
	:global(.button-shaped-round) {
		@include button-shaped-round();
	}

	@media (min-width: 599px) {
		.eventtype-btn-group-container {
			display: flex;
			align-self: flex-end;
			align-items: center;
			width: 45rem !important;
		}
	}

	.eventtype-btn-group-container {
		display: flex;
		align-self: flex-end;
		align-items: center;
		gap: 2rem;

		span {
			letter-spacing: 1.3px;
			font-weight: 600;
		}
		.eventtype-btn-group-container-options {
			display: flex;
			gap: 0.4rem;
		}

		* :global(.btn--selected) {
			background-color: #f6e8e7;
			color: #96171c;
		}
	}
</style>
