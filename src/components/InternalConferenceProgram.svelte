<script>
	import { format } from 'date-fns';
	import Event from './Event.svelte';
	export let conference;
	export let day;
  $: itinerary = conference.itinerary
  ? conference.itinerary.find(
		  (i) => i.itineraryDate == format(new Date(day), 'yyyy-MM-dd')
	  )
  : null
</script>

{#if itinerary}
	<div class="accordion accordion-flush" id="eventAccordions">
		{#each itinerary.events as event, index}
			<div class="accordion-item">
				<div class="accordion-header">
					<button
						class="accordion-button event collapsed d-flex align-items-center"
						class:accordion-hide={!event.containsPerformances && !event.info}
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#event-{index}"
						aria-expanded="false"
						aria-controls="event-{index}"
					>
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
					</button>
				</div>
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
		background-color: #d76e6e;
		padding: 15px;
		margin-bottom: 1px;
	}
	.event:after {
		color: white;
		background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>");
	}
	.event-times {
		width: 100px;
		font-weight: 500;
		font-size: small;
		margin-bottom: 0;
	}
	.event-description {
		font-weight: 600;
		margin-bottom: 0;
		width: calc(100% - 120px);
	}
	.accordion-hide {
		cursor: default;
	}
	.accordion-hide:after {
		display: none;
	}
</style>
