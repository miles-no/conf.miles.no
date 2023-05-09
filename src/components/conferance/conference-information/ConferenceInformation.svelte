<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { Icon } from '@smui/button';
	import type { IExternalConference } from '../../../model/external-conference';
	import { formatConferenceDateRange } from '$lib';

	export let conference: IExternalConference | undefined = undefined;

	const date = formatConferenceDateRange(conference?.startDate, conference?.endDate);
</script>

<LayoutGrid class="conference-information grey-text">
	<Cell spanDevices={{ desktop: 2, tablet: 12, phone: 12 }}>
		<p class="conference-information-text" aria-label={`dato: ${date}`}>
			<Icon class="material-icons" alt="">event</Icon>
			{date}
		</p>
	</Cell>
	<Cell spanDevices={{ desktop: 2, tablet: 12, phone: 12 }}>
		<p class="conference-information-text" aria-label={`sted: ${conference?.location}`}>
			<Icon class="material-icons" alt="">location_on</Icon>
			{conference?.location}
		</p>
	</Cell>
	<Cell spanDevices={{ desktop: 2, tablet: 12, phone: 12 }}>
		<p class="conference-information-text" aria-label={`billetttype: ${conference?.tickettype}`}>
			<Icon class="material-icons" alt="">notifications_active</Icon>
			{conference?.tickettype}
		</p>
	</Cell>
	<Cell spanDevices={{ desktop: 2, tablet: 12, phone: 12 }}>
		<p class="conference-information-text">
			<Icon class="material-icons" alt="">link</Icon>
			<a
				class="conference-information-text"
				aria-label={`lenke til ${conference?.title}`}
				href={conference?.url}
			>
				{conference?.url}
			</a>
		</p>
	</Cell>
	<Cell spanDevices={{ desktop: 2, tablet: 12, phone: 12 }}>
		<p class="conference-information-text" aria-label={`pris: ${conference?.price}`}>
			<Icon class="material-icons" alt="">payments</Icon>
			{conference?.price}
		</p>
	</Cell>
</LayoutGrid>

<style lang="scss">
	.conference-information-text {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.4rem;
		font-weight: 600;
		letter-spacing: 1px;
	}
</style>
