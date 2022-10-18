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
	import { daysInWeek, intlFormat } from 'date-fns';
	import Performance from '../../components/Performance.svelte';
	export let conference;

	let performancegroups = {};
	if (conference.performances) {
		for (let e of Object.values(conference.performances)) {
		let key = new Date(e.dateAndTime);
		if (performancegroups[key] === undefined) {
			performancegroups[key] = [];
		}
		performancegroups[key].push(e);
	}
	}
	
	$: pgr = Object.entries(performancegroups);
</script>

<svelte:head>
	<title>{conference.title} | Miles</title>
</svelte:head>

<div class="container">
	<BreadCrumb {conference} />
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
			{#each pgr as [day, performances]}
				<div class="group-text">
					{intlFormat(
					new Date(day),
					{
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					},
					{ locale: 'nb-NO' }
				)}
				</div>
				<div class="row mb-5">
					{#each performances.sort() as performance}
						<Performance {performance} {conference} />
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	.group-text {
		font-size: xx-large;
		font-weight: 800;
	}
</style>
