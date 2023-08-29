<script lang="ts">
	import { Icon } from '@smui/button';
	import ConferenceInformation from '../../../components/conference/conference-information/ConferenceInformation.svelte';
	import type { IConferenceSlugPageLoadData } from './+page.server';
	import Paper, { Content } from '@smui/paper';
	import ConferenceStatus from '../../../components/conference/conference-status/ConferenceStatus.svelte';
	import ConferenceAttendance from '../../../components/conference/conference-attendance/ConferenceAttendance.svelte';
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Status, type StatusKeyType } from '../../../enums/status';
	import { onMount, getContext } from 'svelte';
	import type { IToastContextProps } from '../../../components/toast/toast-context';
	import { urlFor } from '../../../utils/sanityclient-utils';
	import { PortableText } from '@portabletext/svelte';
	import NoImage from '../../../components/no-image/NoImage.svelte';
	import type { IPerformance } from '../../../model/event';
	import ConferencePerformanceCard from '../../../components/conference/conference-perfermance-card/ConferencePerformanceCard.svelte';
	import { formatDate, type IFormatOptions } from '../../../utils/date-time-utils';
	import PerformanceModal from '../../../components/modal/performance-modal/PerformanceModal.svelte';
	import ConferenceCategoryTag from '../../../components/tag/conference-category-tag/ConferenceCategoryTag.svelte';
	import { updateEmployeesStatus } from '../../../utils/conference-utils';
	import type { ToastDataType } from '../../../components/conference/NewConference/submitHandler';

	interface IPerformanceMapByDate {
		[key: string]: IPerformance[];
	}

	export let data: IConferenceSlugPageLoadData;
	$: conference = data.conference;
	$: user = data.user;
	$: selectedStatus = data?.myStatus;

	const toastContext = getContext<IToastContextProps>('toastContext');
	const formatOption: IFormatOptions = { weekday: 'long', day: '2-digit', month: 'long' };

	let open = false;
	let selectedPerformance: IPerformance;
	let disableStatus: boolean = false;

	$: allDates = Array.from(
		new Set(conference.performances?.map((p) => formatDate(p.dateAndTime, formatOption)))
	);

	$: performanceMapByDate = allDates?.reduce((previousValue, currentValue) => {
		const filtered = conference.performances?.filter(
			(p) => formatDate(p.dateAndTime, formatOption) === currentValue
		);
		if (filtered !== undefined) {
			return {
				...previousValue,
				[currentValue]: filtered
			};
		}
	}, undefined as IPerformanceMapByDate | undefined);

	const onSelectStatus = async (event: any) => {
		const newStatus = event.target.dataset.value as StatusKeyType;
		const statusText = Status[newStatus].toLowerCase();

		if (newStatus && newStatus !== selectedStatus) {
			disableStatus = true;
			const response = await fetch('/api/conference', {
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
			disableStatus = false;
		}
	};

	const onOpenModal = (key: string) => {
		const foundPerformance = conference.performances?.find((p) => p._key === key);
		if (foundPerformance) {
			selectedPerformance = foundPerformance;
			open = !open;
		}
	};

	onMount(() => {
		try {
			if (typeof sessionStorage !== 'undefined') {
				const sessionStorageKey = `new-conference-toast-` + conference.slug;
				const toast: ToastDataType = JSON.parse(sessionStorage.getItem(sessionStorageKey));
				if (toast && typeof toast === 'object') {
					const { type, title, description, duration } = toast;
					if (type) {
						toastContext.createToastBody(type, title, description);
					}
					if (duration) {
						toastContext.setDuration(duration);
					}
					toastContext.showToast();
				}
				sessionStorage.removeItem(sessionStorageKey);
			}
		} catch (e) {
			console.warn(e);
		}
	});
</script>

<svelte:head>
	<title>
		{`${conference.title} - Miles`}
	</title>
</svelte:head>

<div class="conference-details-container">
	<div class="conference-link-to-overview">
		<a href={'/konferanser/'} title="Tilbake til konferanseoversikten">
			<Icon class="material-icons" alt="">arrow_back</Icon> Tilbake til konferanseoversikten
		</a>
	</div>
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
				<a
					class="edit-link"
					href={`/rediger/konferanse/${conference.slug}`}
					title="Rediger konferansen"
				>
					<h1>{conference.title}</h1>
				</a>
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
						<ConferenceStatus {selectedStatus} {onSelectStatus} disabled={disableStatus} />
					</div>
					<div>
						<h2 class="visuallyhidden">Deltaker</h2>
						<ConferenceAttendance {conference} email={user.email} />
					</div>
				</div>
				{#if conference.description?.length > 0}
					<div class="conference-details-main-content-description">
						<h2 class="visuallyhidden">Om konferanse</h2>
						<PortableText value={conference.description} />
						<!-- <div class="conference-details-main-content-description-comment">Kommentarer</div> -->
					</div>
				{/if}

				{#if allDates.length > 0 && performanceMapByDate}
					<div class="conference-details-main-content-miles-bidrag">
						<h2>Miles bidrag</h2>
						<div class="miles-bidrag-content light-gray-bg-color">
							{#each allDates as date}
								<h3 class="date">{date}</h3>
								<div class="miles-bidrag-content-per-day">
									{#each performanceMapByDate[date] as performance}
										<ConferencePerformanceCard {performance} handleModal={onOpenModal} />
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
					<ConferenceStatus {selectedStatus} {onSelectStatus} disabled={disableStatus} />
				</div>
				<div>
					<h2 class="visuallyhidden">Deltaker</h2>
					<ConferenceAttendance {conference} email={user.email} />
				</div>
			</Content>
		</Paper>
	</div>
	{#if selectedPerformance}
		<PerformanceModal
			performance={selectedPerformance}
			conferenceSlug={conference.slug}
			bind:open
		/>
	{/if}
</div>

<style lang="scss">
	@use '../../../styles/mixin' as *;

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

	h3 {
		font-size: 1rem;
		margin: 0;
	}

	p {
		margin-bottom: 0;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.conference-link-to-overview {
		padding-bottom: 1rem;
		font-size: 1rem;
	}

	.conference-link-to-overview a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
	}

	.conference-link-to-overview a:hover {
		text-decoration: none;
	}

	.conference-details-container-image {
		padding-bottom: 1rem;
	}

	.conference-details {
		display: flex;
		flex-direction: column;
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

			.date {
				text-transform: uppercase;
				font-weight: 600;
			}

			.miles-bidrag-content {
				border-radius: 1rem;
				padding: 1.5rem;
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
					.miles-bidrag-content-per-day {
						display: grid;
						grid-template-columns: repeat(2, 1fr);
					}
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

	.edit-link {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
</style>
