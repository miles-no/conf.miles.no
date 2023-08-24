<script lang="ts">
	import { Facebook, Twitter, Linkedin, Mail, Instagram } from 'lucide-svelte';
	import Card from '@smui/card';
	import type { Cv } from '$lib/types/cv';

	export let author: Cv;

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
				class="gray-scale"
				alt={author.name}
				src={author.profileImage}
				height="25%"
				width="25%"
			/>
			<div class="author-details">
				<h1 class="mdc-typography--headline5" style="margin-bottom: 0;">{author.name}</h1>
			</div>
		</div>
		<div class="author-details">
			<p
				class="mdc-typography--subtitle1"
				style="margin-bottom: 0; text-align: left; font-style: italic; "
			>
				{author.title || ''}
			</p>
			<hr aria-hidden={true} />
		</div>
	</div>
	<div class="author-content">
		<pre class="author-bio">{author.bio}</pre>
		<!--div class="author-socials d-flex">
			{#each author.socials as social}
				{#if social.handle}
					<a href={social.type == 'email' ? `mailto:${social.handle}` : social.handle}>
						<svelte:component this={Icons[social.type]} size="16" color="#000" />
					</a>
				{/if}
			{/each}
		</div-->
	</div>
</Card>

<style>
	.gray-scale {
		filter: grayscale(100%);
	}
	.heading-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
		padding-bottom: 0;
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
		padding-top: 0;
	}
	.author-bio {
		text-wrap: balance;
		line-height: 2em;
		font-size: 1rem;
		font-family: var(--mdc-typography-body1-font-family);
	}
	.author-socials {
		gap: 1em;
	}
</style>
