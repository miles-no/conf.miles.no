<script lang="ts">
	import { Icon } from '@smui/button';
</script>

<div class="no-image-container">
	<Icon class="material-icons no-image" alt="">hide_image</Icon>
</div>

<style lang="scss">
	.no-image-container {
		background-color: lightgrey;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 15rem;

		:global(.material-icons.no-image) {
			font-size: 5rem;
		}
	}
</style>
