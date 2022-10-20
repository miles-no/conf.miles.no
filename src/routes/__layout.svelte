<script context="module">
	import client from '../sanityClient';
	export async function load({ params }) {
		const { slug = '', konferanse = '' } = params;
		const result = await client.fetch(
			`
      {
        'settings': *[_type == 'siteSettings'][0] {
          ...,
          "siteLogo": siteLogo.asset->url
        }
      }
    `,
			{ slug, konferanse }
		);

		if (!result) {
			return {
				status: 404
			};
		}

		return {
			props: {
				settings: result.settings,
			}
		};
	}
</script>

<script>
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	export let settings = [];
</script>

<Header {settings}  />
<main class="pb-5">
	<slot />
</main>
<!-- <Footer /> -->

<style>
</style>
