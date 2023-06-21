<script lang="ts">
	import LayoutGrid from '@smui/layout-grid';
	import Button, { Icon, Label } from '@smui/button';
	import Cell from '@smui/layout-grid/src/Cell.svelte';
	import ConferenceCard from '../../components/conference/ConferenceCard/ConferenceCard.svelte';
	import Textfield from '@smui/textfield';
	import NewConferenceModal from '../../components/conference/NewConferenceModal/NewConferenceModal.svelte';
	import type { IConferencesPageLoadData } from './+page.server';
	import type { ConferenceCategoryType } from '../../enums/conference-category';
	import { displayNewConferenceModal } from '../../components/conference/NewConferenceModal/newConferenceStores';
	import ConferenceCategoryCheckboxGroup from '../../components/checkbox/conference-category-checkbox-group/ConferenceCategoryCheckboxGroup.svelte';
	import FilterConferenceCategoryModal from '../../components/modal/filter-conference-category-modal/FilterConferenceCategoryModal.svelte';
	export let data: IConferencesPageLoadData;
	export let conferences = data.conferences;
	let user = data.user;

	let selectedCategoryType: ConferenceCategoryType[] = [];
	$: searchTerm = '';
	$: filterByTags =
		selectedCategoryType.length > 0
			? conferences.filter(
					(conf) =>
						conf.categoryTag && conf.categoryTag.some((tag) => selectedCategoryType.includes(tag))
			  )
			: conferences;

	$: filteredConferences = filterByTags.filter((conf) =>
		conf.title.toLowerCase().includes(searchTerm)
	);

	let openFilterCategory = false;
	let screenSize: number;

	function openModal() {
		displayNewConferenceModal.set(true);
	}

	const onSelectCategory = (selected: ConferenceCategoryType[]) => {
		openFilterCategory = false;
		selectedCategoryType = selected;
	};
</script>

<svelte:window bind:innerWidth={screenSize} />
<svelte:head>
	<title>
		{'Konferanser - Miles'}
	</title>
</svelte:head>

<div class="conference-page-container">
	{#if $displayNewConferenceModal}
		<NewConferenceModal />
	{/if}
	<div class="topRow">
		<h1>Konferanser</h1>
		<Button variant="raised" on:click={openModal}>
			<Label>Registrer ny</Label>
		</Button>
	</div>
	<div class="filter-container">
		<div class="filter-by-search-container">
			<Textfield
				class="search-input"
				variant="outlined"
				bind:value={searchTerm}
				label="Søk etter konferanse"
			>
				<Icon class="material-icons" slot="trailingIcon">search</Icon>
			</Textfield>
		</div>
		<div class="filter-category-container">
			{#if screenSize >= 900}
				<ConferenceCategoryCheckboxGroup bind:selectedCategoryType />
			{:else}
				<Button
					variant="outlined"
					class="filter-button button-shaped-round"
					on:click={() => (openFilterCategory = true)}
				>
					<Label>Kategori{selectedCategoryType.length === 1 ? ':' : ''}</Label>
					{#if selectedCategoryType.length > 1}
						<span class="selected-category-count">{selectedCategoryType.length}</span>
					{/if}
					{#if selectedCategoryType.length === 1}
						<span>
							{selectedCategoryType[0]}
						</span>
					{/if}
					<Icon class="material-icons">expand_more</Icon>
				</Button>
			{/if}
		</div>
	</div>
	<div class="conference-page-card-container">
		{#each filteredConferences as conference}
			<div>
				<ConferenceCard {conference} {user} />
			</div>
		{/each}
	</div>

	<FilterConferenceCategoryModal
		bind:open={openFilterCategory}
		{selectedCategoryType}
		onSelect={onSelectCategory}
	/>
</div>

<style lang="scss">
	@use '../../styles/mixin' as *;
	@use '../../styles/colors' as *;
	:global(.button-shaped-round) {
		@include button-shaped-round();
	}

	.conference-page-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.topRow {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.filter-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.filter-by-search-container {
		:global(.search-input) {
			width: 100%;
		}
	}
	:global(.filter-button) {
		max-width: 80vw !important;
		min-width: 20vw !important;
		display: flex;
		gap: 0.5rem;
		span {
			font-weight: 600;
		}

		.selected-category-count {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: $miles-red !important;
			font-size: 14px;
			color: white;
			border-radius: 50%;
			height: 23px;
			width: 23px;
			// Centering text
			padding-left: 2px;
		}
	}

	.conference-page-card-container {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
	}

	@media (min-width: 900px) {
		.filter-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 100%;
		}
	}
</style>
