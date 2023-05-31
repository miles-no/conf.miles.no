<script lang="ts">
	import Conference from './Conference.svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import EventCard from './EventCard.svelte';
	import SmallConferenceCard from './SmallConferenceCard.svelte';
	import type { IConference } from '../model/conference';

	export let conferences: IConference[];

	const futureEvents = conferences.filter(
		(conf: IConference) => Date.parse(conf.startDate) >= Date.now()
	);

	const pastEvents = conferences.filter(
		(conf: IConference) => Date.parse(conf.endDate) < Date.now()
	);

	const todaysEvents = conferences.filter(
		(conf: IConference) =>
			Date.parse(conf.startDate) <= Date.now() && Date.now() <= Date.parse(conf.endDate)
	);
</script>

<div>
	<LayoutGrid>
		<Cell span={4}>
			{#if todaysEvents.length > 0}
				<h1>Det neste arrangementet</h1>
				<EventCard event={todaysEvents[todaysEvents.length - 1]} />
			{:else if futureEvents.length > 0}
				<h1>Det neste arrangementet</h1>
				<EventCard event={futureEvents[futureEvents.length - 1]} />
			{/if}
		</Cell>
		<Cell span={8}>
			<h1>Kommende arrangementer</h1>
			{#each futureEvents.reverse() as conference (conference.title)}
				<SmallConferenceCard {conference} />
			{/each}
		</Cell>
		<Cell span={8}>
			<h1>Tidligere arrangementer</h1>
			{#each pastEvents.reverse() as conference (conference.title)}
				<Conference {conference} />
			{/each}
		</Cell>
	</LayoutGrid>
</div>
