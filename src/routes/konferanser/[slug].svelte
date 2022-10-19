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
	import { intlFormat } from 'date-fns';
	import DaySelect from '../../components/DaySelect.svelte';
  import ExternalConferenceProgram from '../../components/ExternalConferenceProgram.svelte';
  import InternalConferenceProgram from '../../components/InternalConferenceProgram.svelte';
	export let conference;

	var getDaysArray = function (s, e) {
		for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
			a.push(new Date(d));
		}
		return a;
	};

	const { startDate, endDate } = conference;

	// Using all dates from start to end
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

	let day = new Date(startDate).toDateString();
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
  <div class="pt-5">
    {#if conference.internal}
      <InternalConferenceProgram {conference} {day} />
    {:else}
      <ExternalConferenceProgram {conference} {day} />
    {/if}
  </div>
</div>
