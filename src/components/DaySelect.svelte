<script>
	export let group;
	export let val;
	export let topText;
	export let bottomText;
</script>

<label>
	<div class="d-flex flex-column">
		<div class="top-text">{topText}</div>
		<input type="radio" bind:group name={val} value={val} />
		<div class="bottom-text">{bottomText}</div>
	</div>
</label>

<style>
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
		background-color: #ef8181;
	}

	input[type='radio']:checked::before {
		transform: scale(1);
	}
</style>
