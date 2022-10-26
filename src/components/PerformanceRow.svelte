<script>
	import { intlFormat } from 'date-fns';
	import { performances as performances_store } from '../stores/performances.ts';
	import { PortableText } from '@portabletext/svelte';
	export let performance;
	export let event;
	export let conference;
	export let only_selected;

	function setChecked() {
		if (!only_selected) {
			const key = performance.submission._id;
			const checked = $performances_store[key] || false;
			const new_perfs = { ...$performances_store, [key]: !checked };
			performances_store.set(new_perfs);
		}
	}

	let show_info = false;
	let is_workshop = event.description.toLowerCase() === 'workshop';
</script>

<div 
	class="p-2 pe-3"
	on:click={() => (show_info = !show_info)} 
>
	<div class="d-flex flex-row justify-content-between">
		<div class="d-flex flex-column me-2">
			<div class="d-flex flex-row gap-3 align-items-center">
				{#if performances_store}
					<label class="d-flex" style="align-items: center;">
						<input
							on:click|stopPropagation={setChecked}
							disabled={only_selected}
							type="checkbox"
							checked={Boolean($performances_store[performance.submission._id])}
						/>
					</label>
				{/if}
				<div>
					<div class="event-title">
						{#if is_workshop}
							<a
								class="event-link"
								href={`/konferanser/${conference.slug}/agenda/${performance.submission.slug}`}
								>{performance.submission.title} >></a
							>
						{:else}
							{performance.submission.title}
						{/if}
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
			<div>{performance.location}</div>
			<div>
				{intlFormat(
					new Date(performance.dateAndTime),
					{
						hour: '2-digit',
						minute: '2-digit'
					},
					{ locale: 'nb-NO' }
				)}
			</div>
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
		overflow-x: scroll;
	}
	.event-link {
		font-weight: 400;
		color: #222222;
		word-break: break-all;
		text-decoration: underline;
	}
	.event-decription {
		font-size: small;
		font-weight: 300;
		padding-bottom: -1rem;
	}
	.event-title {
		font-weight: 400;
		color: #222222;
	}
	.author-name {
		font-weight: 300;
		font-size: small;
	}
	.more-info {
		font-size: small;
		font-weight: 200;
		font-style: italic;
		display: flex;
		width: 100%;
		justify-content: center;
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
	input[type='checkbox']:disabled {
		border-color: #999999;
	}
	input[type='checkbox']:disabled::before {
		background-color: #999999;
	}
</style>
