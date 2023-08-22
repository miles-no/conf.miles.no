<script lang="ts">
	import Button, { Icon, Label } from '@smui/button';
	import Select, { Option } from '@smui/select';
	import FormField from '@smui/form-field';
	import Switch from '@smui/switch';
	import ConferenceCard from '../../components/conference/ConferenceCard/ConferenceCard.svelte';
	import Textfield from '@smui/textfield';
	import NewConferenceModal from '../../components/conference/NewConference/Modal/NewConferenceModal.svelte';
	import type { IConferencesPageLoadData } from './+page.server';
	import type { ConferenceCategoryType } from '../../enums/conference-category';
    import {displayNewConferenceModal, initStore} from '../../components/conference/NewConference/stores/stores';
	import ConferenceCategoryCheckboxGroup from '../../components/checkbox/conference-category-checkbox-group/ConferenceCategoryCheckboxGroup.svelte';
	import FilterConferenceCategoryModal from '../../components/modal/filter-conference-category-modal/FilterConferenceCategoryModal.svelte';
	import { goto } from '$app/navigation';
	import { formatDateYYYYMMDD } from '../../utils/date-time-utils';

	export let data: IConferencesPageLoadData;
	const urlParams = new URLSearchParams(window.location.search);
	const user = data.user;

	let selectedCategoryType: ConferenceCategoryType[] = [];
	let openFilterCategory = false;
	let screenSize: number;

	function openModal() {
		displayNewConferenceModal.set(true);
	}

	const categoryParam = urlParams.get('category');
	if (Array.isArray(categoryParam)) {
		selectedCategoryType = categoryParam;
	} else if (typeof categoryParam === 'string') {
		selectedCategoryType = [categoryParam as ConferenceCategoryType];
	}

	const onSelectCategory = (selected: ConferenceCategoryType[]) => {
		openFilterCategory = false;
		selectedCategoryType = selected;
	};

	$: if (selectedCategoryType) {
		if (selectedCategoryType.length == 0) {
			urlParams.delete('category');
			goto(`?${urlParams.toString()}`);
		} else {
			urlParams.set('category', selectedCategoryType.toString());
			goto(`?${urlParams.toString()}`);
		}
	}

	const startYear: number = 2022;
	const currentYear = new Date().getFullYear();
	const selectableYears: number[] = [];
	for (let i = startYear; i <= currentYear + 3; i++) {
		selectableYears.push(i);
	}
	let selectedYear = urlParams.get('year') !== null ? parseInt(urlParams.get('year')!) : undefined;
	let showPastEvents = urlParams.get('past') === 'true';

	const onSelectYear = async (event: any) => {
		const updatedValue = event.target.dataset.value;

		if (updatedValue !== '') {
			urlParams.set('year', updatedValue);
			showPastEvents = updatedValue < currentYear;
			if (showPastEvents) {
				urlParams.set('past', 'true');
			} else {
				urlParams.delete('past');
			}
		} else {
			urlParams.delete('year');
			urlParams.delete('past');
			showPastEvents = false;
		}

		goto(`?${urlParams.toString()}`);
	};

	const onShowPastEvents = async () => {
		const updatedValue = !showPastEvents;
		if (updatedValue) {
			urlParams.set('past', 'true');
		} else {
			urlParams.delete('past');
		}
		goto(`?${urlParams.toString()}`);
	};

	$: conferences = data.conferences;
	$: searchTerm = '';
	$: filterByTags =
		selectedCategoryType.length > 0
			? conferences.filter(
					(conf) =>
						conf.categoryTag && conf.categoryTag.some((tag) => selectedCategoryType.includes(tag))
			  )
			: conferences;
	$: filteredConferences = filterByTags
		.filter((conf) => {
			if (searchTerm != '') {
				return conf.title.toLowerCase().includes(searchTerm);
			}
			const now = formatDateYYYYMMDD(new Date());
			return showPastEvents ? conf.endDate < now : conf.endDate > now;
		})
		.sort((a, b) => {
			const endDateA = new Date(a.endDate).getTime();
			const endDateB = new Date(b.endDate).getTime();
			return showPastEvents ? endDateB - endDateA : endDateA - endDateB;
		});


    initStore();
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
		<h1 class="conference-heading">Konferanser</h1>
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
			/>
		</div>
		<div class="filter-by-year-container">
			<Select id="year" class="select-input" variant="outlined" bind:value={selectedYear}>
				<Option value={undefined} on:click={onSelectYear}>Velg år</Option>
				{#each selectableYears as year}
					<Option value={year} on:click={onSelectYear}>{year}</Option>
				{/each}
			</Select>
		</div>
		<div>
			<FormField>
				<Switch bind:checked={showPastEvents} on:click={onShowPastEvents} icons={false} />
				<span slot="label">Vis tidligere konferanser</span>
			</FormField>
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
		{#each filteredConferences as conference (conference._id)}
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

	.conference-heading {
		margin: 0;
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
	.filter-by-year-container {
		:global(.select-input) {
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
			flex-wrap: wrap;
			width: 100%;
		}
	}
</style>
