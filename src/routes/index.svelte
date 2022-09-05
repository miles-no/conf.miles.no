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
	import Cards from '../components/Cards.svelte';
	import Logo from '../components/Logo.svelte';
	import Date from '../components/Date.svelte';
	import Conferences from '../components/Conferences.svelte';
	export let workshops;
	export let conferences;
</script>

<svelte:head>
	<title>Miles @ konferanser</title>
</svelte:head>

<div class="container-fluid">
	<Logo />
	<Nav />
	<div class="d-none d-md-block">
		<Date />
	</div>
	<Conferences {conferences} />
</div>

<style>
</style>
