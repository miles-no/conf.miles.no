<script lang="ts">
	import IconButton from '@smui/icon-button';
	import classNames from 'classnames';

	export let isOpen: boolean;
</script>

<div class="hamburger-menu-container">
	<IconButton
		class={classNames('material-icons hamburger-menu-container__icon-button', {
			'hamburger-menu-container__icon-button--active': isOpen
		})}
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
			border-radius: 50%;
		}
	}

	@media (min-width: 900px) {
		.hamburger-menu-container {
			display: none;
		}
	}
</style>
