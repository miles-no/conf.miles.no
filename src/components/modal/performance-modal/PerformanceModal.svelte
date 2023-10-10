<script lang="ts">
	import Dialog, { Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import type { IPerformance } from '../../../model/event';
	import { Icon } from '@smui/button';
	import { formatDate } from '../../../utils/date-time-utils';
	import Avatar from '../../avatar/Avatar.svelte';
	import { PortableText } from '@portabletext/svelte';
	import { addMinutes } from 'date-fns';

	export let open: boolean;
	export let performance: IPerformance;

	$: duration =
		formatDate(performance.dateAndTime, { hour: 'numeric', minute: 'numeric' }) +
		' - ' +
		formatDate(
			addMinutes(new Date(performance.dateAndTime), performance.submission.duration).toString(),
			{ hour: 'numeric', minute: 'numeric' }
		);
</script>

<Dialog
	bind:open
	sheet
	aria-describedby="sheet-content"
	surface$style="width: 720px; max-width: calc(100vw - 32px);"
	aria-labelledby="modal-heading"
>
	<Content class="performance-modal">
		<IconButton action="close" class="material-icons">close</IconButton>
		<div class="performance-modal-content-container">
			<h1 class="title" id="modal-heading">{performance.submission.title}</h1>
			<hr aria-hidden={true} />
			<div class="performance-modal-content">
				<div class="author-date-location-container">
					<p class="visuallyhidden">Foredragsholder</p>
					<ul class="author-list">
						{#each performance.submission.authors as author}
							<li>
								<Avatar imageUrl={author.imageUrl} name={author.name} />
							</li>
						{/each}
					</ul>
					<div class="information">
						<p>
							<Icon class="material-icons">calendar_month</Icon>
							<span class="visuallyhidden">Dato</span>
							{formatDate(performance.dateAndTime, {
								weekday: 'long',
								day: '2-digit',
								month: 'long',
								year: 'numeric'
							})}
						</p>
						<p>
							<Icon class="material-icons">schedule</Icon>
							<span class="visuallyhidden">Varighet</span>
							{duration}
						</p>
						<p>
							<Icon class="material-icons">location_on</Icon>
							<span class="visuallyhidden">Sted</span>
							{performance.location}
						</p>
					</div>
				</div>
				<hr aria-hidden={true} />
				<div class="description-container">
					<h2 class="visuallyhidden">Om foredrag</h2>
					<PortableText value={performance.submission.description} />
				</div>
                <slot />
			</div>
		</div>
	</Content>
</Dialog>

<style lang="scss">
	@use '../../../styles/mixin' as *;

	.visuallyhidden {
		@include visuallyhidden();
	}
	.performance-modal-content-container {
		margin-top: 2rem;

		h1 {
			font-weight: 600;
		}

		p {
			margin-bottom: 0;
		}

		hr {
			height: 2px;
		}

		.performance-modal-content {
			.author-date-location-container {
				display: flex;
				flex-direction: column;
				gap: 1rem;

				.author-list {
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 0.5rem;
					list-style: none;
					margin: 0;
					padding: 0;
				}

				.information {
					display: flex;
					flex-direction: column;
					gap: 0.4rem;
					p {
						display: flex;
						gap: 0.3rem;
						text-transform: capitalize;
					}
				}
			}

		}
	}

	// Desktop
	@media (min-width: 600px) {
		.performance-modal-content-container {
			.performance-modal-content {
				.author-date-location-container {
					display: grid;
					grid-template-columns: 1fr 0.7fr;
				}
			}
		}
	}
</style>
