<script lang="ts">
	import { Icon } from '@smui/button';
	import { formatEventDateRange } from '$lib';
	import Card, { Content, Media, MediaContent } from '@smui/card';
	import Tag from './tag/Tag.svelte';
	import type { IEvent } from '../model/event';
	import { urlFor } from '../utils/sanityclient-utils';

	export let event: IEvent;
	const date = formatEventDateRange(event?.startDate, event?.endDate);
</script>

<div class="card-container">
	<a href="/arrangement/{event.slug}">
		<Card>
			<Media class="card-media-16x9" aspectRatio="16x9">
				<MediaContent>
					<img
						style="width: 100%; height: 100%;"
						alt=""
						src={event?.imageUrl
							? urlFor(event?.imageUrl).size(500, 300).quality(100).url()
							: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
						height="300"
						width="500"
					/>
				</MediaContent>
			</Media>

			<Content>
				<div class="card-container-content-info">
					<div class="date-location-container grey-text">
						<span aria-hidden={true}>{date}</span>
						{#if event?.visibleTo}
							<span aria-hidden={true}>
								<Icon class="material-icons">location_on</Icon>
								{event?.visibleTo}
							</span>
						{/if}
					</div>
					<div class="title mdc-typography--headline6">
						<span aria-label={`${event?.title} den ${date} i ${event?.location} `}
							>{event?.title}</span
						>
					</div>
				</div>
				<div class="card-container-content-tags">
					{#each event.eventType as type}
						<Tag color="info" ariaHidden={true}>{type}</Tag>
					{/each}
				</div>
			</Content>
		</Card>
	</a>
</div>

<style lang="scss">
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
		font-weight: 500;
		font-size: 0.9rem;

		span {
			display: flex;
			align-items: center;
			gap: 0.33rem;
		}
	}

	.card-container-content-info {
		display: flex;
		flex-direction: column;
		padding-bottom: 1.18rem;
		gap: 0.5rem;
	}

	.card-container-content-tags {
		display: flex;
		gap: 0.5rem;
	}
</style>
