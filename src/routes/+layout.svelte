<script>
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	export let data = {};
	const settings = data.settings;
</script>

<Header {settings}  />
<main class="pb-5">
	<slot />
</main>
<!-- <Footer /> -->

<style>
</style>
