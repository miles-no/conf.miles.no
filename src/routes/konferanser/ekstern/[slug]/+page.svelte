<script lang="ts">
	import ConferenceInformation from '../../../../components/conferance/conference-information/ConferenceInformation.svelte';
	import type { IPageLoadData } from './+page.server';
	import { Status } from '../../../../enums/status';
	import type { StatusType } from '../../../../enums/status';
	import ConferenceCategoryTag from '../../../../components/tag/conference-category-tag/ConferenceCategoryTag.svelte';
	import ConferenceStatus from '../../../../components/conferance/conference-status/ConferenceStatus.svelte';

	export let data: IPageLoadData | undefined = undefined;
	export let externalConference = data?.conference;
	export let user = data?.user;

	let selectedStatus: StatusType | undefined = undefined;
</script>

<svelte:head>
	<title>{externalConference?.title} - Miles</title>
</svelte:head>

<div>
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
				<div class="conference-details-content-info-status-registered">
					<div>
						<h2 class="visuallyhidden">Alle som er interessert</h2>
						<p>Interessert</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
					</div>
					<div>
						<h2 class="visuallyhidden">Alle som er påmeldt</h2>
						<p>Påmeldt</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
						<p>Ola Normann</p>
					</div>
				</div>
			</div>
		</div>
		<div class="conference-details-content-description-container">
			<div class="conference-details-content-description">
				<h2 class="visuallyhidden">Om konferanse</h2>
				<p>{externalConference?.description[0].children[0].text}</p>
				<div class="conference-details-content-description-content-comment">kommentar</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../../styles/mixin' as *;

	.visuallyhidden {
		@include visuallyhidden();
	}

	// Mobile
	h1 {
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

	.conference-details-content {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 1rem;
	}

	.conference-details-content-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.conference-details-content-info-status {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		overflow: visible;
	}

	.conference-details-content-description {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		.conference-details-content-description-content-comment {
			width: 16rem;
			height: 11rem;
			background: rgba(217, 217, 217, 0.32);
			border-radius: 10px;
		}
	}

	// Desktop
	@media (min-width: 1000px) {
		hr {
			border: 1px solid;
		}

		.conference-details-content-info-content {
			grid-area: information;
		}

		.conference-details-content-info-status {
			grid-area: status;
		}

		.conference-details-content-description {
			grid-area: description;
		}

		.conference-details-content {
			padding: 2.6rem 4rem !important;
		}

		.conference-details-content-info {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas: 'information information status';
			height: 14rem;
			gap: 3rem;

			.conference-details-content-info-status {
				.conference-details-content-info-status-registered {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					border: 1px solid #000000;
					border-radius: 10px;

					div {
						padding: 0.5rem 1rem;
						&:first-of-type {
							border-right: 1px solid #000000;
						}
					}
				}
			}
		}

		.conference-details-content-description-container {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas: 'description description .';

			.conference-details-content-description {
				display: grid;
				grid-template-columns: 1fr 0.5fr;
				justify-items: end;
			}
		}
	}
</style>
