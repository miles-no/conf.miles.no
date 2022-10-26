<script>
	import { format } from 'date-fns';
	import Event from './Event.svelte';
	import { accordionStore } from '../stores/accordion_localstorage';
	export let conference;
	export let day;

	$: itinerary = conference.itinerary
		? conference.itinerary.find((i) => new Date(i.itineraryDate).getDate() === new Date(day).getDate())
		: null;

</script>

<span>
	{#if itinerary}
		<div class="accordion accordion-flush" id="eventAccordions">
			{#each itinerary.events as event, index}
				{@const is_open = Boolean($accordionStore?.['Accordion-' + event._key])}
				<div>
					<div class="accordion-item">
						<div class="accordion-header" id="heading-{index}">
							<button
								class="accordion-button event-btn {is_open ? '' : 'collapsed'}"
								class:accordion-hide={!event.containsPerformances && !event.info}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#event-{index}"
								aria-expanded={is_open ? 'true' : 'false'}
								aria-controls="event-{index}"
								on:click={() => accordionStore.flip('Accordion-' + event._key)}
							>
								<div>
									<div class="event-container">
										<p class="event-times">
											<span>
												{`${event.startTime}${event.endTime ? ' - ' + event.endTime : ''}`}
											</span>
										</p>
										<p class="event-description">
											{event.description}
										</p>
									</div>
								</div>
							</button>
						</div>
					</div>
					<div>
						{#if event.containsPerformances || event.info}
							<div
								id="event-{index}"
								class="accordion-collapse collapse {is_open ? 'show' : ''}"
								aria-labelledby="heading-{index}"
								data-bs-parent="eventAccordions"
							>
								<Event {day} {event} {conference} />
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="d-flex flex-column mb-5">
			<h1 class="mb-0">Her var det tomt, gitt.</h1>
			<p class="mb-0">
				Det er foreløpig ingen planlagte innslag fra Miles på {conference.title}.
			</p>
		</div>
	{/if}
</span>

<style>
	.accordion-item {
		border: none;
	}
	.event-btn {
		color: white;
		background-color: #d76e6e;
		margin-bottom: 2px;
	}
	.event-container {
		display: flex;
		align-items: flex-start;
		gap: 0;
		flex-direction: column;
	}
	.event-btn:after {
		color: white;
		background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>");
	}
	.event-times {
		font-weight: 500;
		font-size: small;
		margin-bottom: 0;
	}
	.event-description {
		font-weight: 600;
		margin-bottom: 0;
	}
	.accordion-hide {
		cursor: default;
	}
	.accordion-hide:after {
		display: none;
	}
	@media (min-width: 576px) {
		.event-container {
			align-items: center;
			gap: 1em;
			flex-direction: row;
		}
		.event-times {
			width: 90px;
		}
	}
</style>
