<script>
	import { format, intlFormat } from 'date-fns';
	import { FileQuestion } from 'lucide-svelte';
	import { PortableText } from '@portabletext/svelte';
	import Performance from './Performance.svelte';
	export let conference;
	export let day;
	$: itinerary = conference.itinerary.find(
		(i) => i.itineraryDate == format(new Date(day), 'yyyy-MM-dd')
	);

	const getTimeslotPerformances = ({ startTime, endTime }) => {
		const min = new Date(`${day} ${startTime}`).getTime();
		const max = new Date(`${day} ${endTime}`).getTime();
		return conference.performances.filter(({ dateAndTime }) => {
			const performanceTimestamp = new Date(dateAndTime).getTime();
			return performanceTimestamp >= min && performanceTimestamp <= max;
		});
	};
</script>

<div>
	{#if itinerary}
		{#each itinerary.events as event}
			<div class="d-flex align-items-center event">
				<p class="event-times">
					{event.startTime}{#if event.endTime} {` - ${event.endTime}`}{/if}
				</p>
				<p class="event-description">{event.description}</p>
			</div>
			{#if event.containsPerformances}
				<div class="container-fluid">
					<div class="row">
						{#each getTimeslotPerformances(event) as performance}
							<div class="col-sm-12 col-md-6 col-xl-4" style="padding: 0; maring: 0;">
								<Performance compact={true} {performance} {conference} />
							</div>
						{/each}
					</div>
				</div>
				<!-- <div class="d-grid">
          {#each Object.entries(times) as [time, performances]}
            <div class="timeslot-text">
              {intlFormat(
                new Date(time),
                {
                  hour: '2-digit',
                  minute: '2-digit'
                },
                { locale: 'nb-NO' }
              )}
            </div>
            <div class="row">
              {#each performances as performance}
                <Performance {performance} {conference} />
              {/each}
            </div>
          {/each}
        </div> -->
			{/if}
			{#if event.info}
				<div class="p-3 ">
					<PortableText value={event.info} />
				</div>
			{/if}
		{/each}
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
	.event {
		color: white;
		background-color: #ef8181;
		padding: 15px;
		margin-bottom: 1px;
	}
	.event-times {
		font-weight: 500;
		margin-bottom: 0;
		padding-right: 5px;
	}

	.event-description {
		font-weight: 600;
		font-size: large;
		margin-bottom: 0;
	}
</style>
