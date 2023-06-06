<script lang="ts">
	import type { IPerformance } from '../../../model/conference';
	import { Icon } from '@smui/button';
	import { formatDate, type IFormatOptions } from '../../../utils/date-time-utils';
	import Avatar from '../../avatar/Avatar.svelte';

	export let performance: IPerformance;
	export let handleModal: (id: string) => void;
	const formatOption: IFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };

	$: date = new Date(performance.dateAndTime);
	$: time = `${date.getHours()}:${date.getMinutes()}`;
</script>

<div
	class="external-conference-perfermance-card-container"
	role="button"
	tabindex={0}
	on:click={() => handleModal(performance._key)}
	on:keypress={() => handleModal(performance._key)}
>
	<div class="content">
		<div class="date-location-container">
			<div class="date-location">
				{#if performance.dateAndTime}
					<p>
						<Icon class="material-icons">calendar_month</Icon>
						{formatDate(performance.dateAndTime, formatOption)}
					</p>
				{/if}

				{#if performance.location}
					<p>
						<Icon class="material-icons">location_on</Icon>
						{performance.location}
					</p>
				{/if}
			</div>
			<div>
				<p>
					<Icon class="material-icons">schedule</Icon>
					{time}
				</p>
			</div>
		</div>
		<div class="title-author-container">
			<p class="title">{performance.submission.title}</p>
			<ul class="author-list">
				{#each performance.submission.authors as author}
					<li>
						<Avatar imageUrl={author.imageUrl} alt={author.image.alt} name={author.name} />
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="scss">
	.external-conference-perfermance-card-container {
		p {
			color: #575757;
		}

		.content {
			padding: 1rem;
			border-radius: 0.5rem;
			background-color: #cfcfcf;

			.date-location-container {
				display: flex;
				justify-content: space-between;

				p {
					display: flex;
					align-items: end;
					gap: 0.3rem;
				}
			}

			.title-author-container {
				.title {
					font-weight: 600;
					color: black;
				}

				.author-list {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
					list-style: none;
					margin: 0;
					padding: 0;

					p {
						margin: 0;
					}
				}
			}
		}
	}
</style>
