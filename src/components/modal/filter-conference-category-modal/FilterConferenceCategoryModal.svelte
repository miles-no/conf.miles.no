<script lang="ts">
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import ConferenceCategoryCheckboxGroup from '../../checkbox/conference-category-checkbox-group/ConferenceCategoryCheckboxGroup.svelte';
	import type { ConferenceCategoryType } from '../../../enums/conference-category';

	export let open: boolean = false;
	export let selectedCategoryType: ConferenceCategoryType[] = [];
	export let onSelect: (selected: ConferenceCategoryType[]) => void;

	let selected = selectedCategoryType;
	let modal: HTMLDivElement;

	$: if (open && modal) {
		modal.focus();
	}

	const closeModal = () => {
		open = false;
	};

	const keydown = (e: KeyboardEvent) => {
		e.stopPropagation();
		if (e.key === 'Escape') {
			closeModal();
		}
	};
</script>

{#if open}
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		role="dialog"
		aria-labelledby="modal-title"
		class="filter-category-modal-container"
		tabindex={0}
		on:keydown={keydown}
		bind:this={modal}
	>
		<div class="backdrop" on:click={closeModal} tabindex={0} on:keydown={keydown} />
		<div class="filter-conference-category-modal-content-container">
			<IconButton class="material-icons close-button" on:click={closeModal}>close</IconButton>
			<div class="content-container">
				<h1 id="modal-title">Velg kategori</h1>
				<ConferenceCategoryCheckboxGroup
					bind:selectedCategoryType={selected}
					direction="vertical"
				/>
			</div>
			<Button class="select-btn" variant="raised" on:click={() => onSelect(selected)}>
				<Label>Bruk</Label>
			</Button>
		</div>
	</div>
{/if}

<style lang="scss">
	.filter-category-modal-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.backdrop {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.filter-conference-category-modal-content-container {
		z-index: 10;
		max-width: 400px;
		width: 80vw;
		border-radius: 0.3rem;
		background-color: white;
		overflow: hidden;
		padding: 0 1rem 1rem 1rem;

		:global(.close-button) {
			float: right;
		}
	}

	.content-container {
		padding: 2rem 0.7rem 1.7rem 0.7rem;
	}

	:global(.select-btn) {
		width: 100%;
	}
</style>
