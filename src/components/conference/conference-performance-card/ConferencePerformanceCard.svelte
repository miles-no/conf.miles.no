<script lang="ts">
	import type { IPerformance } from '../../../model/event';
	import { Icon } from '@smui/button';
	import { formatDate, type IFormatOptions } from '../../../utils/date-time-utils';
	import Avatar from '../../avatar/Avatar.svelte';
	import StackAvatars from '../../avatar/stack-avatars/StackAvatars.svelte';

	export let performance: IPerformance;
	export let handleModal: (id: string) => void;
	const formatOption: IFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };

	const {
		submission,
		dateAndTime,
		location,
		submission: { authors }
	} = performance;

	$: date = new Date(dateAndTime);
	$: time = `${date.getHours()}:${date.getMinutes()}`;
	$: authorsName = authors.map((author) => author.name);
	$: ariaLabel = `${submission.title} av ${authorsName}. Klokken ${time} i ${location}`;
</script>

<div
	class="conference-performance-card-container"
	role="button"
	tabindex={0}
	on:click={() => handleModal(performance._key)}
	on:keypress={() => handleModal(performance._key)}
	aria-label={ariaLabel}
>
	<div class="content conference-performance-card-content" aria-hidden={true}>
		<div class="date-location-container">
			<div class="date-location">
				{#if dateAndTime}
					<p>
						<Icon class="material-icons">calendar_month</Icon>
						{formatDate(dateAndTime, formatOption)}
					</p>
				{/if}

				{#if location}
					<p>
						<Icon class="material-icons">location_on</Icon>
						{location}
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
			<p class="title">{submission.title}</p>
			{#if authors.length === 1}
				<Avatar imageUrl={authors[0].imageUrl} name={authors[0].name} />
			{:else}
				<StackAvatars authorList={authors} />
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.conference-performance-card-container {
        background-color: #fdfdfd;
		border-radius: 6px;

		.content {
			padding: 1rem;
			border-radius: 0.5rem;

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
				}
			}
		}
	}
</style>
