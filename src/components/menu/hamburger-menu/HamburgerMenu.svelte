<script lang="ts">
	import IconButton from '@smui/icon-button';

	export let isOpen: boolean;
</script>

<div class="hamburger-menu-container">
	<IconButton
		class={`material-icons hamburger-menu-container__icon-button ${
			isOpen ? 'hamburger-menu-container__icon-button--active' : ''
		}`}
		aria-label="Åpne meny"
		on:click={() => (isOpen = !isOpen)}
	>
		{isOpen ? 'close' : 'menu'}
	</IconButton>
</div>

<style lang="scss">
	.hamburger-menu-container {
		position: relative;

		:global(.hamburger-menu-container__icon-button--active) {
			background-color: #f6f6f6;
			border-radius: 50%;
		}
	}

	@media (min-width: 900px) {
		.hamburger-menu-container {
			display: none;
		}
	}
</style>
