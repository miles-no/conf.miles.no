<script lang="ts">
	import Button, { Icon } from '@smui/button';
	import type { IEvent } from '../model/event';
	import NextEventCard from './dashboard/card/next-event-card/NextEventCard.svelte';
	import type { User } from '$lib/types/user';
	import ConferenceModal from './conferance/conferenceModal/ConferenceModal.svelte';
	import UpcomingDeadlineCard from './dashboard/card/upcoming-deadline-card/UpcomingDeadlineCard.svelte';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Paper, { Content } from '@smui/paper';
	import EventListContainer from './dashboard/container/event-list-container/EventListContainer.svelte';

	export let events: IEvent[];
	export let user: User;

	$: myNextEvent = events
		.filter((c) => c.employees?.map((e) => e.email).includes(user.email))
		.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))[0];

	$: eventSortByDeadline = events
		.filter((c) => c.deadline && Date.parse(c.deadline) > Date.now())
		.sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));

	$: upcomingDeadlines =
		eventSortByDeadline.length <= 3 ? eventSortByDeadline : eventSortByDeadline.splice(0, 3);

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
	<div class="main-content-container">
		<Paper variant="outlined" class="tab-container">
			<Content>
				<div class="tab-container-content">
					<TabBar tabs={['Liste', 'Kalender', 'Mine utvalgte']} let:tab bind:active={activeTab}>
						<Tab {tab} class="tab-item" minWidth>
							<Label>{tab}</Label>
						</Tab>
					</TabBar>
					{#if activeTab === 'Liste'}
						<EventListContainer {events} />
					{/if}
				</div>
			</Content>
		</Paper>

		<Paper variant="outlined" class="my-chosen-container">
			<Content>
				<h2>Mine utvalgte</h2>
			</Content>
		</Paper>
	</div>
	{#if myNextEvent}
		<ConferenceModal bind:open conference={myNextEvent} {user} />
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

	.dashboard-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		.create-new-event-container {
			display: flex;
			justify-content: flex-end;
		}

		:global(.tab-container) {
			padding: 1rem;
		}

		:global(.my-chosen-container) {
			display: none;
		}
	}

	@media (min-width: 970px) {
		.dashboard-container {
			.next-event-and-upcoming-deadline-container {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1rem;
			}

			:global(.my-chosen-container) {
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
			grid-template-columns: 1fr 0.3fr;
			gap: 2rem;

			.list-container {
				li {
					width: 22rem !important;
				}
			}
			:global(.tab-container) {
				height: 80rem;
				overflow-y: scroll;
			}

			:global(.my-chosen-container) {
				display: unset;
				height: 80rem;
			}

			:global(.tab-item:last-child) {
				display: none !important;
			}
		}
	}
</style>
