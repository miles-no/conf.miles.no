<script lang="ts">
	import ConferenceInformation from '../../../../components/conferance/conference-information/ConferenceInformation.svelte';
	import type { IPageLoadData } from './+page.server';
	import Paper, { Content } from '@smui/paper';
	import CircularProgress from '@smui/circular-progress';

	import type { StatusType } from '../../../../enums/status';
	import ConferenceCategoryTag from '../../../../components/tag/conference-category-tag/ConferenceCategoryTag.svelte';
	import ConferenceStatus from '../../../../components/conferance/conference-status/ConferenceStatus.svelte';
	import ConferenceAttendance from '../../../../components/conferance/conference-attendance/ConferenceAttendance.svelte';

	export let data: IPageLoadData | undefined = undefined;

	const externalConference = data?.conference ?? undefined;
	const user = data?.user;
	let selectedStatus: StatusType | undefined = undefined;
	let innerWidth = 0;
</script>

<svelte:head>
	<title>
		{`${externalConference?.title ? externalConference.title : 'Side ikke funnet'} - Miles`}
	</title>
</svelte:head>

<svelte:window bind:innerWidth />

{#if externalConference === undefined}
	<div class="spinner-container">
		<CircularProgress class="spinner" indeterminate />
	</div>
{:else}
	<Paper class="paper-container" variant="unelevated">
		<Content>
			<img src={externalConference.imageUrl} alt="" />
			<div class="conference-details">
				<div class="conference-details-main-content">
					<h1>{externalConference.title}</h1>
					<hr class="grey-text" />
					<ConferenceInformation conference={externalConference} />
					<div>
						{#each externalConference.categoryTag as categoryType}
							<ConferenceCategoryTag category={categoryType} />
						{/each}
						<hr class="grey-text" />
					</div>
					<div class="conference-details-main-content-status">
						<ConferenceStatus bind:selectedStatus />
						<ConferenceAttendance {externalConference} />
					</div>
					<div class="conference-details-main-content-description">
						<h2 class="visuallyhidden">Om konferanse</h2>
						<p>{externalConference.description[0].children[0].text}</p>
						<div class="conference-details-main-content-description-comment">Kommentarer</div>
					</div>
				</div>
				<div class="conference-details-status">
					<ConferenceStatus bind:selectedStatus />
					<ConferenceAttendance {externalConference} />
				</div>
			</div>
		</Content>
	</Paper>
{/if}

<style lang="scss">
	@use '../../../../styles/mixin' as *;

	.visuallyhidden {
		@include visuallyhidden();
	}

	.spinner-container {
		height: 70rem;
		display: flex;
		justify-content: center;
		align-items: center;
		:global(.spinner) {
			height: 10rem;
			width: 10rem;
		}
	}

	// Mobile
	h1 {
		font-weight: 600;
	}

	h2 {
		font-size: 1rem;
		font-weight: 600;
	}

	hr {
		display: none;
	}

	p {
		margin-bottom: 0;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	:global(.paper-container) {
		padding: 0 !important;
	}

	.conference-details {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 2rem;

		.conference-details-main-content {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			.conference-details-main-content-status {
				display: flex;
				flex-direction: column;
				gap: 2rem;
			}
		}

		.conference-details-content-info-status {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		.conference-details-main-content-description {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			.conference-details-main-content-description-comment {
				height: 11rem;
				background: rgba(217, 217, 217, 0.32);
				border-radius: 10px;
			}
		}
	}

	// Desktop
	@media (min-width: 900px) {
		.conference-details {
			display: grid !important;
			grid-template-columns: 1fr 0.5fr;
			padding: 2rem 3rem;

			.conference-details-main-content {
				.conference-details-main-content-description {
					display: grid;
					grid-template-columns: 1fr 0.5fr;
				}
			}
			.conference-details-status {
				display: flex;
				flex-direction: column;
				gap: 2rem;
			}
		}

		.conference-details-main-content-status {
			display: none !important;
		}
	}

	@media (max-width: 901px) {
		.conference-details-status {
			display: none !important;
		}
	}
</style>
