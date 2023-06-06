<script lang="ts">
	import Dialog, { Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import type { IPerformance } from '../../../model/conference';
	import { Icon } from '@smui/button';
	import { formatDate } from '../../../utils/date-time-utils';
	import Avatar from '../../avatar/Avatar.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let open: boolean;
	export let performance: IPerformance;
	export let conferenceSlug: string;

	$: date = new Date(performance.dateAndTime);
	$: time = `${date.getHours()}:${date.getMinutes()}`;
</script>

<Dialog
	bind:open
	sheet
	aria-describedby="sheet-content"
	surface$style="width: 720px; max-width: calc(100vw - 32px);"
>
	<Content>
		<IconButton action="close" class="material-icons close-btn">close</IconButton>
		<div class="performance-modal-content-container">
			<h1 class="title">{performance.submission.title}</h1>
			<hr />
			<div class="performance-modal-content">
				<div class="author-date-location-container">
					<ul class="author-list">
						{#each performance.submission.authors as author}
							<li>
								<Avatar imageUrl={author.imageUrl} alt={author.image.alt} name={author.name} />
							</li>
						{/each}
					</ul>
					<div class="information">
						<p>
							<Icon class="material-icons">calendar_month</Icon>
							{formatDate(performance.dateAndTime, {
								weekday: 'long',
								day: '2-digit',
								month: 'long',
								year: 'numeric'
							})}
						</p>
						<p>
							<Icon class="material-icons">schedule</Icon>
							{time}
						</p>
						<p>
							<Icon class="material-icons">location_on</Icon>
							{performance.location}
						</p>
					</div>
				</div>
				<hr />
				<div class="description-container">
					<PortableText value={performance.submission.description} />
					<a href={`/konferanser/${conferenceSlug}/agenda/${performance.submission.slug}`}
						>Se flere detaljer</a
					>
				</div>
			</div>
		</div>
	</Content>
</Dialog>

<style lang="scss">
	.performance-modal-content-container {
		margin-top: 2rem;

		h1 {
			color: #000;
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

			.description-container {
				a {
					display: flex;
					justify-content: end;
					cursor: pointer;
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
