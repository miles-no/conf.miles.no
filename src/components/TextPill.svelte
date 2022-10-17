<script>
	export let text;
</script>

<div class="oval">
	<span style="padding: 0.6vw; font-size: min(1vw, 30px); font-weight: bold;" class="text-nowrap text-dark">{text}</span>
</div>

<style>
	.oval {
		aspect-ratio: 2 / 1;
		border-radius: 50%;
		
		rotate: 15deg;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FF9898;
	}
</style>
