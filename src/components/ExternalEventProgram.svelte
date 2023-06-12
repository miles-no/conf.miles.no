<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import Performance from './Performance.svelte';
	import { intlFormat } from 'date-fns';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { IEvent } from '../model/event';
	export let event: IEvent;
	export let day;

	let performance_groups = [];
	if (event.performances) {
		performance_groups = Object.values(event.performances).reduce((pgs, e) => {
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

{#if !event.performances || !times}
	<!-- <div class="d-flex flex-column mb-5">
		<h1 class="mb-0">Her var det tomt, gitt.</h1>
		<p class="mb-0">
			Det er foreløpig ingen planlagte innslag fra Miles på {conference.title}.
		</p>
	</div> -->
	<div class="d-flex flex-row align-center">
		<a href="/"><ArrowLeft /> Tilbake til konferanseoversikten</a>
	</div>
{:else}
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
	<div class="d-grid">
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
							<Performance {performance} event={event} />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	a {
		text-decoration: none;
		color: inherit;
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
