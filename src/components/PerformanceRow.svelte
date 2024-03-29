<script lang="ts">
	import type { IEvent, IPerformance, IItineraryEvent } from '../model/event';
	import { intlFormat } from 'date-fns';
	import { performances as performances_store } from '../stores/performances';
	import { PortableText } from '@portabletext/svelte';
	export let event: IEvent;
	export let performance: IPerformance;
	export let itineraryEvent: IItineraryEvent;
	export let only_selected: boolean;
	export let single_performance: boolean;

	function setChecked() {
		if (!only_selected) {
			const key = performance.submission._id;
			const checked = $performances_store[key] || false;
			const new_perfs = { ...$performances_store, [key]: !checked };
			performances_store.set(new_perfs);
		}
	}

	let show_info = single_performance ? true : false;
	let is_workshop = itineraryEvent.description.toLowerCase() === 'workshop';
	function handleClick() {
		if (!single_performance) {
			show_info = !show_info;
		}
	}
</script>

<div class="p-2 pe-3" on:click={() => handleClick()} on:keyup={() => handleClick()}>
	<div class="d-flex flex-row justify-content-between">
		<div class="d-flex flex-column me-2">
			<div class="d-flex flex-row gap-3 align-items-center">
				{#if performances_store && !single_performance}
					<label class="d-flex" style="align-items: center;">
						<input
							on:click|stopPropagation={setChecked}
							on:keyup|stopPropagation={setChecked}
							disabled={only_selected}
							type="checkbox"
							checked={Boolean($performances_store[performance.submission._id])}
						/>
					</label>
				{/if}
				<div>
					<div class="event-title">
						<a
							class="event-link"
							href={`/arrangement/${event.slug}/agenda/${performance.submission.slug}`}
							>{performance.submission.title} >></a
						>
					</div>
					<div class="of d-flex flex-row gap-2">
						{#each performance.submission.authors as author}
							<div class="author-name">
								{author.name}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div
			class="d-flex flex-column align-items-end"
			style="width: fit-content; white-space: nowrap;"
		>
			<div class="event-location">{performance.location != null ? performance.location : ''}</div>
			{#if !single_performance}
				<div class="event-time">
					{intlFormat(
						new Date(performance.dateAndTime),
						{
							hour: '2-digit',
							minute: '2-digit'
						},
						{ locale: 'nb-NO' }
					)}
				</div>
			{/if}
		</div>
	</div>
	{#if !is_workshop && (show_info || only_selected)}
		<div class="event-decription">
			<PortableText value={performance.submission.description} />
		</div>
	{/if}
</div>

<style>
	.of {
		overflow-y: hidden;
	}
	.event-link {
		text-decoration: underline;
		/* color: #0c2338; */
		font-weight: bold;
	}
	.event-link:visited {
		/* color: #0c2338; */
	}
	.event-decription {
		font-size: small;
		font-weight: 300;
		padding-bottom: -1rem;
		/* color: #0c2338; */
		margin-top: 1rem;
	}
	.event-location {
		font-style: italic;
		font-weight: 400;
		font-size: 14px;
		/* color: #222222; */
	}
	.event-time {
		font-style: italic;
		font-weight: 400;
		font-size: 14px;
		/* color: #222222; */
	}
	.event-title {
		font-weight: 400;
		word-break: break-word;
		font-size: 14px;
		/* color: #0c2338; */
	}

	.author-name {
		font-weight: bold;
		font-size: small;
		font-style: italic;
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
		bIItineraryEventr: CanvasText;
	}
	input[type='checkbox']:checked::before {
		transform: scale(1);
	}
	input[type='checkbox']:disabled {
		border-color: #999999;
	}
	input[type='checkbox']:disabled::before {
		background-color: #999999;
	}
</style>
