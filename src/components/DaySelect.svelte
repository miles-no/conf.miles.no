<script>
	export let options;
	export let selected = options[0];
</script>

<div class="d-flex flex-row gap-5 of styled-scrollbars">
	{#each options as [key, topText, bottomText] (key)}
		<label class="d-flex flex-column">
			<div class="top-text">{topText}</div>
			<input type="radio" id={key} bind:group={selected} value={key} />
			<div class="bottom-text">{bottomText}</div>
		</label>
	{/each}
</div>

<style>
	.of {
		overflow-y: hidden;
		overflow-x: auto;
	}
	.styled-scrollbars::-webkit-scrollbar {
		border-top: solid 1px #d76e6e;
		width: 3px; /* Mostly for vertical scrollbars */
		height: 3px; /* Mostly for horizontal scrollbars */
	}
	.styled-scrollbars::-webkit-scrollbar-thumb {
		/* Foreground */
		background-color: #d76e6e;
	}
	.styled-scrollbars::-webkit-scrollbar-track {
		/* Background */
		background: inherit;
	}
	.top-text {
		font-size: x-large;
		font-weight: 900;
	}
	.top-text::first-letter {
		text-transform: capitalize;
	}
	.bottom-text {
		font-weight: 400;
		font-size: small;
	}

	input[type='radio'] {
		-webkit-appearance: none;
		appearance: none;
		font: inherit;
		color: currentColor;
		display: flex;
		flex-direction: column;
		place-content: center;
		background-color: #99999999;
		margin: 0 0 4px 0;
		width: 100%;
		border-radius: 0;
		height: 100%;
	}

	input[type='radio']::before {
		content: '';
		height: 8px;
		border-radius: 0;
		transform: scale(0);
		transition: 100ms transform ease-in-out;
		background-color: #d76e6e;
	}

	input[type='radio']:checked::before {
		transform: scale(1);
	}
</style>
