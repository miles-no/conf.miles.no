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

	let performance_groups = Object.values(conference.performances).reduce((pgs, e) => {
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


	let day = "lørdag";
</script>

<svelte:head>
	<title>{conference.title} | Miles</title>
</svelte:head>

<div class="container-lg">
	<BreadCrumb {conference} />
	<div class="d-flex flex-row gap-5">
		<DaySelect bind:group={day} 
			topText={"Lørdag"} 
			bottomText={"29.oktober"}
			val={"lørdag"}/>
			<DaySelect bind:group={day} 
			topText={"Søndag"} 
			bottomText={"30.oktober"}
			val={"søndag"}/>
			<DaySelect bind:group={day} 
			topText={"Praktisk info"} 
			bottomText={"Greit å vite"}
			val={"Pi"}/>
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
			{#each Object.entries(performance_groups) as [_, times]}
				{#if Object.entries(times).length === 1}
					<div class="group-text">
						{intlFormat(
							new Date(Object.keys(times).length > 0 ? Object.keys(times)[0] : ''),
							{
								year: 'numeric',
								month: 'short',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit'
							},
							{ locale: 'nb-NO' }
						)}
					</div>
					{#each Object.entries(times) as [_, performances]}
						<div class="row mb-5">
							{#each performances as performance}
								<Performance {performance} {conference} />
							{/each}
						</div>
					{/each}
				{:else}
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
					<hr class="dark" />
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
						<div class="row mb-5">
							{#each performances as performance}
								<Performance {performance} {conference} />
							{/each}
						</div>
					{/each}
				{/if}
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
