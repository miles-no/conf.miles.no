<script lang="ts">
	import ConferenceInformation from '../../../../components/conferance/conference-information/ConferenceInformation.svelte';
	import type { IPageLoadData } from './+page.server';
	import Paper, { Content } from '@smui/paper';

	import type { StatusType } from '../../../../enums/status';
	import ConferenceCategoryTag from '../../../../components/tag/conference-category-tag/ConferenceCategoryTag.svelte';
	import ConferenceStatus from '../../../../components/conferance/conference-status/ConferenceStatus.svelte';
	import ConferenceAttendance from '../../../../components/conferance/conference-attendance/ConferenceAttendance.svelte';

	export let data: IPageLoadData | undefined = undefined;
	export let externalConference = data?.conference;
	export let user = data?.user;

	const interestedPerson = externalConference?.employees.filter(
		(person) => person.status === 'interested'
	);
	const registeredPerson = externalConference?.employees.filter(
		(person) => person.status !== 'interested'
	);

	let selectedStatus: StatusType | undefined = undefined;
	console.log(data);
</script>

<svelte:head>
	<title>{externalConference?.title} - Miles</title>
</svelte:head>

<Paper class="paper-container" variant="unelevated">
	<Content>
		<img src={externalConference?.imageUrl} alt="" />
		<div class="conference-details-content">
			<div class="conference-details-content-info">
				<div class="conference-details-content-info-content">
					<h1>{externalConference?.title}</h1>
					<hr class="grey-text" />
					<ConferenceInformation conference={externalConference} />

					{#if externalConference?.categoryTag && externalConference.categoryTag.length > 0}
						<div>
							{#each externalConference.categoryTag as categoryType}
								<ConferenceCategoryTag category={categoryType} />
							{/each}
							<hr class="grey-text" />
						</div>
					{/if}
				</div>
				<div class="conference-details-content-info-status">
					<ConferenceStatus bind:selectedStatus />
					<ConferenceAttendance {externalConference} />
				</div>
			</div>
			<div class="conference-details-content-description">
				<div class="conference-details-content-description-content">
					<h2 class="visuallyhidden">Om konferanse</h2>
					<p>{externalConference?.description[0].children[0].text}</p>
					<div class="conference-details-content-description-content-comment">Kommentarer</div>
				</div>
			</div>
			<div>
				<h2>Miles bidrag</h2>
			</div>
		</div>
	</Content>
</Paper>

<style lang="scss">
	@use '../../../../styles/mixin' as *;

	.visuallyhidden {
		@include visuallyhidden();
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

	.conference-details-content {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 2rem;
	}

	.conference-details-content-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.conference-details-content-info-status {
		display: flex;
		flex-direction: column;
		gap: 2rem !important;
	}

	.conference-details-content-description {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		.conference-details-content-description-content-comment {
			// width: 16rem;
			height: 11rem;
			background: rgba(217, 217, 217, 0.32);
			border-radius: 10px;
		}
	}

	// Desktop
	.conference-details-content-info-content {
		grid-area: information;
	}

	.conference-details-content-info-status {
		grid-area: status;
	}

	@media (max-width: 1166px) {
		.conference-details-content-info {
			display: flex !important;
			height: auto !important;
		}

		.conference-details-content-description-content {
			display: flex !important;
			flex-direction: column;
			gap: 2rem;
		}
	}

	@media (min-width: 1000px) {
		hr {
			border: 1px solid;
		}

		.conference-details-content {
			padding: 2.6rem 4rem !important;
		}

		.conference-details-content-info {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas: 'information information status';
			height: 14rem;
			gap: 1rem;
		}

		.conference-details-content-description {
			.conference-details-content-description-content {
				.conference-details-content-description p {
					grid-area: description;
				}

				.conference-details-content-description-content-comment {
					grid-area: descriptionComment;
				}

				display: grid;
				grid-template-columns: 1fr 0.5fr 1fr;
				grid-template-areas: 'description descriptionComment .';

				p {
					padding-right: 2rem;
				}
			}
		}
	}
</style>
