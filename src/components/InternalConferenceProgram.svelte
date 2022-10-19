<script>
  import { format, intlFormat } from 'date-fns';
  import { FileQuestion } from 'lucide-svelte';
  import { PortableText } from '@portabletext/svelte';
  import Performance from './Performance.svelte';
  export let conference;
  export let day;
  $: itinerary = conference.itinerary.find(i => i.itineraryDate == format(new Date(day), 'yyyy-MM-dd'));

  const getTimeslotPerformances = ({ startTime, endTime}) => {
    const min = new Date(`${day} ${startTime}`).getTime();
    const max = new Date(`${day} ${endTime}`).getTime();
    return conference.performances.filter(({ dateAndTime }) => {
      const performanceTimestamp = new Date(dateAndTime).getTime();
      return performanceTimestamp > min && performanceTimestamp < max;
    });
  }
</script>

<div>
  {#if itinerary}
    {#each itinerary.events as event}
      <div class="d-flex align-items-center event">
        <p class="event-times">{event.startTime}{#if event.endTime} {` - ${event.endTime}`}{/if}</p>
        <p class="event-description">{event.description}</p>
      </div>
      {#if event.containsPerformances}
        {#each getTimeslotPerformances(event) as performance}
          <Performance {performance} {conference} />
        {/each}
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
        <div class="p-3">
          <PortableText value={event.info} />
        </div>
      {/if}
    {/each}
  {:else}
    <div class="d-flex align-items-center mb-5">
      <div class="me-3"><FileQuestion size="80" /></div>
      <div>
        <h1 class="mb-0">Her var det tomt, gitt.</h1>
        <p class="mb-0">
          Det foreligger foreløpig ikke noe program for {conference.title} denne dagen.
        </p>
      </div>
    </div>
  {/if}
</div>

<style>
  .event {
    color: white;
    background-color: #EF8181;
    padding: 15px;
    margin-bottom: 1px;
  }

  .event-times {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 0;
    padding-right: 5px;
  }

  .event-description {
    font-weight: 600;
    font-size: 32px;
    margin-bottom: 0;
  }
</style>