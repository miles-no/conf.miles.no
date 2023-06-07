<script lang="ts">
	export let imageUrl: string;
	export let alt: string;
	export let name: string | undefined = undefined;
</script>

<div class="avatar-container">
	<img src={imageUrl} {alt} />
	{#if name}
		<p>{name}</p>
	{/if}
</div>

<style lang="scss">
	.avatar-container {
		display: flex;
		align-items: center;
		gap: 1rem;
		img {
			border: 1px solid black;
			border-radius: 50%;
			height: 3rem;
			width: 3rem;
		}
	}
</style>
