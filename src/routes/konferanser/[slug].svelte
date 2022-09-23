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
					submission->{...,authors[]->{..., "imageUrl": image.asset->url}}
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
	import Cards from '../../components/Cards.svelte';
	import Date from '../../components/Date.svelte';
	export let conference;
</script>

<svelte:head>
	<title>Miles @ {conference.title}</title>
</svelte:head>

<div class="container-fluid">
	<div class="d-none d-md-block">
		<Date startdate={conference.startDate} enddate={conference.endDate} />
	</div>
	<Cards conference={conference} />
</div>
