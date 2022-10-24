<script context="module">
	import client from '../sanityClient';

	let allConferencesLoaded = false;
	export async function load() {
		const conferences = await client.fetch(/* groq */ `
			*[_type == "conference"] | order(endDate desc) {
				...,
				"slug": slug.current,
				"imageUrl": image.asset->url,
			}
		`);

		if (!conferences) {
			return {
				status: 404
			};
		}
		allConferencesLoaded = true;
		return {
			props: {
				conferences
			}
		};
	}
</script>

<script>
	import Conferences from '../components/Conferences.svelte';
	import Hoverable from '../components/Hoverable.svelte';
	import { onMount } from 'svelte';
	import { parseJwt } from '../lib';
	import { user } from '../stores';
	export let conferences = [];
	$: filteredConferences = conferences.filter((c) => !c.internal);

	globalThis.handleCredentialResponse = (response) => {
		$user = parseJwt(response.credential);
	};

	const loadGoogle = () => {
		google.accounts.id.initialize({
			client_id: '374308135710-8hfuhn752hmh15lohs4fi4hsnovj8t9c.apps.googleusercontent.com',
			callback: globalThis.handleCredentialResponse
		});
		if (!$user) {
			displaySignInButton();
		}
	};

	const displaySignInButton = () => {
		google.accounts.id.renderButton(document.getElementById('signin'), {
			type: 'standard',
			shape: 'pill',
			theme: 'filled_black',
			text: 'signin_with',
			size: 'large',
			locale: 'no',
			logo_alignment: 'left'
		});
	};

	const loadAllConferences = async () => {
		conferences = await client.fetch(/* groq */ `
			*[_type == "conference"] | order(endDate desc) {
				...,
				"slug": slug.current,
				"imageUrl": image.asset->url,
			}
		`);

		allConferencesLoaded = true;
		return conferences;
	};
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" defer on:load={loadGoogle()}></script>
	<title>Miles @ Conferences</title>
</svelte:head>

<div class="container">
	<Conferences conferences={conferences} />
	{#if !allConferencesLoaded}
		<Hoverable let:hovering={active}>
			<!-- svelte-ignore a11y-missing-attribute -->
			<div class="p-2 generic-link" class:active on:click={loadAllConferences}>Se alle konferanser</div>
		</Hoverable>
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
