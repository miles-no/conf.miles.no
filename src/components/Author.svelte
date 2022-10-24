<script>
  import { PortableText } from '@portabletext/svelte';
  import { Facebook, Twitter, Linkedin, Mail, Instagram } from 'lucide-svelte';
  import imageUrlBuilder from '@sanity/image-url';
  import client from '../sanityClient';
  export let author = {};
  const Icons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    email: Mail,
    instagram: Instagram
  }

  const builder = imageUrlBuilder(client)

  function urlFor(source) {
    return builder.image(source)
  }
</script>

<div class="mb-3">
  <div class="author-heading d-flex justify-content-between align-items-center">
		<h1>{author.name}</h1>
    <img class="rounded-circle gray-scale" alt={author.name} src={urlFor(author.imageUrl).size(75, 75).quality(75).url()} />
	</div>
	<div class="author-content">
    <PortableText value={author.bio} />
    <div class="author-socials d-flex">
      {#each author.socials as social}
        {#if social.handle}
          <a href={social.type == 'email' ? `mailto:${social.handle}` : social.handle}>
            <svelte:component this={Icons[social.type]} size="16" color="#000" />
          </a>
        {/if}
      {/each}
    </div>
	</div>
</div>

<style>
  .gray-scale {
    filter: grayscale(100%);
  }
  .author-heading {
		background: #D76E6E;
		padding: clamp(0.5em, 1.5vh, 3em) clamp(1em, 2vw, 8em);
		color: white;
	}

	.author-content {
    max-width: 55em;
		padding: clamp(0.5em, 3vh, 3em) clamp(1em, 5vw, 8em);
    line-height: 2em;
	}

  .author-socials {
    gap: 1em;
  }
</style>

