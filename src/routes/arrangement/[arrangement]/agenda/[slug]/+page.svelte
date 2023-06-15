<script lang="ts">
	import AgendaLayout from '../../../../../components/agenda/AgendaLayout.svelte';
	import type { IAgendaPageLoadData } from '../../../../konferanser/[slug]/agenda/[submissionSlug]/+page.server';

	export let data: IAgendaPageLoadData;
</script>

<AgendaLayout event={data.event} performance={data.performance} submission={data.submission} />
