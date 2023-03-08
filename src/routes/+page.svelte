<script>
	import Conferences from '../components/Conferences.svelte';
	import ExternalContent from '../components/ExternalContent.svelte';
	import Hoverable from '../components/Hoverable.svelte';
	export let data = {};
	export let conferences = data.conferences;
	export let user = data.user;
	export let allConferencesLoaded = false;

	const loadAllConferences = async () => {
		conferences = await client.fetch(/* groq */ `
			*[_type == "conference"] | order(endDate desc) {
				...,
				"slug": slug.current,
				"imageUrl": image.asset->url,
			}
		`);

		allConferencesLoaded = true;
		return data;
	};
</script>

<svelte:head>
	<title>Miles @ Conferences</title>
</svelte:head>

<div class="container">
	{#if !user.isAuthenticated}<ExternalContent {conferences} />{:else}<Conferences {conferences} />
		{#if !allConferencesLoaded}
			<Hoverable let:hovering={active}>
				<!-- svelte-ignore a11y-missing-attribute -->
				<div class="p-2 generic-link" class:active on:click={loadAllConferences}>
					Se alle konferanser
				</div>
			</Hoverable>
		{/if}{/if}
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
