<script>
	import { PortableText } from '@portabletext/svelte';
	import { compareAsc } from 'date-fns';
	import { performances as performances_store } from '../stores/performances.ts';
	import PerformanceRow from './PerformanceRow.svelte';

	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	
    export let event;
	export let conference;
	export let day;

	const getTimeslotPerformances = ({ startTime, endTime }) => {
		const min = new Date(`${day} ${startTime}`).getTime();
		const max = new Date(`${day} ${endTime}`).getTime();
		return conference.performances
			.filter(({ dateAndTime }) => {
				const performanceTimestamp = new Date(dateAndTime).getTime();
				return performanceTimestamp >= min && performanceTimestamp <= max;
			})
			.sort((a, b) => {
				return compareAsc(new Date(a.dateAndTime), new Date(b.dateAndTime));
			});
	};

	let only_selected = false;
</script>

{#if event.containsPerformances}
	<ul class="alt-ul">
		<li>
			<div class="selector-row  d-flex flex-column p-2">
				<div>Kryss av de {event.description.toLowerCase()}ene du vil gå på</div>
				<label class="d-flex pt-2">
					<input type="checkbox" bind:checked={only_selected} />
					<div class="selector-text">Vis kun valgte {event.description.toLowerCase()}</div>
				</label>
			</div>
		</li>
		{#each getTimeslotPerformances(event).filter((perf) => !only_selected || Boolean($performances_store[perf.submission._id])) as performance (performance.submission._id)}
		<li class="alt-li"
				animate:flip={{duration: 300, key: performance.submission._id}}
				in:fly={{ y:-30, duration: 300, key: performance.submission._id }}
		>	
			<PerformanceRow {only_selected} {event} {conference} {performance} />
		</li>
		{/each}
	</ul>
{/if}
{#if event.info}
	<div class="p-3">
		<PortableText value={event.info} />
	</div>
{/if}

<style>
	.alt-ul {
		padding: 0;
		margin: 0;
		margin-bottom: 1px;
		list-style-type: none;
	}
	.alt-li {
		background: inherit;
	}
	.alt-li:nth-child(even) {
		background: #fde9e9;
	}
	input[type='checkbox'] {
		-webkit-appearance: none;
		appearance: none;
		background-color: var(--form-background);
		margin: 0;

		font: inherit;
		color: currentColor;
		width: 1.15em;
		height: 1.15em;
		border: 0.15em solid currentColor;
		border-radius: 0;
		transform: translateY(-0.075em);

		display: grid;
		place-content: center;
	}

	input[type='checkbox']::before {
		content: '';
		width: 0.65em;
		height: 0.65em;
		border-radius: 0;
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		box-shadow: inset 1em 1em var(--form-control-color);
		background-color: CanvasText;
	}

	input[type='checkbox']:checked::before {
		transform: scale(1);
	}

	.selector-row {
		background-color: #f2f2f2;
	}
	.selector-text {
		font-weight: 300;
		font-size: small;
		margin-left: 0.5em;
	}
</style>
