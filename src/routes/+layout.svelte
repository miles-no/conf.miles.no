<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '../components/Header.svelte';
	import Toast from '../components/toast/Toast.svelte';
	import darkTheme from '../stores/theme-store';

	export let data: any = {};
	const settings = data.settings;
	let authInfo = { isAuthenticated: false };
	if (data.user) {
		authInfo = data.user;
	}

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

<Toast>
	<a href="#main" class="skip-to-main-content-link">Hopp til hovedinnhold</a>
	<Header {settings} {authInfo} bind:isDarkTheme />
	<main class="layout-content-container" id="main">
		<slot />
	</main>
</Toast>

<!-- <Footer /> -->
<style lang="scss">
	@use '../styles/colors' as *;

	.layout-content-container {
		padding: 3rem 1rem;
	}

	.skip-to-main-content-link {
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

	@media (min-width: 900px) {
		.layout-content-container {
			padding: 3rem 1.5rem;
		}
	}
</style>
