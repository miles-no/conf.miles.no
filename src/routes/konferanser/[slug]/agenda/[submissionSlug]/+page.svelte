<script lang="ts">
	import AgendaLayout from '../../../../../components/agenda/AgendaLayout.svelte';
	import type { IAgendaPageLoadData } from './+page.server';

	export let data: IAgendaPageLoadData;
</script>

<AgendaLayout event={data.event} performance={data.performance} submission={data.submission} />
