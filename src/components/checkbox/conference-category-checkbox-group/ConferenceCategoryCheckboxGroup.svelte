<script lang="ts">
	import classNames from 'classnames';
	import {
		ConferenceCategory,
		type ConferenceCategoryType
	} from '../../../enums/conference-category';

	export let selectedCategoryType: ConferenceCategoryType[] = [];
	export let direction: 'vertical' | 'horizontal' = 'horizontal';
	const options = Object.values(ConferenceCategory).map((category) => ({
		name: category,
		disabled: false
	}));
</script>

<fieldset class={classNames('category-checkbox-container', direction)}>
	<legend class="visuallyhidden">Velg kategori</legend>
	{#each options as option}
		<div>
			<input
				type="checkbox"
				name={option.name}
				id={option.name}
				value={option.name}
				disabled={option.disabled}
				bind:group={selectedCategoryType}
			/>
			<label for={option.name}>{option.name}</label>
		</div>
	{/each}
</fieldset>

<style lang="scss">
	@use '../../../styles/mixin' as *;

	.visuallyhidden {
		@include visuallyhidden();
	}

	.category-checkbox-container {
		gap: 1rem;
		font-size: 1rem;

		&.horizontal {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}

		&.vertical {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		> div {
			display: flex;
			align-items: center;
			gap: 0.3rem;
		}
	}
</style>
