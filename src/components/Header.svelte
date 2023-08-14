<script lang="ts">
	import { page } from '$app/stores';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import type { ISiteSetting } from '../model/site-setting';
	import type { User } from '$lib/types/user';
	import MenuItems from './menu/menu-items/MenuItems.svelte';
	import HamburgerMenu from './menu/hamburger-menu/HamburgerMenu.svelte';
	import classNames from 'classnames';
	import { navigating } from '$app/stores';

	export let settings: ISiteSetting;
	export let authInfo: User | undefined = undefined;
	export let isDarkTheme: boolean | undefined = undefined;

	let isOpenMenu = false;

	let screenSize: number;

	$: if ($navigating && isOpenMenu) {
		isOpenMenu = false;
	}
</script>

<svelte:window bind:innerWidth={screenSize} />

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
				{#if screenSize >= 900}
					<span class="name">Hei {authInfo.name}</span>
					<MenuItems className="desktop-menu-items" />
				{:else}
					<div class="mobile-menu-container">
						<HamburgerMenu bind:isOpen={isOpenMenu} />
						<MenuItems
							className={classNames('mobile-menu-items', {
								'mobile-menu-items--open': isOpenMenu,
								'mobile-menu-items--close': !isOpenMenu
							})}
						/>
					</div>
				{/if}
			{:else}
				<a class="login__link" href="/login?redirect_uri={$page.url.pathname}">Login</a>
			{/if}

			{#if screenSize >= 900}
				<Button
					class="header-container__nav-content-btn"
					on:click={() => (isDarkTheme = !isDarkTheme)}
				>
					<Label>{isDarkTheme ? 'Light mode' : 'Dark mode'}</Label>
				</Button>
			{:else}
				<IconButton
					class="material-icons theme-icon-button"
					aria-label={isDarkTheme ? 'Lys tema' : 'Mørk tema'}
					on:click={() => (isDarkTheme = !isDarkTheme)}
					>{isDarkTheme ? 'light_mode' : 'nightlight'}</IconButton
				>
			{/if}
		</div>
	</nav>
</header>

<style lang="scss">
	@use '../styles/mixin' as *;
	.header-container {
		padding: 1rem 0;

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

		:global(.theme-icon-button) {
			display: flex;
			width: 2rem;
		}

		// Mobile and desktop menu
		:global(.desktop-menu-items) {
			display: none;
		}

		:global(.mobile-menu-items) {
			display: flex;
			flex-direction: column;
			overflow: hidden;
			z-index: 1000;
			position: absolute;
			min-width: 12rem;
			right: 4rem;
			top: 4.5rem;
			border: 1px solid rgb(226, 232, 240);
			border-radius: 10px;
			box-shadow: rgba(217, 227, 237, 0.2) 0px 8px 24px;
		}

		:global(.mobile-menu-items li) {
			border: 0;
			height: 1.7rem;
		}

		:global(.mobile-menu-items.mobile-menu-items--open) {
			padding: 1.25rem;
			height: auto;
		}

		:global(.mobile-menu-items--close) {
			height: 0;
			border: 0;
		}
	}

	@media (min-width: 900px) {
		.header-container__nav-logo img {
			width: 8rem !important;
		}

		.name {
			padding-right: 0.5rem;
			border-right: 1px solid lightgray;
		}

		// Mobile and desktop menu
		:global(.desktop-menu-items) {
			display: flex !important;
		}

		:global(.mobile-menu-items) {
			display: none !important;
			margin-top: 0;
		}
	}
</style>
