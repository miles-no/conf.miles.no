<script lang="ts">
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import type { ISiteSetting } from '../model/site-setting';
	import type { User } from '$lib/types/user';
	import MenuItems from './menu-items/MenuItems.svelte';

	export let settings: ISiteSetting;
	export let authInfo: User | undefined = undefined;
	export let isDarkTheme: boolean | undefined = undefined;
</script>

<header class="header-container">
	<nav class="header-container__nav">
		<div class="header-container__nav-logo">
			<a href="/">
				<img class="miles-brand" src={settings.siteLogo} alt="" />
				<span class="visuallyhidden">Miles</span>
			</a>
		</div>
		<div class="header-container__nav-content">
			{#if authInfo && authInfo.isAuthenticated}
				<span class="name">Hei {authInfo.name}</span>
				<MenuItems />
			{:else}
				<a class="login__link" href="/login">Login</a>
			{/if}
			<Button
				class="header-container__nav-content-btn"
				on:click={() => (isDarkTheme = !isDarkTheme)}
			>
				<Label>{isDarkTheme ? 'Light mode' : 'Dark mode'}</Label>
			</Button>
			<IconButton
				class="material-icons theme-icon-button"
				aria-label={isDarkTheme ? 'Lys tema' : 'Mørk tema'}
				on:click={() => (isDarkTheme = !isDarkTheme)}
				>{isDarkTheme ? 'light_mode' : 'nightlight'}</IconButton
			>
		</div>
	</nav>
</header>

<style lang="scss">
	@use '../styles/mixin' as *;
	.header-container {
		padding: 1rem 1.5rem;

		.visuallyhidden {
			@include visuallyhidden();
		}

		.header-container__nav {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.header-container__nav-logo img {
				width: 5rem;
			}
			.name {
				display: none;
			}

			.header-container__nav-content {
				display: flex;
				gap: 0.5rem;
				align-items: center;
			}
			.login__link {
				padding-right: 0.5rem;
				border-right: 1px solid lightgray;
			}
		}

		:global(.header-container__nav-content-btn) {
			display: none;
		}

		:global(.theme-icon-button) {
			display: flex;
			width: 2rem;
		}
	}

	@media (min-width: 900px) {
		.header-container__nav-logo img {
			width: 8rem !important;
		}

		.name {
			display: unset !important;
			padding-right: 0.5rem;
			border-right: 1px solid lightgray;
		}

		:global(.header-container__nav-content-btn) {
			display: unset !important;
		}

		:global(.theme-icon-button) {
			display: none !important;
		}
	}
</style>
