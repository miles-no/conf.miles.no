<script lang="ts">
	import LayoutGrid from '@smui/layout-grid';
	import Button, { Icon, Label } from '@smui/button';
	import Cell from '@smui/layout-grid/src/Cell.svelte';
	import ConferenceCard from '../../components/conferance/ConferenceCard/ConferenceCard.svelte';
	import Textfield from '@smui/textfield';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	import type { IExternalConferencesPageLoadData } from './+page.server';
	import { ConferenceCategory } from '../../enums/conference-category';
	import type { ConferenceCategoryType } from '../../enums/conference-category';

	export let data: IExternalConferencesPageLoadData;
	export let externalConferences = data.externalConferences;
	let user = data.user;

	let selectedCategoryType: ConferenceCategoryType[] = [];
	$: searchTerm = '';
	$: filterByTags =
		selectedCategoryType.length > 0
			? externalConferences.filter((conf) =>
					conf.categoryTag.some((tag) => selectedCategoryType.includes(tag))
			  )
			: externalConferences;

	$: filteredConferences = filterByTags.filter((conf) =>
		conf.title.toLowerCase().includes(searchTerm)
	);

	let options = Object.values(ConferenceCategory).map((category) => ({
		name: category,
		disabled: false
	}));
</script>

<svelte:head>
	<title>
		{'Konferanser - Miles'}
	</title>
</svelte:head>

<div class="container">
	<div class="topRow">
		<h1>Konferanser</h1>
		<Button variant="raised">
			<Label>Registrer ny</Label>
		</Button>
	</div>
	<div class="filters">
		<div>
			<Textfield variant="outlined" bind:value={searchTerm} label="Søk etter konferanse">
				<Icon class="material-icons" slot="trailingIcon">search</Icon>
			</Textfield>
		</div>
		<div class="tagWrapper">
			{#each options as option}
				<div>
					<FormField>
						<Checkbox
							bind:group={selectedCategoryType}
							value={option.name}
							disabled={option.disabled}
						/>
						<span slot="label">{option.name}{option.disabled ? ' (disabled)' : ''}</span>
					</FormField>
				</div>
			{/each}
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
	.filters {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
	}
	.tagWrapper {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
