<script>
	// filled, outlined
	export let variant = 'filled';
	// primary, success, error
	export let color = 'primary';
	// medium, small
	export let size = 'small';
	export let ariaHidden = false;
</script>

<span class={`tag-container ${size} ${variant} ${color}`} aria-hidden={ariaHidden}>
	<slot />
</span>

<style>
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
		background: #0288d1;
		color: #fff;
	}

	.primary.outlined {
		border-color: #0288d1;
		color: #0288d1;
	}

	.success.filled {
		background: #2e7d32;
		color: #fff;
	}

	.success.outlined {
		border-color: #2e7d32;
		color: #2e7d32;
	}

	.error.filled {
		background: #d32f2f;
		color: #fff;
	}

	.error.outlined {
		border-color: #d32f2f;
		color: #d32f2f;
	}
</style>
