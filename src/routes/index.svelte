<script context="module">
	import client from '../sanityClient';
	export async function load() {
		const conferences = await client.fetch(/* groq */ `
			*[_type == "conference"][0..1] | order(endDate desc) {
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
	let allConferencesLoaded = false;

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
	<title>Miles</title>
</svelte:head>

<div class="container">
	<Conferences conferences={$user ? conferences : filteredConferences} />
	{#if !allConferencesLoaded}
		<Hoverable let:hovering={active}>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="generic-link" class:active on:click={loadAllConferences}>Se alle konferanser</a>
		</Hoverable>
	{/if}
</div>

<style>
	.generic-link {
		font-weight: 700;
		font-size: min(2vw, 30px);
		padding: 1em 2em;
		color: inherit;
		cursor: pointer;
	}

	.active {
		background-color: black;
		color: white;
		cursor: pointer;
	}
</style>
