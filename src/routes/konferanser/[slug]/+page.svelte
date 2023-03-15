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
	import { Media, MediaContent } from '@smui/card';
	import InformationCard from '../../../components/InformationCard.svelte';
	import PerformanceCard from '../../../components/PerformanceCard.svelte';
	import { formatConferenceDateRange } from '$lib';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '$lib/sanityClient';
	import { PortableText } from '@portabletext/svelte';
	export let data = {};
	export let conference = data.conference;
	export let user = data.user;

	// const totEvents = conference.itinerary[0]?.events.length;
	// const end_time = conference.itinerary[0]?.events[totEvents - 1].endTime
	// 	? conference.itinerary[0]?.events[totEvents - 1].endTime
	// 	: conference.itinerary[0]?.events[totEvents - 1].startTime;

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
		Tidspunkt: conference.timeperiod,
		Lokasjon: conference.location ? conference.location : '',
		Påmeldingsfrist: deadline ? deadline : ''
	};

	const builder = imageUrlBuilder(client);

	function urlFor(source) {
		return builder.image(source);
	}
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
		<img
			style="width: 100%; border-radius: 10px; max-height: 400px;"
			alt=""
			src={conference.imageUrl
				? urlFor(conference.imageUrl).fit('clip').size(1600, 500).quality(100).url()
				: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
		/>

		<h1 class="title mdc-typography--headline4">{conference.title}</h1>
		<div class="tabs-container">
			<TabBar
				tabs={conference.itinerary ? ['Informasjon', 'Program'] : ['Informasjon']}
				let:tab
				bind:active={activeTab}
				style="width:fit-content"
			>
				<!-- Note: the `tab` property is required! -->
				<Tab {tab} minWidth>
					<Label>{tab}</Label>
				</Tab>
			</TabBar>
		</div>

		{#if activeTab === 'Informasjon'}
			<LayoutGrid style="width:100%">
				<Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
					<PortableText value={conference.description} />
				</Cell>
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
						<div class="mdc-typography--headline6">FOREDRAGSHOLDERE:</div>

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
		font-size: 1.5rem;
	}
	.container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.tabs-container {
		widows: 100%;
		display: flex;
		justify-content: center;
	}
	.info-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	.description-section {
		text-align: center;
		white-space: pre-wrap;
	}

	/* img {
		height: 200px;
	} */

	@media (min-width: 576px) {
		/* img {
			height: 300px;
		} */
		.info-section {
			min-width: 356px;
		}
		.title {
			font-weight: bold;
			font-size: 2.125rem;
		}
		.tabs-container {
			justify-content: left;
		}
		.description-section {
			text-align: start;
			margin-right: 2rem;
		}
	}
</style>
