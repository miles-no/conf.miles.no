<script>
	import Fa from 'svelte-fa';
	import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
	import { formatConferenceDateRange } from '$lib';
	import Card, { Content, Media, MediaContent } from '@smui/card';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '$lib/sanityClient';
	import Tag from './tag/Tag.svelte';

	export let event;
	const date = formatConferenceDateRange(event.startDate, event.endDate);

	const builder = imageUrlBuilder(client);

	function urlFor(source) {
		return builder.image(source);
	}
</script>

<div class="card-container">
	<a href="konferanser/{event.slug}">
		<Card>
			<Media class="card-media-16x9" aspectRatio="16x9">
				<MediaContent>
					<img
						style="width: 100%; height: 100%;"
						alt=""
						src={event.imageUrl
							? urlFor(event.imageUrl).size(500, 300).quality(100).url()
							: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
						height="300"
						width="500"
					/>
				</MediaContent>
			</Media>

			<Content>
				<div class="card-container-content-info">
					<div class="date-location-container">
						<span aria-hidden={true}>{date}</span>
						<span aria-hidden={true}>
							<Fa icon={faLocationDot} size="lg" />
							{event.location}
						</span>
					</div>
					<div class="title mdc-typography--headline6">
						<span aria-label={`${event.title} den ${date} i ${event.location} `}>{event.title}</span
						>
					</div>
				</div>
				<!-- TODO -->
				<Tag ariaHidden={true}>Faglig påfyll</Tag>
			</Content>
		</Card>
	</a>
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	a {
		text-decoration: none;
	}

	.date-location-container {
		display: flex;
		justify-content: space-between;
		color: #636363;
		font-weight: 500;
		font-size: 0.9rem;
	}

	.date-location-container svg {
		padding-left: 0.33rem;
	}

	.card-container-content-info {
		display: flex;
		flex-direction: column;
		padding-bottom: 1.18rem;
	}
</style>
