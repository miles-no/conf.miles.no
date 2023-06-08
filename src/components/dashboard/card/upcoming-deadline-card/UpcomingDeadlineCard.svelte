<script lang="ts">
	import type { IConference } from '../../../../model/conference';
	import { formatDate, type IFormatOptions } from '../../../../utils/date-time-utils';

	export let upcomingDeadlines: IConference[];

	const formatOption: IFormatOptions = {
		day: '2-digit',
		month: 'short'
	};
</script>

<div class="upcoming-deadline-card-container">
	<div class="upcoming-deadline-card-content">
		{#each upcomingDeadlines as deadline}
			<div class="gray-bg-card upcoming-deadline-card-row">
				<div class="gray-bg-card-content upcoming-deadline-card-row-item title-container">
					<p>{deadline.title}</p>
				</div>
				<div class="upcoming-deadline-card-row-item date-container">
					<div class="date-content">
						<p>{formatDate(deadline.deadline, formatOption)}</p>
					</div>
					<div class="date-content">
						<p>
							{formatDate(deadline.deadline, {
								hour: '2-digit',
								minute: '2-digit'
							})}
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.upcoming-deadline-card-container {
		border: 1px solid black;
		padding: 0.4rem;
		border-radius: 0.5rem;

		p {
			margin: 0;
		}

		.upcoming-deadline-card-content {
			display: grid;
			gap: 0.5rem;
			min-height: 15rem;

			.title-container,
			.date-content {
				display: flex;
				align-items: center;
				padding: 1rem;
				text-transform: capitalize;
			}

			.upcoming-deadline-card-row {
				display: grid;
				grid-template-columns: 1fr 0.4fr;
				gap: 0.5rem;
				border-radius: 0.5rem;

				.upcoming-deadline-card-row-item {
					border-radius: 0.5rem;
				}

				.date-container {
					display: flex;
					background-color: #7dfb99;

					div:first-child {
						border-right: 1px solid #6edd86;
					}
				}
			}
		}
	}
</style>
