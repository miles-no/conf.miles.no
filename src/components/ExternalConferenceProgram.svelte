<script>
	import { FileQuestion, ArrowLeft } from 'lucide-svelte';
	import Performance from './Performance.svelte';
	import { intlFormat } from 'date-fns';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	export let conference;
	export let day;

	let performance_groups = [];
	if (conference.performances) {
		performance_groups = Object.values(conference.performances).reduce((pgs, e) => {
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
	}
	$: times = performance_groups[day] || false;
</script>

{#if !conference.performances || !times}
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
				new Date(day),
				{
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				},
				{ locale: 'nb-NO' }
			)}
		</div>

		{#each Object.entries(times) as [time, performances] (time)}
			<div
				animate:flip
				out:fade|local={{ duration: 200, key: time }}
				in:fade|local={{ duration: 200, key: time }}
			>
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
					{#each performances as performance (performance.submission._id)}
						<div class="col-sm-12 col-md-6 col-xl-4" style="padding: 0; maring: 0;">
							<Performance {performance} {conference} />
						</div>
					{/each}
				</div>
				<hr />
			</div>
		{/each}
	</div>
{/if}

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
