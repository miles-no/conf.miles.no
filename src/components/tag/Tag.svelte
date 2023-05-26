<script lang="ts">
<<<<<<< HEAD
	export let variant: 'filled' | 'outlined' | 'outlined-with-bg' = 'filled';
=======
	export let variant: 'filled' | 'outlined' = 'filled';
>>>>>>> dev
	export let color: 'info' | 'success' | 'error' = 'info';
	export let size: 'medium' | 'small' = 'small';
	export let ariaHidden: boolean = false;
</script>

<span class={`tag ${size} ${variant} ${color}`} aria-hidden={ariaHidden}>
	<slot />
</span>

<style lang="scss">
	@use '../../styles/colors' as *;

	.tag {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 32px;
		padding: 0.18rem 1rem;
		border-radius: 100px;
		border: 1px solid;
	}

	.medium {
		font-size: 1.12rem;
	}

	.small {
		font-size: 0.87rem;
	}
</style>
