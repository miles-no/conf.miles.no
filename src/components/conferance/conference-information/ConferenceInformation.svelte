<script lang="ts">
	import Paper, { Content } from '@smui/paper';
	import { Icon } from '@smui/button';
	import type { IConference } from '../../../model/conference';
	import { formatEventDateRange } from '$lib';

	export let conference: IConference;

	const date = formatEventDateRange(conference.startDate, conference.endDate);
</script>

<Paper class="conference-information-tag-container" variant="unelevated">
	<Content class="conference-information-tag grey-text">
		{#if conference.startDate && conference.endDate}
			<div>
				<p class="visuallyhidden">{`dato: ${date}`}</p>
				<p aria-hidden={true}>
					<Icon class="material-icons" alt="">event</Icon>
					{date}
				</p>
			</div>
		{/if}

		{#if conference.location}
			<div>
				<p class="visuallyhidden">{`sted: ${conference.location}`}</p>
				<p aria-hidden={true}>
					<Icon class="material-icons" alt="">location_on</Icon>
					{conference.location}
				</p>
			</div>
		{/if}

		{#if conference?.tickettype}
			<div>
				<p class="visuallyhidden">{`billetttype: ${conference.tickettype}`}</p>
				<p aria-hidden={true}>
					<Icon class="material-icons" alt="">notifications_active</Icon>
					{conference.tickettype}
				</p>
			</div>
		{/if}

		{#if conference.url}
			<div>
				<p>
					<Icon class="material-icons" alt="">link</Icon>
					<a aria-label={`lenke til ${conference.title}`} href={conference.url}>
						{conference.url}
					</a>
				</p>
			</div>
		{/if}

		{#if conference.price}
			<div>
				<p class="visuallyhidden">{`pris: ${conference.price}`}</p>
				<p aria-hidden={true}>
					<Icon class="material-icons" alt="">payments</Icon>
					{conference.price}
				</p>
			</div>
		{/if}
	</Content>
</Paper>

<style lang="scss">
	@use '../../../styles/mixin' as *;

	.visuallyhidden {
		@include visuallyhidden();
	}

	p {
		margin: 0;
	}

	// Mobile
	:global(.conference-information-tag-container) {
		padding: 0 !important;

		:global(.conference-information-tag) {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			font-weight: 600;
			letter-spacing: 1px;
			:global(p) {
				display: flex;
				gap: 0.5rem;
				align-items: center;
			}
		}
	}

	// Desktop
	@media (min-width: 950px) {
		:global(.conference-information-tag) {
			display: flex !important;
			flex-direction: row !important;
			flex-wrap: wrap;
			column-gap: 4rem !important;
			row-gap: 1rem !important;
		}
	}
</style>
