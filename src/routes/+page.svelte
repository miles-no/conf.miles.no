<script lang="ts">
	import Conferences from '../components/Conferences.svelte';
	import Dashboard from '../components/Dashboard.svelte';
	import ExternalContent from '../components/ExternalContent.svelte';
	import Hoverable from '../components/Hoverable.svelte';
	import type { IPageLoadData } from './+page.server';

	export let data: IPageLoadData;
	export let conferences = data.conferences;
	export let user = data.user;
</script>

<svelte:head>
	<link rel="stylesheet" href="../../src/app.scss" />
	<title>Dette skjer hos oss i Miles - Miles</title>
</svelte:head>

<div class="container">
	{#if !user.isAuthenticated}
		<ExternalContent {conferences} />
	{:else}
		<Dashboard {conferences} {user} />
	{/if}
</div>

<style>
	.generic-link {
		font-weight: 700;
		font-size: min(3vw, 40px);
		color: inherit;
		cursor: pointer;
		width: fit-content;
	}

	.active {
		background-color: black;
		color: white;
		cursor: pointer;
	}
</style>
