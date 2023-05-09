<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import ConferenceInformation from '../../../../components/conferance/conference-information/ConferenceInformation.svelte';
	import type { IPageLoadData } from './+page.server';

	export let data: IPageLoadData | undefined = undefined;
	export let externalConference = data?.conference;
	export let user = data?.user;
</script>

<svelte:head>
	<title>{externalConference?.title} - Miles</title>
</svelte:head>

<LayoutGrid class="conference-details">
	<Cell span={12}>
		<!-- decorative image must be given null alternative text -->
		<img class="conference-details-image" src={externalConference?.imageUrl} alt="" />
	</Cell>
	<Cell span={12}>
		<h1>{externalConference?.title}</h1>
	</Cell>
	<Cell span={12}>
		<ConferenceInformation conference={externalConference} />
	</Cell>
</LayoutGrid>

<style lang="scss">
	h1 {
		font-weight: 600;
	}

	.conference-details-image {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
</style>
