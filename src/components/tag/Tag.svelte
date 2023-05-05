<script lang="ts">
	export let variant: 'filled' | 'outlined' = 'filled';
	export let color: 'primary' | 'success' | 'error' = 'primary';
	export let size: 'medium' | 'small' = 'small';
	export let ariaHidden: boolean = false;
</script>

<span class={`tag-container ${size} ${variant} ${color}`} aria-hidden={ariaHidden}>
	<slot />
</span>

<style lang="scss">
	@use '../../styles/colors' as *;

	.tag-container {
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

	.primary.filled {
		background: $blue;
		color: $white;
	}

	.primary.outlined {
		border-color: $blue;
		color: $blue;
	}

	.success.filled {
		background: $green;
		color: $white;
	}

	.success.outlined {
		border-color: $green;
		color: $green;
	}

	.error.filled {
		background: $primary-red;
		color: $white;
	}

	.error.outlined {
		border-color: $primary-red;
		color: $primary-red;
	}
</style>
