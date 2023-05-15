<script lang="ts">
	import Paper, { Content } from '@smui/paper';
	import { Icon } from '@smui/button';
	import type { IExternalConference } from '../../../model/external-conference';
	import { formatConferenceDateRange } from '$lib';

	export let conference: IExternalConference | undefined = undefined;

	const date = formatConferenceDateRange(conference?.startDate, conference?.endDate);
</script>

<Paper variant="unelevated">
	<Content class="conference-information-tag grey-text">
		<div>
			<p class="visuallyhidden">{`dato: ${date}`}</p>
			<p aria-hidden={true}>
				<Icon class="material-icons" alt="">event</Icon>
				{date}
			</p>
		</div>
		<div>
			<p class="visuallyhidden">{`sted: ${conference?.location}`}</p>
			<p aria-hidden={true}>
				<Icon class="material-icons" alt="">location_on</Icon>
				{conference?.location}
			</p>
		</div>
		<div>
			<p class="visuallyhidden">{`billetttype: ${conference?.tickettype}`}</p>
			<p aria-hidden={true}>
				<Icon class="material-icons" alt="">notifications_active</Icon>
				{conference?.tickettype}
			</p>
		</div>
		<div>
			<p>
				<Icon class="material-icons" alt="">link</Icon>
				<a aria-label={`lenke til ${conference?.title}`} href={conference?.url}>
					{conference?.url}
				</a>
			</p>
		</div>
		<div>
			<p class="visuallyhidden">{`pris: ${conference?.price}`}</p>
			<p aria-hidden={true}>
				<Icon class="material-icons" alt="">payments</Icon>
				{conference?.price}
			</p>
		</div>
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

	// Desktop
	@media (min-width: 850px) {
		:global(.conference-information-tag) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
		}
	}
</style>
