<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import Dialog, { Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Status, type StatusKeyType } from '../../../enums/status';
	import ConferenceInformation from '../conference-information/ConferenceInformation.svelte';
	import ConferenceCategoryTag from '../../tag/conference-category-tag/ConferenceCategoryTag.svelte';
	import ConferenceStatus from '../conference-status/ConferenceStatus.svelte';
	import { urlFor } from '../../../utils/sanityclient-utils';
	import { updateEmployeesStatus } from '../../../utils/conference-utils';
	import { getContext } from 'svelte';
	import type { IToastContextProps } from '../../toast/toast-context';
	import type { User } from '$lib/types/user';
	import type { IConference } from '../../../model/conference';
	/**
	 * @type {boolean}
	 */
	export let open: boolean = false;
	export let isConference: boolean = false;

	/**
	 * @type {{ startDate: any; endDate: any; employees: any[]; _id: any; imageUrl: any; title: any; location: any; url: any; price: any; categoryTag: any; description: any; }}
	 */
	export let conference: IConference;
	export let user: User;

	const toastContext = getContext<IToastContextProps>('toastContext');

	let key = conference.employees?.find((e) => e.email === user.email)?.status;
	$: selectedStatus = key;

	const onSelectStatus = async (event: any) => {
		const newStatus = event.target.dataset.value as StatusKeyType;
		const statusText = Status[newStatus].toLowerCase();

		if (newStatus && newStatus !== selectedStatus) {
			if (user.email) {
				const response = await fetch('/api/conference', {
					method: 'PUT',
					body: JSON.stringify({
						...conference,
						employees: updateEmployeesStatus(conference?.employees ?? [], newStatus, user.email)
					})
				});
				const result = await response.json();

				if (result.success) {
					toastContext.createToastBody(
						'success',
						'Vellykket',
						`Status oppdatert til ${statusText}`
					);

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
		}
	};

	$: detailsPage = isConference
		? `/konferanser/${conference.slug}`
		: `/arrangement/${conference.slug}`;
</script>

<Dialog bind:open noContentPadding sheet aria-labelledby="modal-heading">
	<Content id="sheet-no-padding-content" class="dialog-container">
		<IconButton action="close" class="material-icons">close</IconButton>
		<div class="imageWrapper">
			<img
				style="width: 100%; height: 100%;"
				alt=""
				src={conference.imageUrl
					? urlFor(conference.imageUrl).size(900, 300).quality(100).url()
					: 'https://www.miles.no/wp-content/uploads/2020/11/PT6A3984-kopi.jpg'}
				height="300"
				width="
				500"
			/>
		</div>
		<div class="content">
			<h1 id="modal-heading">{conference.title}</h1>
			<div class="compactInfo">
				<ConferenceInformation {conference} />
				{#if conference.categoryTag}
					<div class="tagWrapper">
						{#each conference.categoryTag as activityType}
							<ConferenceCategoryTag category={activityType} />
						{/each}
					</div>
				{/if}
			</div>
			<div>
				{#if conference.description}
					<PortableText value={conference.description} />
				{/if}
			</div>
			<div class="actionWrapper">
				<ConferenceStatus title="Min status" {selectedStatus} {onSelectStatus} flexType="row" />
				<a href={detailsPage} on:click={() => (open = !open)}>Se flere detaljer </a>
			</div>
		</div>
	</Content>
</Dialog>

<style lang="scss">
	.imageWrapper {
		height: 200px;
	}
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
		padding: 2rem;
	}
	.compactInfo {
		border-top: 1px solid grey;
		border-bottom: 1px solid grey;
		padding: 1rem 0.5rem;
	}
	.info {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 2rem;
	}
	.tagWrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		max-width: 100%;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	.actionWrapper {
		display: flex;
		justify-content: space-between;

		a {
			display: flex;
			align-items: end;
		}
	}
</style>
