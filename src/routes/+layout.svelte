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
	<Header {settings} {authInfo} bind:isDarkTheme />
	<main class="pb-5">
		<slot />
	</main>
</Toast>

<!-- <Footer /> -->
<style>
</style>
