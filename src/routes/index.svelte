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
	export let conferences;
</script>

<svelte:head>
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
