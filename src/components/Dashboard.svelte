<script lang="ts">
	import Conference from './Conference.svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import EventCard from './EventCard.svelte';
	import SmallConferenceCard from './SmallConferenceCard.svelte';
	import type { IConference } from '../model/conference';
	import NextEventCard from './dashboard/card/next-event-card/NextEventCard.svelte';
	import type { User } from '$lib/types/user';
	import ConferenceModal from './conferance/conferenceModal/ConferenceModal.svelte';
	import UpcomingDeadlineCard from './dashboard/card/upcoming-deadline-card/UpcomingDeadlineCard.svelte';

	export let conferences: IConference[];
	export let user: User;

	$: myNextEvent = conferences
		.filter((c) => c.employees?.map((e) => e.email).includes(user.email))
		.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))[0];

	$: conferenceSortByDeadline = conferences
		.filter((c) => c.deadline && Date.parse(c.deadline) > Date.parse(new Date().toDateString()))
		.sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));

	$: upcomingDeadlines =
		conferenceSortByDeadline.length <= 3
			? conferenceSortByDeadline
			: conferenceSortByDeadline.splice(0, 3);

	const futureEvents = conferences.filter(
		(conf: IConference) => Date.parse(conf.startDate) >= Date.now()
	);

	const pastEvents = conferences.filter(
		(conf: IConference) => Date.parse(conf.endDate) < Date.now()
	);

	const nextEvent = conferences
		.filter(
			(conf: IConference) =>
				Date.parse(conf.startDate) <= Date.now() && Date.now() <= Date.parse(conf.endDate)
		)
		.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))[0];

	let open = false;
</script>

<div class="dashboard-container">
	<h1 class="visuallyhidden">Dette skjer hos oss i Miles</h1>
	<div class="top-content">
		<div>
			<h2>Ditt neste arrangement</h2>
			{#if myNextEvent}
				<NextEventCard {myNextEvent} handleModal={() => (open = !open)} />
			{:else}
				<p>Du har ingen påmeldte arrangement</p>
			{/if}
		</div>
		<div>
			<h2>Kommende frister</h2>
			{#if upcomingDeadlines.length > 0}
				<UpcomingDeadlineCard {upcomingDeadlines} />
			{:else}
				<p>Ingen kommende frister</p>
			{/if}
		</div>
	</div>
	<LayoutGrid>
		<Cell span={4}>
			{#if nextEvent}
				<h2>Det neste arrangementet</h2>
				<EventCard event={nextEvent} />
			{:else if futureEvents.length > 0}
				<h2>Det neste arrangementet</h2>
				<EventCard event={futureEvents[futureEvents.length - 1]} />
			{/if}
		</Cell>
		<Cell span={8}>
			<h2>Kommende arrangementer</h2>
			{#each futureEvents.reverse() as conference (conference.title)}
				<SmallConferenceCard {conference} />
			{/each}
		</Cell>
		<Cell span={8}>
			<h2>Tidligere arrangementer</h2>
			{#each pastEvents.reverse() as conference (conference.title)}
				<Conference {conference} />
			{/each}
		</Cell>
	</LayoutGrid>
	{#if myNextEvent}
		<ConferenceModal bind:open conference={myNextEvent} {user} />
	{/if}
</div>

<style lang="scss">
	@use '../styles/mixin' as *;
	@use '../styles/colors' as *;

	.dashboard-container {
		h2 {
			font-size: 1.25rem;
			letter-spacing: 0.16px;
			font-weight: 600;
			text-transform: uppercase;
		}
	}
	.visuallyhidden {
		@include visuallyhidden();
	}
	.top-content {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
</style>
