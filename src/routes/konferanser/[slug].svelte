<script context="module">
	import client from '../../sanityClient';
	export async function load({ params }) {
		const { slug } = params;

		const conference = await client.fetch(
			/* groq */ `
			*[
				_type == "conference" &&
				slug.current == $slug
			][0] {
				...,
				"slug": slug.current,
				"imageUrl": image.asset->url,
				performances[]{
					dateAndTime,
					location,
					performanceUrls,
					submission->{..., "slug": slug.current, authors[]->{..., "imageUrl": image.asset->url}}
				}
			}
		`,
			{ slug }
		);

		if (!conference) {
			return {
				status: 404
			};
		}

		return {
			props: {
				conference
			}
		};
	}
</script>

<script>
	import BreadCrumb from '../../components/BreadCrumb.svelte';
	import { FileQuestion, ArrowLeft } from 'lucide-svelte';
	import { intlFormat } from 'date-fns';
	import Performance from '../../components/Performance.svelte';
	import DaySelect from '../../components/DaySelect.svelte';
	export let conference;

	var getDaysArray = function (s, e) {
		for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
			a.push(new Date(d));
		}
		return a;
	};

	const { startDate, endDate, performances } = conference;

	//Using all dates from start to end
	let dates = getDaysArray(startDate, endDate).map((date) => [
		date.toDateString(),
		intlFormat(date, { weekday: 'long' }, { locale: 'nb-NO' }),
		intlFormat(date, { day: '2-digit', month: 'long' }, { locale: 'nb-NO' })
	]);

	/*
	//Using the dates with actual performances
	let dates = performances
		.map(({ dateAndTime }) => [
			new Date(dateAndTime).toDateString(),
			[
				intlFormat(new Date(dateAndTime), { weekday: 'long' }, { locale: 'nb-NO' }),
				intlFormat(new Date(dateAndTime), { day: '2-digit', month: 'long' }, { locale: 'nb-NO' })
			]
		])
		.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
	*/

	let performance_groups = Object.values(performances).reduce((pgs, e) => {
		let timeStamp = new Date(e.dateAndTime);
		let date = timeStamp.toDateString();
		return {
			...pgs,
			[date]: {
				...pgs[date],
				[timeStamp]: [...(pgs[date]?.[timeStamp] || []), e]
			}
		};
	}, {});

	let day = new Date(startDate).toDateString();
	$: times = performance_groups[day];
</script>

<svelte:head>
	<title>{conference.title} | Miles</title>
</svelte:head>

<div class="container-lg">
	<BreadCrumb {conference} />
	<div class="d-flex flex-row gap-5">
		{#each dates as [key, day_text, month_text]}
			<DaySelect bind:group={day} topText={day_text} bottomText={month_text} val={key} />
		{/each}
	</div>
	{#if !conference.performances}
		<div class="d-flex align-items-center mb-5">
			<div class="me-3"><FileQuestion size="80" /></div>
			<div>
				<h1 class="mb-0">Her var det tomt, gitt.</h1>
				<p class="mb-0">
					Det er foreløpig ingen planlagte innslag fra Miles på {conference.title}.
				</p>
			</div>
		</div>
		<div>
			<a href="/"><ArrowLeft /> Tilbake til konferanseoversikten</a>
		</div>
	{:else}
		<div class="d-flex justify-content-center" />
		<div class="d-grid">
			<div class="group-text">
				{intlFormat(
					new Date(Object.keys(times).length > 0 ? Object.keys(times)[0] : ''),
					{
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					},
					{ locale: 'nb-NO' }
				)}
			</div>

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
				<hr class="dark" />
			{/each}
		</div>
	{/if}
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	hr {
		background-color: #ef8181;
	}
	.group-text {
		font-size: xx-large;
		font-weight: 800;
	}
	.timeslot-text {
		font-size: large;
		font-weight: 800;
	}
</style>
