<script lang="ts">
	import type { IConference } from '../../../../model/conference';
	import { formatDate, type IFormatOptions } from '../../../../utils/date-time-utils';

	export let upcomingDeadlines: IConference[];
</script>

<div class="upcoming-deadline-card-container">
	<ol class="upcoming-deadline-card-content">
		{#each upcomingDeadlines as deadline}
			<li class="gray-bg-card upcoming-deadline-card-row">
				<div class="gray-bg-card-content upcoming-deadline-card-row-item title-container">
					<p>{deadline.title}</p>
				</div>
				<div class="upcoming-deadline-card-row-item date-container">
					<div class="date-content">
						<p class="visuallyhidden">
							{formatDate(deadline.deadline, {
								day: '2-digit',
								month: 'long',
								year: 'numeric'
							})}
						</p>
						<p aria-hidden={true}>
							{formatDate(deadline.deadline, {
								day: '2-digit',
								month: 'short'
							})}
						</p>
					</div>
					<div class="date-content">
						<p>
							<span class="visuallyhidden">Klokke</span>
							{formatDate(deadline.deadline, {
								hour: '2-digit',
								minute: '2-digit'
							})}
						</p>
					</div>
				</div>
			</li>
		{/each}
	</ol>
</div>

<style lang="scss">
	@use '../../../../styles/mixin' as *;

	.upcoming-deadline-card-container {
		border: 1px solid black;
		padding: 0.4rem;
		border-radius: 0.5rem;

		.visuallyhidden {
			@include visuallyhidden();
		}

		p {
			margin: 0;
		}

		.upcoming-deadline-card-content {
			display: grid;
			gap: 0.5rem;
			min-height: 15rem;
			padding-left: 0;
			margin-bottom: 0;

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
