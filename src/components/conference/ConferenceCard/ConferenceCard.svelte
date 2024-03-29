<script lang="ts">
	import { formatEventDateRange } from '$lib';
	import Card, { Content, Media, MediaContent } from '@smui/card';
	import ConferenceModal from '../conferenceModal/ConferenceModal.svelte';
	import ConferenceCategoryTag from '../../tag/conference-category-tag/ConferenceCategoryTag.svelte';
	import type { IConference } from '../../../model/conference';
	import type { User } from '$lib/types/user';
	import { urlFor } from '../../../utils/sanityclient-utils';

	export let conference: IConference;
	export let user: User;

	const attending =
		conference.employees?.filter((e) => e.status.toLowerCase() === 'attending').length || 0;
	const interested =
		conference.employees?.filter((e) => e.status.toLowerCase() === 'interested').length || 0;
	const date = formatEventDateRange(conference.startDate, conference.endDate);

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
					{#if conference.location}<div>{conference.location}</div>{/if}
				</div>
				<div class="titleWrapper">
					<div class="title mdc-typography--headline6">
						{conference.title}
					</div>
					<div class="attending">
						<span title="Påmeldte">👤 {attending}</span>
						<span title="Interesserte">🤔 {interested}</span>
					</div>
				</div>
				{#if conference.categoryTag}
					<div class="tagWrapper">
						{#each conference.categoryTag as activityType}
							<ConferenceCategoryTag category={activityType} />
						{/each}
					</div>
				{/if}
			</Content>
		</Card>
	</div>
	<ConferenceModal bind:open {conference} {user} isConference />
</div>

<style>
	.titleWrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
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
		margin-top: 1rem;
		gap: 0.5rem;
	}
</style>
