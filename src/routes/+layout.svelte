<script lang="ts">
    import {toggleByURIParams} from '../featureFlagging/frontend';
    import { page } from '$app/stores';
    $: toggleByURIParams($page.url.searchParams);


	import { onMount } from 'svelte';
	import Header from '../components/Header.svelte';
	import Toast from '../components/toast/Toast.svelte';
	import darkTheme from '../stores/theme-store';
	import type { ILayoutPageLoadData } from './+layout.server';

	export let data: ILayoutPageLoadData;
	$: settings = data.settings;
	$: authInfo = data.user;

	let isDarkTheme: boolean | undefined = undefined;

	onMount(() => {
		isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		darkTheme.set(isDarkTheme);
	});

	$: {
		darkTheme.set(isDarkTheme);
	}
</script>

<svelte:head>
	<!-- SMUI Styles -->
	{#if isDarkTheme === undefined}
		<link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
	{:else if isDarkTheme}
		<link rel="stylesheet" href="/smui.css" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<div class="layout-container">
	<div class="layout-container__skip-to-main-link-container">
		<a href="#main" class="layout-container__skip-to-main-link-container__link"
			>Hopp til hovedinnhold</a
		>
	</div>
	<Header {settings} {authInfo} bind:isDarkTheme />
	<main id="main">
		<Toast>
			<slot />
		</Toast>
	</main>
</div>

<!-- <Footer /> -->
<style lang="scss">
	@use '../styles/colors' as *;

	.layout-container {
		padding: 3rem 1rem;
	}

	.layout-container__skip-to-main-link-container {
		margin-top: -50px;
	}

	.layout-container__skip-to-main-link-container__link {
		display: flex;
		align-items: center;
		padding: 1rem;
		background: $miles-red;
		height: 2.5rem;
		left: 50%;
		font-weight: 600;
		position: absolute;
		transform: translateY(-100%);
		transition: transform 0.3s;
		color: #fff;
		&:hover {
			color: #fff !important;
		}

		&:focus,
		&:active {
			transform: translateY(0%);
		}
	}

	#main {
		padding-top: 3rem !important;
	}

	@media (min-width: 900px) {
		.layout-container {
			padding: 3rem 2rem;
		}
	}
</style>
