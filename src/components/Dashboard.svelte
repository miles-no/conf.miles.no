<script lang="ts">
	import Button, { Icon } from '@smui/button';
	import type { IEvent } from '../model/event';
	import NextEventCard from './dashboard/card/next-event-card/NextEventCard.svelte';
	import type { User } from '$lib/types/user';
	import ConferenceModal from './conference/conferenceModal/ConferenceModal.svelte';
	import UpcomingDeadlineCard from './dashboard/card/upcoming-deadline-card/UpcomingDeadlineCard.svelte';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Paper, { Content } from '@smui/paper';
	import EventListContainer from './dashboard/container/event-list-container/EventListContainer.svelte';
	import MyUpcomingEventsContainer from './dashboard/container/my-upcoming-events-container/MyUpcomingEventsContainer.svelte';
	import EventTypeButtonGroup from './button/event-type-button-group/EventTypeButtonGroup.svelte';
	import LocationButtonGroup from './button/location-button-group/LocationButtonGroup.svelte';
	import type { LocationType } from '../enums/location';
	import type { EventType } from '../enums/event';

	export let events: IEvent[];
	export let user: User;

	$: myUpcomingEvents = events
		.filter(
			(c) =>
				c.employees?.map((e) => e.email).includes(user.email) &&
				Date.parse(c.startDate) > Date.now()
		)
		.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));

	$: firstUpcomingEvent = myUpcomingEvents[0];

	$: eventSortByDeadline = events
		.filter((c) => c.deadline && Date.parse(c.deadline) > Date.now())
		.sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));

	$: upcomingDeadlines =
		eventSortByDeadline.length <= 3 ? eventSortByDeadline : eventSortByDeadline.splice(0, 3);

	$: eventsToShow = [...events];
	let selectedCity: LocationType | undefined = undefined;
	let selectedEventType: EventType | undefined = undefined;

	$: {
		if (selectedCity) {
			eventsToShow = events
				.filter(event =>
					event.visibleTo?.includes(selectedCity!)
				)
				.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
		}
	}

	$: {
		if (selectedEventType) {
			eventsToShow = events
				.filter((event) => event.eventType?.includes(selectedEventType!))
				.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
		}
	}

	let open = false;

	let activeTab = 'Liste';
</script>

<div class="dashboard-container">
	<h1 class="visuallyhidden">Dette skjer hos oss i Miles</h1>
	<div class="create-new-event-container">
		<Button variant="raised" class="create-new-event-btn">
			<Icon class="material-icons">add</Icon>
			<Label>Opprett nytt</Label>
		</Button>
	</div>
	<div class="next-event-and-upcoming-deadline-container">
		<div>
			<h2>Ditt neste arrangement</h2>
			{#if firstUpcomingEvent}
				<NextEventCard myNextEvent={firstUpcomingEvent} handleModal={() => (open = !open)} />
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
	<div class="page-container-filter">
		<LocationButtonGroup bind:selectedCity />
		<EventTypeButtonGroup bind:selectedEvent={selectedEventType} />
	</div>
	<div class="main-content-container">
		<Paper variant="outlined" class="tab-container">
			<Content>
				<div class="tab-container-content">
					<TabBar tabs={['Liste', 'Kalender', 'Mine utvalgte']} let:tab bind:active={activeTab}>
						<Tab {tab} class="tab-item" minWidth>
							<Label>{tab}</Label>
						</Tab>
					</TabBar>
					<div class="tab-content-container">
						{#if activeTab === 'Liste'}
							<EventListContainer events={eventsToShow} />
						{/if}
						{#if activeTab === 'Mine utvalgte'}
							<div class="tab-content__my-upcoming-events-container">
								<MyUpcomingEventsContainer {myUpcomingEvents} />
							</div>
						{/if}
					</div>
				</div>
			</Content>
		</Paper>

		<Paper variant="outlined" class="dashboard-my-upcoming-events-container">
			<Content>
				<h2>Mine arrangementer</h2>
				<MyUpcomingEventsContainer {myUpcomingEvents} />
			</Content>
		</Paper>
	</div>
	{#if firstUpcomingEvent}
		<ConferenceModal bind:open conference={firstUpcomingEvent} {user} />
	{/if}
</div>

<style lang="scss">
	@use '../styles/mixin' as *;

	h2 {
		font-size: 1.25rem;
		letter-spacing: 0.3px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.visuallyhidden {
		@include visuallyhidden();
	}

	.page-container-filter {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-bottom: 1.5rem;
	}

	.dashboard-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		.create-new-event-container {
			display: flex;
			justify-content: flex-end;
		}

		.tab-content-container {
			padding-top: 1.5rem;
		}
		:global(.tab-container) {
			padding: 1rem;
		}
		:global(.dashboard-my-upcoming-events-container) {
			display: none;
		}

		:global(.tab-item) {
			padding-left: 0.7rem;
			padding-right: 0.7rem;
		}
	}

	@media (min-width: 970px) {
		.dashboard-container {
			.next-event-and-upcoming-deadline-container {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1rem;
			}

			:global(.dashboard-my-upcoming-events-container) {
				display: none;
			}

			:global(.tab-item:last-child) {
				display: unset;
			}
		}
	}

	@media (min-width: 1280px) {
		.main-content-container {
			display: grid;
			grid-template-columns: auto 0.3fr;
			gap: 2rem;

			:global(.tab-container) {
				min-height: 80rem;
			}

			:global(.dashboard-my-upcoming-events-container) {
				display: unset;
				padding: 1rem;
				min-height: 80rem;
			}

			:global(.tab-item:last-child) {
				display: none !important;
			}

			.tab-content__my-upcoming-events-container {
				display: none;
			}
		}
	}
</style>
