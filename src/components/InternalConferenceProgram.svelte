<script>
	import { format } from 'date-fns';
	import Event from './Event.svelte';
	export let conference;
	export let day;
	$: itinerary = conference.itinerary.find(
		(i) => i.itineraryDate == format(new Date(day), 'yyyy-MM-dd')
	);
</script>

{#if itinerary}
	<div class="accordion accordion-flush" id="eventAccordions">
		{#each itinerary.events as event, index}
			<div class="accordion-item p-0 ">
				<button
					class="accordion-button event collapsed"
					class:accordion-hide={!event.containsPerformances && !event.info}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#event-{index}"
					aria-expanded="false"
					aria-controls="event-{index}"
				>
					<div class="d-flex align-items-center">
						<p class="event-times">
							{event.startTime}
							{#if event.endTime}
								{` - ${event.endTime}`}
							{:else}
								<span style="visibility: hidden;"> - 00:00</span>
							{/if}
						</p>
						<p class="event-description">
							{event.description}
						</p>
					</div>
				</button>
			</div>
			{#if event.containsPerformances || event.info}
				<div id="event-{index}" class="accordion-collapse collapse">
					<Event {day} {event} {conference} />
				</div>
			{/if}
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

<style>
	.event {
		color: white;
		background-color: #D76E6E;
		padding: 15px;
		margin-bottom: 1px;
	}
	.event:after {
		color: white;
		background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>");
	}
	.event-times {
		width: 130px;
		font-weight: 500;
		margin-bottom: 0;
		padding-right: 5px;
	}

	.event-description {
		font-weight: 600;
		font-size: large;
		margin-bottom: 0;
	}
	.accordion-hide {
		cursor: default;
	}
	.accordion-hide:after {
		display: none;
	}
</style>
