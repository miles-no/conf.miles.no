<script lang="ts">
	import LayoutGrid from '@smui/layout-grid';
	import Button, { Icon, Label } from '@smui/button';
	import Cell from '@smui/layout-grid/src/Cell.svelte';
	import ConferenceCard from '../../components/conference/ConferenceCard/ConferenceCard.svelte';
	import Textfield from '@smui/textfield';
	import NewConferenceModal from '../../components/conference/NewConferenceModal/NewConferenceModal.svelte';
	import type { IExternalConferencesPageLoadData } from './+page.server';
	import type { ConferenceCategoryType } from '../../enums/conference-category';
	import { displayNewConferenceModal } from '../../components/conference/NewConferenceModal/newConferenceStores';
	import ConferenceCategoryCheckboxGroup from '../../components/checkbox/conference-category-checkbox-group/ConferenceCategoryCheckboxGroup.svelte';
	import FilterConferenceCategoryModal from '../../components/modal/filter-conference-category-modal/FilterConferenceCategoryModal.svelte';
	export let data: IExternalConferencesPageLoadData;
	export let externalConferences = data.externalConferences;
	let user = data.user;

	let selectedCategoryType: ConferenceCategoryType[] = [];
	$: searchTerm = '';
	$: filterByTags =
		selectedCategoryType.length > 0
			? externalConferences.filter(
					(conf) =>
						conf.categoryTag && conf.categoryTag.some((tag) => selectedCategoryType.includes(tag))
			  )
			: externalConferences;

	$: filteredConferences = filterByTags.filter((conf) =>
		conf.title.toLowerCase().includes(searchTerm)
	);

	let openFilterCategory = false;
	let screenSize: number;

	function openModal() {
		displayNewConferenceModal.set(true);
	}

	const onSelectCategory = (selected: ConferenceCategoryType[]) => {
		selectedCategoryType = selected;
		openFilterCategory = false;
	};
</script>

<svelte:window bind:innerWidth={screenSize} />
<svelte:head>
	<title>
		{'Konferanser - Miles'}
	</title>
</svelte:head>

<div class="container">
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
		<div>
			<Textfield variant="outlined" bind:value={searchTerm} label="Søk etter konferanse">
				<Icon class="material-icons" slot="trailingIcon">search</Icon>
			</Textfield>
		</div>
		<div class="filter-category-container">
			{#if screenSize >= 900}
				<ConferenceCategoryCheckboxGroup bind:selectedCategoryType />
			{:else}
				<Button
					variant="outlined"
					class="button-shaped-round"
					on:click={() => (openFilterCategory = !openFilterCategory)}
				>
					<Label>Kategori</Label>
					<Icon class="material-icons">expand_more</Icon>
				</Button>
			{/if}
		</div>
	</div>
	<div>
		<LayoutGrid>
			{#each filteredConferences as conference}
				<Cell>
					<ConferenceCard {conference} {user} />
				</Cell>
			{/each}
		</LayoutGrid>
	</div>

	{#if openFilterCategory}
		<FilterConferenceCategoryModal
			open={openFilterCategory}
			{selectedCategoryType}
			onSelect={onSelectCategory}
		/>
	{/if}
</div>

<style>
	.container {
		max-width: 1320px;
		margin: auto;
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
