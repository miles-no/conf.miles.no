<script>
	import BreadCrumb from '../../../components/BreadCrumb.svelte';
	import { intlFormat } from 'date-fns';
	import DaySelect from '../../../components/DaySelect.svelte';
	import ExternalConferenceProgram from '../../../components/ExternalConferenceProgram.svelte';
	import InternalConferenceProgram from '../../../components/InternalConferenceProgram.svelte';

	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Button, { Icon } from '@smui/button';
	import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';

	import InformationCard from '../../../components/InformationCard.svelte';
	import PerformanceCard from '../../../components/PerformanceCard.svelte';
	import { formatConferenceDateRange } from '$lib';
	export let data = {};
	export let conference = data.conference;
	export let user = data.user;

	const start_time = conference.itinerary ? conference.itinerary[0]?.events[0].startTime : '';
	const date = formatConferenceDateRange(conference.startDate, conference.endDate);

	const formatDeadline = (deadline) => {
		const deadline_formated =
			deadline &&
			new Date(new Date(deadline).getTime() - new Date(deadline).getTimezoneOffset() * 60000)
				.toISOString()
				.split('T');
		const deadline_date = formatConferenceDateRange(deadline_formated[0], deadline_formated[0]);
		const deadline_time_array = deadline_formated[1].split(':');
		deadline_time_array.splice(2);
		const deadline_time = deadline_time_array.join(':');

		return [deadline_date, deadline_time];
	};

	const getDaysArray = (s, e) => {
		for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
			a.push(new Date(d));
		}
		return a;
	};

	console.log(conference);
	const deadline =
		conference.deadline &&
		`${formatDeadline(conference.deadline)[0]},${formatDeadline(conference.deadline)[1]}`;

	// Using all dates from start to end
	$: performanceDays =
		conference.performances == null
			? conference.itinerary == null
				? []
				: conference.itinerary
						.map((m) => {
							return new Date(m.itineraryDate);
						})
						.sort()
						.reverse()
						.map((m) => {
							return new Date(m).toDateString();
						})
			: conference.performances
					.map((m) => {
						return new Date(m.dateAndTime);
					})
					.sort()
					.map((m) => {
						return new Date(m).toDateString();
					});

	$: startDate = performanceDays.length > 0 ? performanceDays[0] : conference.startDate;
	$: endDate =
		performanceDays.length > 0 ? performanceDays[performanceDays.length - 1] : conference.endDate;

	$: dates = getDaysArray(startDate, endDate)
		.filter((f) => performanceDays.includes(f.toDateString()))
		.map((date) => [
			date.toDateString(),
			intlFormat(date, { weekday: 'long' }, { locale: 'nb-NO' }),
			intlFormat(date, { day: '2-digit', month: 'long' }, { locale: 'nb-NO' })
		]);

	$: day =
		new Date() >= new Date(startDate) && new Date() < new Date(endDate)
			? new Date().toDateString()
			: new Date(startDate).toDateString();

	let activeTab = 'Informasjon';

	const eventDetails = {
		Dato: date,
		Tidspunkt: start_time ? start_time : '',
		Lokasjon: conference.location ? conference.location : '',
		Påmeldingsfrist: deadline ? deadline : ''
	};
</script>

<svelte:head>
	<title>{conference.title} | Miles</title>
</svelte:head>

<class class="container">
	<!-- {@debug performanceDays} -->
	<BreadCrumb {conference} />
	{#if user.isAuthenticated}
		<DaySelect options={dates} bind:selected={day} />
		<div class="pt-4">
			{#if conference.internal}
				<InternalConferenceProgram {conference} {day} />
			{:else}
				<ExternalConferenceProgram {conference} {day} />
			{/if}
		</div>
	{:else}
		<h1 class="title mdc-typography--headline4">{conference.title}</h1>

		<TabBar tabs={['Informasjon', 'Program']} let:tab bind:active={activeTab}>
			<!-- Note: the `tab` property is required! -->
			<Tab {tab} minWidth>
				<Label>{tab}</Label>
			</Tab>
		</TabBar>

		{#if activeTab === 'Informasjon'}
			<LayoutGrid style="width:100%">
				<Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }} style="margin-right:2rem;"
					><div class="description-section">{conference.description}</div></Cell
				>
				<Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
					><div class="info-section">
						<Button
							href={conference.signupLink}
							target="_blank"
							touch
							variant="raised"
							style="width: 100%"
						>
							<Icon class="material-icons">add</Icon>
							<Label>Meld deg på</Label>
						</Button>

						<InformationCard information={eventDetails} />
					</div></Cell
				>
				{#if conference.performances}
					<Cell span={12} style="margin-top:1rem;">
						<div class="mdc-typography--headline6">BIDRAG:</div>

						<div class="contributions-section">
							<LayoutGrid style="padding-left:0px; padding-right:0px;">
								{#each conference.performances as performance}
									<Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
										<PerformanceCard {performance} rootSlug={conference.slug} />
									</Cell>
								{/each}
							</LayoutGrid>
						</div></Cell
					>
				{/if}
			</LayoutGrid>
			<div />
		{:else}
			<DaySelect options={dates} bind:selected={day} />
			<div class="pt-4">
				{#if conference.internal}
					<InternalConferenceProgram {conference} {day} />
				{:else}
					<ExternalConferenceProgram {conference} {day} />
				{/if}
			</div>
		{/if}
	{/if}
</class>

<style>
	.title {
		font-weight: bold;
	}
	.container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.info-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		min-width: 356px;
	}

	.description-section {
		white-space: pre-wrap;
	}
</style>
