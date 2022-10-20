<script>
	import { intlFormat } from 'date-fns';
	import { performances as performances_store } from '../stores/performances.ts';
    import {backInOut, linear} from 'svelte/easing';
	export let performance;

    const options = {duration: 1, easing: backInOut, times: 0.5};

    function spin(node, options) {
		const {times = 0.5} = options;
		return {
			...options,
			// The value of t passed to the css method
			// varies between zero and one during an "in" transition
			// and between one and zero during an "out" transition.
			css(t) {
				// Svelte takes care of applying the easing function.
				const degrees = 360 * times; // through which to spin
				return `transform: rotate(${t * degrees}deg);`;
			}
		};
	}
	
    function setChecked() {
		const key = performance.submission._id;
		const checked = $performances_store[key] || false;
		const new_perfs = { ...$performances_store, [key]: !checked };
		performances_store.set(new_perfs);
	}

    let show_info = false;
</script>

<li class="alt-li">
	<div on:click={() => show_info = !show_info} class="p-2 pe-3 d-flex flex-row justify-content-between">
		<div class="d-flex flex-column me-2">
			<div class="d-flex flex-row gap-3">
				{#if performances_store}
					<label class="d-flex" style="align-items: center;">
						<input
							on:click|stopPropagation={setChecked}
							type="checkbox"
							checked={Boolean($performances_store[performance.submission._id])}
						/>
					</label>
				{/if}
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
                <div>
                <div class="event-title">
                    {performance.submission.title}
                </div>
                <div class="d-flex flex-row gap-2">
                    {#each performance.submission.authors as author}
                        <div class="d-flex flex-row align-items-center">
                            <div class="author-name me-2">
                                {author.name}
                            </div>
                        </div>
                    {/each}
                </div>  
            </div>
			</div>
		</div>
		<div class="d-flex align-items-center" style="width: fit-content; white-space: nowrap;">
			{performance.location}
		</div>
	</div>
</li>

<style>
	.event-title {
		font-weight: 400;
		color: #222222;
	}
	.author-name {
		font-weight: 200;
		font-size: x-small;
		white-space: nowrap;
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
</style>
