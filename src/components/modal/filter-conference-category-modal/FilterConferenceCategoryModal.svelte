<script lang="ts">
	import Dialog from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';

	import ConferenceCategoryCheckboxGroup from '../../checkbox/conference-category-checkbox-group/ConferenceCategoryCheckboxGroup.svelte';
	import type { ConferenceCategoryType } from '../../../enums/conference-category';

	export let open: boolean = false;
	export let selectedCategoryType: ConferenceCategoryType[] = [];
	export let onSelect: (selected: ConferenceCategoryType[]) => void;

	let selected = selectedCategoryType;
</script>

<Dialog bind:open>
	<div class="filter-conference-category-modal-content-container">
		<IconButton class="material-icons close-button" on:click={() => (open = !open)}
			>close</IconButton
		>
		<div class="checkbox-container">
			<h1>Velg kategori</h1>
			<ConferenceCategoryCheckboxGroup bind:selectedCategoryType={selected} direction="vertical" />
		</div>
		<Button class="select-btn" variant="raised" on:click={() => onSelect(selected)}>
			<Label>Bruk</Label>
		</Button>
	</div>
</Dialog>

<style lang="scss">
	.filter-conference-category-modal-content-container {
		padding: 0 1rem 1rem 1rem;
		:global(.close-button) {
			float: right;
		}
	}
	.checkbox-container {
		padding: 2rem 0.7rem 0.7rem 0.7rem;
	}

	:global(.select-btn) {
		width: 100%;
	}
</style>
