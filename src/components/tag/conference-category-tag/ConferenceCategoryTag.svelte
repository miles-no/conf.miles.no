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
				[ConferenceCategory.Innovasjon]: 'info',
        [ConferenceCategory.Admin]: 'success',
				[ConferenceCategory.Test]: 'error',
	};
</script>

<Tag variant="outlined-with-bg" color={TAG_COLORS[category]} ariaHidden={true}>{category}</Tag>
