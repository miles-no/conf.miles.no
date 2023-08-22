<script>
	import { PortableText } from '@portabletext/svelte';
	import { Facebook, Twitter, Linkedin, Mail, Instagram } from 'lucide-svelte';
	import Card from '@smui/card';
	import { urlFor } from '../utils/sanityclient-utils';
	export let author = {};
	const Icons = {
		facebook: Facebook,
		twitter: Twitter,
		linkedin: Linkedin,
		email: Mail,
		instagram: Instagram
	};
</script>

<Card>
	<div class="heading-wrapper">
		<div class="author-heading">
			<img
				class="rounded-circle gray-scale"
				alt={author.name}
				src={author.imageUrl
					? urlFor(author.imageUrl).size(75, 75).quality(75).url()
					: 'https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0='}
				height="75"
				width="75"
			/>
			<div class="author-details">
				<h1 class="mdc-typography--headline5" style="margin-bottom: 0;">{author.name}</h1>
			</div>
		</div>
		<div>
			<p
				class="mdc-typography--subtitle1"
				style="margin-bottom: 0; text-align: left; font-style: italic; "
			>
				{author.title ? author.title : ''}
			</p>
			<hr aria-hidden={true} />
		</div>
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
</Card>

<style>
	.gray-scale {
		filter: grayscale(100%);
	}
	.heading-wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 2rem;
	}
	.author-heading {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.author-details {
		display: flex;
		flex-direction: column;
	}

	.author-content {
		max-width: 55em;
		padding: 2rem;
		line-height: 2em;
	}

	.author-socials {
		gap: 1em;
	}
</style>
