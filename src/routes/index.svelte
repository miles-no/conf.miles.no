<script context="module">
	import ws from './_workshops';
	import cs from './_conferences';
	export async function load({ params, fetch }) {
		return {
			props: {
				workshops: ws,
				conferences: cs
			}
		};
	}
	export const router = false;
</script>

<script>
	import Nav from '../components/Nav.svelte';
	import Logo from '../components/Logo.svelte';
	import Conferences from '../components/Conferences.svelte';
	import SwooshFooter from '../components/SwooshFooter.svelte';
	import { onMount } from 'svelte';
	import { parseJwt } from '../lib';
	import { user } from '../stores';

	globalThis.handleCredentialResponse = response => {
		$user = parseJwt(response.credential);
	};
	let googleReady = false;
	onMount(() => {
		if (googleReady) {
			google.accounts.id.initialize({
				client_id: '374308135710-8hfuhn752hmh15lohs4fi4hsnovj8t9c.apps.googleusercontent.com',
				callback: globalThis.handleCredentialResponse,
				auto_select: true,
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
		google.accounts.id.prompt();
	}
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer on:load={loadGoogle()}></script>
	<title>Miles @ konferanser</title>
</svelte:head>

<div>
	<Logo />
	<Nav />
	<Conferences {conferences} />
	<SwooshFooter/>
</div>

<style>
</style>
