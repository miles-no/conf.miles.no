<script lang="ts">
	import Button, { Icon } from '@smui/button';
	import { Label } from '@smui/tab';
	import EventCard from './EventCard.svelte';
	import type { IConference } from '../model/conference';
	import NextEventCard from './dashboard/card/next-event-card/NextEventCard.svelte';
	import type { User } from '$lib/types/user';
	import ConferenceModal from './conferance/conferenceModal/ConferenceModal.svelte';
	import UpcomingDeadlineCard from './dashboard/card/upcoming-deadline-card/UpcomingDeadlineCard.svelte';
	import { formatDate } from '../utils/date-time-utils';

	interface IConferenceMapByMonth {
		[key: string]: IConference[];
	}

	export let conferences: IConference[];
	export let user: User;

	$: myNextEvent = conferences
		.filter((c) => c.employees?.map((e) => e.email).includes(user.email))
		.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))[0];

	$: conferenceSortByDeadline = conferences
		.filter((c) => c.deadline && Date.parse(c.deadline) > Date.now())
		.sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));

	$: upcomingDeadlines =
		conferenceSortByDeadline.length <= 3
			? conferenceSortByDeadline
			: conferenceSortByDeadline.splice(0, 3);

	let open = false;

	$: allMonths = Array.from(
		new Set(
			conferences
				?.filter((c) => Date.parse(c.startDate) >= Date.now())
				?.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))
				.map((c) => formatDate(c.startDate, { month: 'long' }))
		)
	);

	$: conferenceMapByMonth = allMonths?.reduce((previousValue, currentValue) => {
		const filtered = conferences?.filter(
			(c) => formatDate(c.startDate, { month: 'long' }) === currentValue
		);
		if (filtered !== undefined) {
			return {
				...previousValue,
				[currentValue]: filtered
			};
		}
	}, undefined as IConferenceMapByMonth | undefined);
</script>

<div class="dashboard-container">
	<h1 class="visuallyhidden">Dette skjer hos oss i Miles</h1>
	<div class="next-event-and-upcoming-deadline-container">
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
	<div class="create-new-event-container">
		<Button variant="raised" class="create-new-event-btn">
			<Icon class="material-icons">add</Icon>
			<Label>Opprett nytt</Label>
		</Button>
	</div>
	<div class="filter-container">
		<div class="filter-content">Filter content placeholder</div>
	</div>
	<div class="main-container">
		<div class="main-content">
			{#if allMonths.length > 0 && conferenceMapByMonth}
				{#each allMonths as month}
					<h3 class="month">{month}</h3>
					<ul class="main-content-events-list-container">
						{#each conferenceMapByMonth[month] as event}
							<li>
								<EventCard {event} />
							</li>
						{/each}
					</ul>
				{/each}
			{/if}
		</div>
	</div>
	<div class="favorite-container">
		<div class="favorite-content">Favorite content</div>
	</div>
	{#if myNextEvent}
		<ConferenceModal bind:open conference={myNextEvent} {user} />
	{/if}
</div>

<style lang="scss">
	@use '../styles/mixin' as *;
	@use '../styles/colors' as *;

	h2 {
		font-size: 1.25rem;
		letter-spacing: 0.16px;
		font-weight: 600;
		text-transform: uppercase;
	}

	h3 {
		font-size: 1.15rem;
		letter-spacing: 0.16px;
	}

	.visuallyhidden {
		@include visuallyhidden();
	}
	.next-event-and-upcoming-deadline-container {
		grid-area: nextEventAndUpcomingDeadline;
	}
	.create-new-event-container {
		grid-area: createNewEvent;
	}
	.filter-container {
		grid-area: filterContent;
	}
	.main-container {
		grid-area: main;
	}
	.favorite-container {
		grid-area: favorite;
	}

	.dashboard-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		.next-event-and-upcoming-deadline-container {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}
		.create-new-event-container {
			display: flex;
			justify-content: end;
			:global(.create-new-event-btn) {
				width: 14rem;
				text-transform: uppercase !important;
			}
		}

		.main-container {
			.main-content {
				text-transform: capitalize;

				.main-content-events-list-container {
					list-style: none;
					padding: 0;
				}
			}
		}
	}

	@media (min-width: 1200px) {
		.dashboard-container {
			display: grid;
			grid-template-columns: 18rem auto 18rem;
			gap: 1rem;
			grid-template-areas:
				'. nextEventAndUpcomingDeadline createNewEvent'
				'filterContent main favorite';

			.next-event-and-upcoming-deadline-container {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1rem;
			}

			.create-new-event-container {
				display: flex;
				align-items: center;

				:global(.create-new-event-btn) {
					width: 100%;
				}
			}

			.filter-container,
			.main-container,
			.favorite-container {
				border: 1px solid black;
			}

			.main-container {
				padding: 1rem;
				.main-content {
					.main-content-events-list-container {
						display: grid;
						grid-template-columns: repeat(3, 1fr);
						gap: 1rem;
					}
				}
			}
		}
	}
</style>
