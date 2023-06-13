<script lang="ts">
	import BreadCrumb from '../../../components/BreadCrumb.svelte';
	import { intlFormat } from 'date-fns';
	import DaySelect from '../../../components/DaySelect.svelte';
	import ExternalConferenceProgram from '../../../components/ExternalEventProgram.svelte';
	import InternalConferenceProgram from '../../../components/InternalEventProgram.svelte';

	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Button, { Icon } from '@smui/button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import InformationCard from '../../../components/InformationCard.svelte';
	import PerformanceCard from '../../../components/PerformanceCard.svelte';
	import { formatEventDateRange } from '$lib';
	import { PortableText, toPlainText } from '@portabletext/svelte';
	import type { IEvent } from '../../../model/event';
	import { urlFor } from '../../../utils/sanityclient-utils';
	import NoImage from '../../../components/no-image/NoImage.svelte';

	export let data = {};
	export let event = data.event as IEvent;
	export let pageUrl = data.url;

	const date = formatEventDateRange(event.startDate, event.endDate);

	const deadline = event.deadline
		? intlFormat(
				Date.parse(event.deadline),
				{ day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' },
				{ locale: 'nb-NO' }
		  )
		: '-';

	const eventDays = event.itinerary
		? event.itinerary
				.sort((a, b) => Date.parse(a.itineraryDate) - Date.parse(b.itineraryDate))
				.map((i) => new Date(i.itineraryDate).toDateString())
		: [];

	const dateOptions = eventDays.map((date) => [
		date,
		intlFormat(Date.parse(date), { weekday: 'long' }, { locale: 'nb-NO' }),
		intlFormat(Date.parse(date), { day: '2-digit', month: 'long' }, { locale: 'nb-NO' })
	]);

	let selectedDay = eventDays[0];

	let activeTab = 'Informasjon';

	const eventDetails = {
		Dato: date,
		Tidspunkt: event.timeperiod,
		Lokasjon: event.location ? event.location : '',
		Påmeldingsfrist: deadline ? deadline : ''
	};
</script>

<svelte:head>
	<title>{event.title} | Miles</title>
	<meta
		property="og:image"
		content={event.imageUrl ? urlFor(event.imageUrl).size(1200, 630).url() : undefined}
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{event.title} | Miles" />
	<meta
		property="og:description"
		content={event.description ? toPlainText(event.description) : undefined}
	/>
	<meta property="og:url" content={pageUrl} />
	<meta property="fb:app_id" content="966242223397117" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="{event.title} | Miles" />
	<meta
		property="twitter:description"
		content={event.description ? toPlainText(event.description) : undefined}
	/>
	<meta property="twitter:site" content="@miles_no" />
	<meta
		property="twitter:image"
		content={event.imageUrl ? urlFor(event.imageUrl).size(1200, 630).url() : undefined}
	/>
</svelte:head>

<div class="container">
	<BreadCrumb {event} />

	{#if event.imageUrl}
		<img
			style="width: 100%; border-radius: 10px; max-height: 400px;"
			alt=""
			src={event.imageUrl
				? urlFor(event.imageUrl).fit('clip').size(1600, 500).quality(100).url()
				: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
		/>
	{:else}
		<NoImage />
	{/if}
	<h1 class="title mdc-typography--headline4">{event.title}</h1>
	<div class="tabs-container">
		<TabBar
			tabs={event.itinerary ? ['Informasjon', 'Program'] : ['Informasjon']}
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
				<PortableText value={event.description} onMissingComponent={false} />
			</Cell>
			<Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
				><div class="info-section">
					<Button
						href={event.signupLink}
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
			{#if event.performances}
				<Cell span={12} style="margin-top:1rem;">
					<div class="mdc-typography--headline6">FOREDRAGSHOLDERE:</div>

					<div class="contributions-section">
						<LayoutGrid style="padding-left:0px; padding-right:0px;">
							{#each event.performances as performance}
								<Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
									<PerformanceCard {performance} rootSlug={event.slug} />
								</Cell>
							{/each}
						</LayoutGrid>
					</div></Cell
				>
			{/if}
		</LayoutGrid>
		<div />
	{:else}
		<DaySelect options={dateOptions} bind:selected={selectedDay} />
		<div class="pt-4">
			{#if event.internal}
				<InternalConferenceProgram event={event} day={selectedDay} />
			{:else}
				<ExternalConferenceProgram event={event} day={selectedDay} />
			{/if}
		</div>
	{/if}
</div>

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
