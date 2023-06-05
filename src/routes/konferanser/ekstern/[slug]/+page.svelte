<script lang="ts">
	import ConferenceInformation from '../../../../components/conferance/conference-information/ConferenceInformation.svelte';
	import type { IPageLoadData } from './+page.server';
	import Paper, { Content } from '@smui/paper';
	import ConferenceCategoryTag from '../../../../components/tag/conference-category-tag/ConferenceCategoryTag.svelte';
	import ConferenceStatus from '../../../../components/conferance/conference-status/ConferenceStatus.svelte';
	import ConferenceAttendance from '../../../../components/conferance/conference-attendance/ConferenceAttendance.svelte';
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Status, type StatusKeyType } from '../../../../enums/status';
	import { getContext } from 'svelte';
	import type { IToastContextProps } from '../../../../components/toast/toast-context';
	import { updateEmployeesStatus } from '../../../../utils/conference-utils';
	import { urlFor } from '../../../../utils/sanityclient-utils';
	import { PortableText } from '@portabletext/svelte';
	import NoImage from '../../../../components/no-image/NoImage.svelte';
	import { intlFormat } from 'date-fns';
	import type { IPerformance } from '../../../../model/conference';
	import ExternalConferencePerformanceCard from '../../../../components/conferance/external-conference-perfermance-card/ExternalConferencePerformanceCard.svelte';

	export let data: IPageLoadData;
	$: conference = data.conference;
	$: user = data.user;
	$: selectedStatus = data?.myStatus;
	const toastContext = getContext<IToastContextProps>('toastContext');

	const formatDate = (date: string) =>
		intlFormat(
			Date.parse(date),
			{ weekday: 'long', day: '2-digit', month: 'long' },
			{ locale: 'nb-NO' }
		);

	$: allDates = new Set(conference?.performances?.map((p) => formatDate(p.dateAndTime)));

	$: performanceMapByDate = Array.from(allDates)?.reduce((prev, cur) => {
		return {
			...prev,
			[cur]: conference?.performances?.filter((p) => formatDate(p.dateAndTime) === cur)
		};
	}, {});

	$: milesPerformances = Object.entries(performanceMapByDate) as [string, IPerformance][];

	const onSelectStatus = async (event: any) => {
		const newStatus = event.target.dataset.value as StatusKeyType;
		const statusText = Status[newStatus].toLowerCase();

		if (newStatus && newStatus !== selectedStatus) {
			const response = await fetch('/api/external-conference', {
				method: 'PUT',
				body: JSON.stringify({
					...conference,
					employees: updateEmployeesStatus(conference?.employees ?? [], newStatus, user.email)
				})
			});
			const result = await response.json();
			if (result.success) {
				toastContext.createToastBody('success', 'Vellykket', `Status oppdatert til ${statusText}`);

				// re-run all `load` functions, following the successful update
				await invalidateAll();
			} else {
				toastContext.createToastBody(
					'error',
					'Feil',
					`Det oppstod en feil ved oppdatering av status til ${statusText}`
				);
			}

			toastContext.showToast();
			applyAction(result);
		}
	};
</script>

<svelte:head>
	<title>
		{`${conference?.title ? conference.title : 'Side ikke funnet'} - Miles`}
	</title>
</svelte:head>

<div class="conference-details-container">
	<div class="conference-details-container-image">
		{#if conference?.imageUrl}
			<img src={urlFor(conference.imageUrl).size(900, 300).quality(100).url()} alt="" />
		{:else}
			<NoImage />
		{/if}
	</div>
	<div class="conference-details">
		<Paper variant="unelevated">
			<Content class="conference-details-main-content">
				<h1>{conference.title}</h1>
				<ConferenceInformation {conference} />
				{#if conference.categoryTag}
					<div class="conference-details-main-content-tags-container">
						{#each conference.categoryTag as categoryType}
							<ConferenceCategoryTag category={categoryType} />
						{/each}
					</div>
				{/if}
				<!-- show on mobile, hide on desktop -->
				<div class="conference-details-main-content-status">
					<div>
						<h2 class="visuallyhidden">Min status</h2>
						<ConferenceStatus {selectedStatus} {onSelectStatus} />
					</div>
					<div>
						<h2 class="visuallyhidden">Deltaker</h2>
						<ConferenceAttendance {conference} />
					</div>
				</div>
				{#if conference.description?.length > 0}
					<div class="conference-details-main-content-description">
						<h2 class="visuallyhidden">Om konferanse</h2>
						<PortableText value={conference.description} />
						<!-- <div class="conference-details-main-content-description-comment">Kommentarer</div> -->
					</div>
				{/if}
				{#if conference.performances}
					<div class="conference-details-main-content-miles-bidrag">
						<h2>Miles bidrag</h2>
						<div class="miles-bidrag-content">
							{#each milesPerformances as [key, value]}
								<div class="miles-bidrag-content-per-day">
									<p class="date">{key}</p>
									{#each value as performance}
										<ExternalConferencePerformanceCard {performance} />
									{/each}
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</Content>
		</Paper>

		<!-- show on desktop, hide on mobile -->
		<Paper class="conference-details-status-container" variant="unelevated">
			<Content class="conference-details-status">
				<div>
					<h2 class="visuallyhidden">Min status</h2>
					<ConferenceStatus {selectedStatus} {onSelectStatus} />
				</div>
				<div>
					<h2 class="visuallyhidden">Deltaker</h2>
					<ConferenceAttendance {conference} />
				</div>
			</Content>
		</Paper>
	</div>
</div>

<style lang="scss">
	@use '../../../../styles/mixin' as *;
	@use '../../../../styles/colors' as *;

	.visuallyhidden {
		@include visuallyhidden();
	}

	// Mobile
	h1 {
		font-weight: 600;
	}

	h2 {
		font-size: 1.3rem;
		font-weight: 500;
	}

	p {
		margin-bottom: 0;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.conference-details-container-image {
		padding-bottom: 1rem;
	}

	.conference-details {
		display: flex;
		flex-direction: column;
		// padding: 1rem;
		gap: 2rem;

		:global(.conference-details-main-content) {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}
		.conference-details-main-content-status {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}
		.conference-details-main-content-tags-container {
			display: flex;
			gap: 1rem;
		}

		.conference-details-content-info-status {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		.conference-details-main-content-miles-bidrag {
			display: flex;
			flex-direction: column;

			.miles-bidrag-content {
				background-color: $very-light-gray;
				border-radius: 1rem;
				.date {
					text-transform: uppercase;
				}
				padding: 1rem;
				.miles-bidrag-content-per-day {
					display: flex;
					flex-direction: column;
					gap: 1rem;
					padding-bottom: 1rem;
				}
			}
		}
		// TODO: remove this when comments has been implemented
		// .conference-details-main-content-description {
		// 	display: flex;
		// 	flex-direction: column;
		// 	gap: 2rem;
		// 	.conference-details-main-content-description-comment {
		// 		height: 11rem;
		// 		background: rgba(217, 217, 217, 0.32);
		// 		border-radius: 10px;
		// 	}
		// }
	}

	// Desktop
	@media (min-width: 900px) {
		.conference-details-container {
			padding: 2rem 5rem 8rem 5rem;
		}

		.conference-details {
			display: grid !important;
			grid-template-columns: 1fr 0.5fr;

			// TODO: remove this when comments has been implemented
			// :global(.conference-details-main-content) {
			// 	:global(.conference-details-main-content-description) {
			// 		display: grid;
			// 		grid-template-columns: 1fr 0.5fr;
			// 	}
			// }
			:global(.conference-details-status) {
				display: flex;
				flex-direction: column;
				gap: 2rem;
			}

			.conference-details-main-content-miles-bidrag {
				.miles-bidrag-content {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 1rem;
				}
			}
		}
	}

	@media (max-width: 1050px) {
		:global(.conference-details-status-container) {
			display: none !important;
		}

		.conference-details {
			display: flex !important;

			// TODO: remove this when comments has been implemented
			// .conference-details-main-content-description {
			// 	display: flex !important;
			// }
		}
	}

	@media (min-width: 1051px) {
		.conference-details-main-content-status {
			display: none !important;
		}
	}
</style>
