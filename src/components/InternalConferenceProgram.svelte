<script>
	import { format, compareAsc } from 'date-fns';
	import { PortableText } from '@portabletext/svelte';
	import { performances as performances_store } from '../stores/performances.ts';
	import PerformanceRow from './PerformanceRow.svelte';
	export let conference;
	export let day;
	$: itinerary = conference.itinerary.find(
		(i) => i.itineraryDate == format(new Date(day), 'yyyy-MM-dd')
	);

	const getTimeslotPerformances = ({ startTime, endTime }) => {
		const min = new Date(`${day} ${startTime}`).getTime();
		const max = new Date(`${day} ${endTime}`).getTime();
		return conference.performances
			.filter(({ dateAndTime }) => {
				const performanceTimestamp = new Date(dateAndTime).getTime();
				return performanceTimestamp >= min && performanceTimestamp <= max;
			})
			.sort((a, b) => {
				return compareAsc(new Date(a.dateAndTime), new Date(b.dateAndTime));
			});
	};

	let only_selected = false;
</script>

<div>
	{#if itinerary}
    <div class="accordion accordion-flush" id="eventAccordions">
      {#each itinerary.events as event, index}
        <div class="accordion-item p-0 ">
          <button class="accordion-button event collapsed" class:accordion-hide={!event.containsPerformances && !event.info} type="button" data-bs-toggle="collapse" data-bs-target="#event-{index}" aria-expanded="false" aria-controls="event-{index}">
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
            {#if event.containsPerformances}
              <ul class="alt-ul">
                <li>
                  <div class="selector-row  d-flex flex-column p-2">
                    <div>Kryss av de lyntalene du vil gå på</div>
                    <label class="d-flex pt-2">
                      <input type="checkbox" bind:checked={only_selected} />
                      <div class="selector-text">Vis kun valgte lyntaler</div>
                    </label>
                  </div>
                </li>
                {#each getTimeslotPerformances(event)
                  .filter(perf => !only_selected || Boolean($performances_store[perf.submission._id])) as performance (performance.submission._id)}
                      <PerformanceRow {conference} {performance} />
                {/each}
              </ul>
            {/if}
            {#if event.info}
              <div class="p-3">
                <PortableText value={event.info} />
              </div>
            {/if}
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
</div>

<style>
	.selector-row {
		background-color: #f2f2f2;
	}
	.selector-text {
		font-weight: 300;
		font-size: small;
		margin-left: 0.25em;
	}
	.event {
		color: white;
		background-color: #ef8181;
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
	.alt-ul {
		padding: 0;
		margin: 0;
		margin-bottom: 1px;
		list-style-type: none;
	}
	input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--form-background);
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 0;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  background-color: CanvasText;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}


  .accordion-hide {
    cursor: default;
  }
  .accordion-hide:after {
    display: none;
  }
</style>
