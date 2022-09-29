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
	import TextPill from '../../components/TextPill.svelte';
	import Hoverable from '../../components/Hoverable.svelte';
  import { intlFormat } from 'date-fns';
	import { FileQuestion, ArrowLeft } from 'lucide-svelte';
	export let conference;
</script>

<svelte:head>
	<title>{conference.title} | Miles</title>
</svelte:head>

<div class="container">
	<BreadCrumb {conference} />
	{#if !conference.performances}
		<div class="d-flex align-items-center mb-5">
			<div class="me-3"><FileQuestion size="80"/></div>
			<div>
				<h1 class="mb-0">Her var det tomt, gitt.</h1>
				<p class="mb-0">Det er foreløpig ingen planlagte innslag fra Miles på {conference.title}.</p>
			</div>
		</div>
    <div>
      <a href="/"><ArrowLeft /> Tilbake til konferanseoversikten</a>
    </div>
	{:else}
		{#each conference.performances as performance}
			<Hoverable let:hovering={active}>
				<div class:active>
					<a href={`/konferanser/${conference.slug}/agenda/${performance.submission.slug}`}>
						<div class="d-flex align-items-center flex-row">
							<div
								class="link"
								class:isFinished={new Date().getTime() >
									new Date(performance.dateAndTime).getTime()}
							>
								{performance.submission.title}
							</div>
							{#if active}
                <TextPill
                  text={intlFormat(
                    new Date(performance.dateAndTime),
                    { year: 'numeric', month: 'short', day: 'numeric' },
                    { locale: 'nb-NO' }
                  )}
                />
							{/if}
						</div>
					</a>
				</div>
			</Hoverable>
		{/each}
	{/if}
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	.link {
		font-weight: 700;
		font-size: min(2vw, 100px);
		padding: 0em 0.5em;
		color: inherit;
		text-decoration: underline;
	}
	.active {
		background-color: black;
		color: white;
	}
	.isFinished {
		text-decoration: line-through;
	}
</style>
