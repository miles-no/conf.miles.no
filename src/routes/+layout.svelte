<script>
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	export let data = {};
	const settings = data.settings;
	const authInfo = data.user;
</script>

<Header {settings} {authInfo}  />
<main class="pb-5">
	<slot />
</main>
<!-- <Footer /> -->

<style>
</style>
