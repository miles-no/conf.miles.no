<script context="module">
	import ws from '../_workshops';
	import cs from '../_conferences'
	export async function load({ params, fetch }) {
		let slug = params.slug;
		let currentConferences = cs.filter((x) => {return x.slug ==slug})
		
        let post = {};
        if(currentConferences.length == 1) post = currentConferences[0];
		return {
			props: {
				conferenceName: slug,
				workshops: ws,
				conference: post,
			}
		};
	}
	export const router = false;
</script>

<script>
	import Nav from '../../components/Nav.svelte';
	import Cards from '../../components/Cards.svelte';
	import Logo from '../../components/Logo.svelte';
	import Date from '../../components/Date.svelte';
	export let workshops;
	export let conferenceName;
	export let conference;
</script>

<svelte:head>
	<title>Miles @ {conferenceName}</title>
</svelte:head>

<div class="container-fluid">
	<Logo secondarySource="../{conference.logosrc}" />
	<Nav />
	<div class="d-none d-md-block">
		<Date />
	</div>
	<Cards {workshops} />
</div>

<style>
</style>
