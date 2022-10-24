<script context="module">
	import client from '../sanityClient';
	export async function load() {
		const conferences = await client.fetch(/* groq */ `
			*[_type == "conference"][0..5] | order(endDate desc) {
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
	import { parseJwt } from '../lib';
	import { user } from '../stores';
	export let conferences = [];
	$: filteredConferences = conferences.filter((c) => !c.internal);

  const CLIENT_ID = '374308135710-8hfuhn752hmh15lohs4fi4hsnovj8t9c.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAunkgH_R469hqbm0BHXag_rA1HQUjhM3U';
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

	globalThis.handleCredentialResponse = (response) => {
		$user = parseJwt(response.credential);
    gisInited = true;
	};
	let allConferencesLoaded = false;

	const loadGoogle = () => {
		google.accounts.id.initialize({
			client_id: CLIENT_ID,
      scope: SCOPES,
			callback: globalThis.handleCredentialResponse
		});
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        console.log(response);
      },
    });
		if (!$user) {
			displaySignInButton();
		}
	};

  const gapiLoaded = () => {
    gapi.load('client', intializeGapiClient);
  }

  const intializeGapiClient = async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC]
    })
    gapiInited = true;
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

  $: status = '';
  $: result = '';
  const fetchThings = async () => {
    let response;
    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1uF6h0ZrVh13kJTB9bq0BQmCoBRBJ3PKYr_Dn9lAZD6c',
        range: 'Sheet1!A:B'
      });
    } catch (err) {
      status = `${err.result.error.code}: ${err.result.error.message}`;
      return;
    }
    status = response.status;
    if (status == 200) {
      result = response.result.values.map(str => `${str}`).join("\n")
    }
  }

  const getToken = () => {
    console.log(gapi.client.getToken());
    console.log(tokenClient.requestAccessToken());
  }
</script>

<svelte:head>
  <script async defer src="https://apis.google.com/js/api.js" on:load={gapiLoaded()}></script>
	<script src="https://accounts.google.com/gsi/client" defer on:load={loadGoogle()}></script>
	<title>Miles @ Conferences</title>
</svelte:head>

<div class="container">
	<Conferences conferences={$user ? conferences : filteredConferences} />
	{#if !allConferencesLoaded}
		<Hoverable let:hovering={active}>
			<!-- svelte-ignore a11y-missing-attribute -->
			<div class="p-2 generic-link" class:active on:click={loadAllConferences}>Se alle konferanser</div>
		</Hoverable>
	{/if}
  {#if $user}
    <button class="btn btn-primary" on:click={fetchThings}>Try to fetch stuff</button>
    <button class="btn btn-primary" on:click={getToken}>Token</button>
    <p>{status}</p>
    <pre>{result}</pre>
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
