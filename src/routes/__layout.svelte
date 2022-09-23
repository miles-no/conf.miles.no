<script context="module">
  import client from '../sanityClient';
	export async function load() {
		const siteSettings = await client.fetch(
			/* groq */ `
        *[_type == "siteSettings"][0] {
          ...,
          "siteLogo": siteLogo.asset->url
        }
      `
		);

		if (!siteSettings) {
			return {
				status: 404
			};
		}

		return {
			props: {
				siteSettings
			}
		};
	}
</script>

<script>
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  export let siteSettings = [];
</script>

<style>
</style>

<Header settings={siteSettings} />
<main>
  <slot></slot>
</main>
<Footer />
