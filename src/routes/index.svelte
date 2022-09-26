<script context="module">
  import client from '../sanityClient';
	export async function load() {
		const conferences = await client.fetch(
			/* groq */ `
			*[_type == "conference"][0..4] | order(endDate desc) {
				...,
				"slug": slug.current,
				"imageUrl": image.asset->url,
			}
		`
		);

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
  $: filteredConferences = conferences.filter(c => !c.internal);

	globalThis.handleCredentialResponse = response => {
		$user = parseJwt(response.credential);
	};
	let googleReady = false;
	onMount(() => {
		if (googleReady) {
			google.accounts.id.initialize({
				client_id: '374308135710-8hfuhn752hmh15lohs4fi4hsnovj8t9c.apps.googleusercontent.com',
				callback: globalThis.handleCredentialResponse,
			});
			if (!$user) {
				displaySignInButton();
			}
		}
	});

	const loadGoogle = () => {
		googleReady = true;
	}

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
	}
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer on:load={loadGoogle()}></script>
	<title>Miles</title>
</svelte:head>

<div class="container">
  <Conferences conferences={$user ? conferences : filteredConferences } />
  <Hoverable let:hovering={active}>
    <a class="generic-link" class:active href="/konferanser">Se alle konferanser</a>
  </Hoverable>
</div>

<style>
  .generic-link {
    font-weight: 700;
		font-size: min(2vw, 30px);
		padding: 1em 2em;
		color: inherit;
  }

  .active {
		background-color: black;
		color: white;
	}
</style>