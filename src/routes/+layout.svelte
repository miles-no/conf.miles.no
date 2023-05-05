<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '../components/Header.svelte';

	export let data: any = {};
	const settings = data.settings;
	let authInfo = { isAuthenticated: false };
	if (data.user) {
		authInfo = data.user;
	}

	let darkTheme: MediaQueryList | boolean | undefined = undefined;

	onMount(() => {
		darkTheme = window.matchMedia('(prefers-color-scheme: dark)');
	});
</script>

<svelte:head>
	<!-- SMUI Styles -->
	{#if darkTheme === undefined}
		<link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
	{:else if darkTheme}
		<link rel="stylesheet" href="/smui.css" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<Header {settings} {authInfo} bind:darkTheme />
<main class="pb-5">
	<slot />
</main>

<!-- <Footer /> -->
<style>
</style>
