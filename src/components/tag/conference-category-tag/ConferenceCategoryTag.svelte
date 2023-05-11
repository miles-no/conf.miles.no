<script lang="ts">
	import {
		ConferenceCategory,
		type ConferenceCategoryType
	} from '../../../enums/conference-category';
	import Tag from '../Tag.svelte';

	export let category: ConferenceCategoryType;

	const getTagColor = (category: string) => {
		switch (category) {
			case ConferenceCategory.UX_Design:
				return 'info';
			case ConferenceCategory.Utvikling:
				return 'success';
			default:
				return 'error';
		}
	};
</script>

<Tag variant="outlined-with-bg" color={getTagColor(category)}>{category}</Tag>
