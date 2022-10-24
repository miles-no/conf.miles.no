<script>
	export let text;
</script>

<div class="oval">
	<div class="text">{text}</div>
</div>


<style>
	.text {
		padding: 4px;
		font-weight: 900;
		white-space: nowrap;
		color: black;
	}
	.oval {
		height: 65%;
		aspect-ratio: 2 / 1;
		display: flex;
		border-radius: 50%;
		rotate: 15deg;
		justify-content: center;
		align-items: center;
		background: #D76E6E;
	}
</style>
