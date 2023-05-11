<script lang="ts">
	import { Icon } from '@smui/button';
	import type { IExternalConference } from '../../../model/external-conference';
	import { formatConferenceDateRange } from '$lib';

	export let conference: IExternalConference | undefined = undefined;

	const date = formatConferenceDateRange(conference?.startDate, conference?.endDate);
</script>

<div class="conference-information-tag grey-text">
	<div>
		<p aria-label={`dato: ${date}`}>
			<Icon class="material-icons" alt="">event</Icon>
			{date}
		</p>
	</div>
	<div>
		<p aria-label={`sted: ${conference?.location}`}>
			<Icon class="material-icons" alt="">location_on</Icon>
			{conference?.location}
		</p>
	</div>
	<div>
		<p aria-label={`billetttype: ${conference?.tickettype}`}>
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
		<p aria-label={`pris: ${conference?.price}`}>
			<Icon class="material-icons" alt="">payments</Icon>
			{conference?.price}
		</p>
	</div>
</div>

<style lang="scss">
	// Mobile
	.conference-information-tag {
		font-weight: 600;
		letter-spacing: 1px;
		p {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}
	}

	// Desktop
	@media (min-width: 850px) {
		.conference-information-tag {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
		}
	}
</style>
