<script context="module">
	import ws from './_workshops';
	export async function load({params, fetch}) {
        return { 
            props: { 
                workshops: ws
            }
        }
    }
	export const router = false;
</script>

<script>
	import Nav from '../components/Nav.svelte';
	import Cards from '../components/Cards.svelte';
	import Logo from '../components/Logo.svelte';
	import Date from '../components/Date.svelte';
	export let workshops;
</script>

<style>
</style>

<svelte:head>
	<title>Miles @ Booster</title>
</svelte:head>

<div class="container-fluid">
	<Logo />
	<Nav />
	<div class="d-none d-md-block">
		<Date />
	</div>
	<Cards workshops="{workshops}" />
</div>