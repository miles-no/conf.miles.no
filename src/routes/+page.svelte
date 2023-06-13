<script lang="ts">
	import Dashboard from '../components/Dashboard.svelte';
	import ExternalContent from '../components/ExternalContent.svelte';
	import type { IPageLoadData } from './+page.server';

	export let data: IPageLoadData;
	export let events = data.events;
	export let user = data.user;
</script>

<svelte:head>
	<link rel="stylesheet" href="../../src/app.scss" />
	<title>Dette skjer hos oss i Miles - Miles</title>
</svelte:head>

<div>
	{#if user.isAuthenticated}
		<Dashboard {events} {user} />
	{:else}
		<ExternalContent {events} />
	{/if}
</div>
