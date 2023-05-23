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

	export let data: IPageLoadData;
	$: conference = data.conference;
	$: user = data.user;
	$: selectedStatus = data?.myStatus;
	const toastContext = getContext<IToastContextProps>('toastContext');

	const createSuccessToastBody = (statusText: string) => {
		toastContext.setType('success');
		toastContext.setTitle('Vellykket');
		toastContext.setDescription(`Status oppdatert til ${statusText} `);
	};

	const createErrorToastBody = (statusText: string) => {
		toastContext.setType('error');
		toastContext.setTitle('Feil');
		toastContext.setDescription(`Det oppstod en feil ved oppdatering av status til ${statusText} `);
	};

	const onSelectStatus = async (event: any) => {
		const newStatus = event.target.dataset.value as StatusKeyType;
		const statusText = Status[newStatus].toLowerCase();

		if (newStatus && newStatus !== selectedStatus) {
			const response = await fetch('/api/external-conference', {
				method: 'PUT',
				body: JSON.stringify({
					...conference,
					employees: updateEmployeesStatus(conference.employees, newStatus, user.email)
				})
			});
			const result = await response.json();
			if (result.success) {
				createSuccessToastBody(statusText);

				// re-run all `load` functions, following the successful update
				await invalidateAll();
				toastContext.showToast();
			} else {
				createErrorToastBody(statusText);
				toastContext.showToast();
			}
			applyAction(result);
		}
	};
</script>

<svelte:head>
	<title>
		{`${conference?.title ? conference.title : 'Side ikke funnet'} - Miles`}
	</title>
</svelte:head>

<Paper class="paper-container" variant="unelevated">
	<Content>
		<img src={conference.imageUrl} alt="" />
		<div class="conference-details">
			<div class="conference-details-main-content">
				<h1>{conference.title}</h1>
				<ConferenceInformation {conference} />
				<div class="conference-details-main-content-tags-container">
					{#each conference.categoryTag as categoryType}
						<ConferenceCategoryTag category={categoryType} />
					{/each}
				</div>
				<div class="conference-details-main-content-status">
					<ConferenceStatus {selectedStatus} {onSelectStatus} />
					<ConferenceAttendance {conference} />
				</div>
				<div class="conference-details-main-content-description">
					<h2 class="visuallyhidden">Om konferanse</h2>
					<p>{conference.description[0].children[0].text}</p>
					<div class="conference-details-main-content-description-comment">Kommentarer</div>
				</div>
			</div>
			<div class="conference-details-status">
				<ConferenceStatus {selectedStatus} {onSelectStatus} />
				<ConferenceAttendance {conference} />
			</div>
		</div>
	</Content>
</Paper>

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
			.conference-details-main-content-tags-container {
				display: flex;
				gap: 1rem;
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
				// TODO: remove this when comments has been implemented
				display: none;
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
	}

	@media (max-width: 1050px) {
		.conference-details-status {
			display: none !important;
		}

		.conference-details {
			display: flex !important;

			.conference-details-main-content-description {
				display: flex !important;
			}
		}
	}

	@media (min-width: 1051px) {
		.conference-details-main-content-status {
			display: none !important;
		}
	}
</style>
