<script lang="ts">
	import { formatConferenceDateRange } from '$lib';
	import Card, { Content, Media, MediaContent } from '@smui/card';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '$lib/sanityClient';
	import ConferenceModal from '../conferenceModal/ConferenceModal.svelte';
	import ConferenceCategoryTag from '../../tag/conference-category-tag/ConferenceCategoryTag.svelte';

	export let conference;
	export let index;
	export let user;
	const date = formatConferenceDateRange(conference.startDate, conference.endDate);
	const builder = imageUrlBuilder(client);

	function urlFor(source) {
		return builder.image(source);
	}

	let open = false;
</script>

<div>
	<div role="button" on:click={() => (open = true)} on:keypress={() => (open = true)} tabindex={0}>
		<Card>
			<Media class="card-media-16x9" aspectRatio="16x9">
				<MediaContent>
					<img
						style="width: 100%; height: 100%;"
						alt=""
						src={conference.imageUrl
							? urlFor(conference.imageUrl).size(500, 300).quality(100).url()
							: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
						height="300"
						width="500"
					/>
				</MediaContent>
			</Media>

			<Content>
				<div class="dateLocationWrapper">
					<div class="mdc-typography--body1">{date}</div>
					<div>{conference.location}</div>
				</div>
				<div class="title mdc-typography--headline6">
					{conference.title}
				</div>
				<div class="tagWrapper">
					{#each conference.categoryTag as activityType}
						<ConferenceCategoryTag category={activityType} />
					{/each}
				</div>
			</Content>
		</Card>
	</div>
	<ConferenceModal bind:open {conference} {user} isExternalConference />
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.dateLocationWrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.tagWrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		max-width: 100%;
		margin-top: 1.5rem;
		gap: 0.5rem;
	}
</style>
