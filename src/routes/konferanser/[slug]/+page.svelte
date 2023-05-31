<script lang="ts">
	import BreadCrumb from '../../../components/BreadCrumb.svelte';
	import { intlFormat } from 'date-fns';
	import DaySelect from '../../../components/DaySelect.svelte';
	import ExternalConferenceProgram from '../../../components/ExternalConferenceProgram.svelte';
	import InternalConferenceProgram from '../../../components/InternalConferenceProgram.svelte';

	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Button, { Icon } from '@smui/button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import InformationCard from '../../../components/InformationCard.svelte';
	import PerformanceCard from '../../../components/PerformanceCard.svelte';
	import { formatConferenceDateRange } from '$lib';
	import { PortableText, toPlainText } from '@portabletext/svelte';
	import type { IConference } from '../../../model/conference';
	import { urlFor } from '../../../utils/sanityclient-utils';

	export let data = {};
	export let conference = data.conference as IConference;
	export let pageUrl = data.url;

	const date = formatConferenceDateRange(conference.startDate, conference.endDate);

	const deadline = conference.deadline
		? intlFormat(
				Date.parse(conference.deadline),
				{ day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' },
				{ locale: 'nb-NO' }
		  )
		: '-';

	const eventDays = conference.itinerary
		? conference.itinerary
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
		Tidspunkt: conference.timeperiod,
		Lokasjon: conference.location ? conference.location : '',
		Påmeldingsfrist: deadline ? deadline : ''
	};
</script>

<svelte:head>
	<title>{conference.title} | Miles</title>
	<meta
		property="og:image"
		content={conference.imageUrl ? urlFor(conference.imageUrl).size(1200, 630).url() : undefined}
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{conference.title} | Miles" />
	<meta
		property="og:description"
		content={conference.description ? toPlainText(conference.description) : undefined}
	/>
	<meta property="og:url" content={pageUrl} />
	<meta property="fb:app_id" content="966242223397117" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="{conference.title} | Miles" />
	<meta
		property="twitter:description"
		content={conference.description ? toPlainText(conference.description) : undefined}
	/>
	<meta property="twitter:site" content="@miles_no" />
	<meta
		property="twitter:image"
		content={conference.imageUrl ? urlFor(conference.imageUrl).size(1200, 630).url() : undefined}
	/>
</svelte:head>

<div class="container">
	<BreadCrumb {conference} />

	{#if conference.imageUrl}
		<img
			style="width: 100%; border-radius: 10px; max-height: 400px;"
			alt=""
			src={conference.imageUrl
				? urlFor(conference.imageUrl).fit('clip').size(1600, 500).quality(100).url()
				: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
		/>
	{/if}
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
				<PortableText value={conference.description} onMissingComponent={false} />
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
		<DaySelect options={dateOptions} bind:selected={selectedDay} />
		<div class="pt-4">
			{#if conference.internal}
				<InternalConferenceProgram {conference} day={selectedDay} />
			{:else}
				<ExternalConferenceProgram {conference} day={selectedDay} />
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
