<script lang="ts">
	import type { IEvent } from '../../../../model/event';
	import { formatDate } from '../../../../utils/date-time-utils';

	export let upcomingDeadlines: IEvent[];
</script>

<div class="upcoming-deadline-card-container">
	<ol class="upcoming-deadline-card-content">
		{#each upcomingDeadlines as deadline}
			<li class="upcoming-deadline-card-row">
				<div class="upcoming-deadline-card-row-item title-container">
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

	.visuallyhidden {
		@include visuallyhidden();
	}

	p {
		margin: 0;
	}

	.upcoming-deadline-card-container {
		padding: 0.4rem;
		border-radius: 0.5rem;

		.upcoming-deadline-card-content {
			display: grid;
			list-style: none;
			gap: 0.5rem;
			padding-left: 0;
			margin-bottom: 0;

			.title-container,
			.date-content {
				padding: 0.5rem;
				text-transform: capitalize;
			}

			.title-container {
				border-radius: 0.5rem 0.5rem 0 0;
			}

			.date-container {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				border-radius: 0 0 0.5rem 0.5rem;
			}
		}
	}

	@media (min-width: 900px) {
		.upcoming-deadline-card-content {
			min-height: 16rem;

			.title-container,
			.date-content {
				display: flex;
				align-items: center;
				padding: 1rem;
			}

			.upcoming-deadline-card-row {
				display: grid;
				grid-template-columns: 1fr 0.6fr;
				gap: 0.5rem;
				border-radius: 0.5rem;

				.upcoming-deadline-card-row-item {
					border-radius: 0.5rem;
				}
			}
		}
	}
</style>
