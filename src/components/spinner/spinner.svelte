<script lang="ts">
	export let size: number;
</script>

<span class="loader" style={`width: ${size}px; height: ${size}px`} />

<style lang="scss">
	.loader {
		border-bottom-color: #ff3d00;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
