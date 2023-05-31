<script lang="ts">
	import {
		ConferenceCategory,
		type ConferenceCategoryType
	} from '../../../enums/conference-category';
	import Tag from '../Tag.svelte';

	export let category: ConferenceCategoryType;

	const TAG_COLORS = {
        [ConferenceCategory.UX_Design]: 'info',
        [ConferenceCategory.Utvikling]: 'success',
        [ConferenceCategory.Smidig]: 'error',
        [ConferenceCategory.Prosjektledelse]: 'info',
        [ConferenceCategory.Admin]: 'success'
	};
</script>

<Tag variant="outlined-with-bg" color={getTagColor(category)} ariaHidden={true}>{category}</Tag>
