<script>
	export let text;
</script>

<div class="oval">
	<span style="font-size: min(2vw, 20px); font-weight: bold;" class="text-pre-wrap text-dark ">{text}</span>
</div>

<style>
	.oval {
		width: min(20vw, 200px); 
		height: min(10vw, 100px);
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FF9898;
		border-radius: 50%;
		rotate: 15deg;
	}
</style>
