<script context="module">
	export async function load({params, fetch}) {
        const workshops = await import(`./_workshops.js`);
        return { 
            props: { 
                workshops: workshops
            }
        }
    }
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