<script lang="ts">
	import type { IConference } from '../../../../model/conference';
	import Tag from '../../../tag/Tag.svelte';
	import { Icon } from '@smui/button';
	import { formatDate } from '../../../../utils/date-time-utils';

	export let myNextEvent: IConference;
	export let handleModal: () => void;

	$: startDate = formatDate(myNextEvent.startDate, {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});
</script>

<div
	class="gray-bg-card your-next-event"
	role="button"
	tabindex={0}
	on:click={handleModal}
	on:keypress={handleModal}
>
	<div class="gray-bg-card-content your-next-event-content">
		<div class="information">
			<p class="title">{myNextEvent.title}</p>
			<div>
				<p class="visuallyhidden">{`Dato: ${myNextEvent.startDate}`}</p>
				<p class="startdate" aria-hidden={true}>
					{startDate}
				</p>
				<p class="visuallyhidden">{`Sted: ${myNextEvent.visibleTo}`}</p>
				<p class="location" aria-hidden={true}>
					<Icon class="material-icons">business</Icon>
					{myNextEvent.visibleTo}
				</p>
			</div>
		</div>
		<div class="status" aria-hidden={true}>
			<p>Status:</p>
			<Tag color="success" ariaHidden={true}>Påmeldt</Tag>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../../styles/colors' as *;
	@use '../../../../styles/mixin' as *;

	// Mobile
	.your-next-event {
		border: 1px solid black;
		border-radius: 0.5rem;
		padding: 0.4rem;

		.visuallyhidden {
			@include visuallyhidden();
		}

		p {
			margin-bottom: 0.3rem;
			letter-spacing: 0.3px;
		}

		.your-next-event-content {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			border-radius: 0.5rem;
			padding: 1rem;

			.information {
				.title {
					font-weight: 600;
				}

				.startdate {
					display: flex;
					text-decoration: underline;
				}

				.location {
					display: flex;
					align-items: end;
					font-size: min(5vw, 14px);
				}
			}

			.status {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				gap: 0.5rem;
			}
		}
	}

	// Desktop
	@media (min-width: 900px) {
		.your-next-event {
			display: flex;
			flex-direction: column;

			.your-next-event-content {
				padding: 1rem 1rem 2.5rem 1rem;

				.information {
					display: flex;
					justify-content: space-between;
					gap: 2rem;
				}
			}
		}
	}
</style>
