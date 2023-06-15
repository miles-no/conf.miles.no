<script lang="ts">
	import type { IEvent } from '../../../../../model/event';
	import AgendaLayout from '../../../../../components/agenda/AgendaLayout.svelte';
	import type { IAgendaPageLoadData } from './+page.server';

	export let data: IAgendaPageLoadData;
	export let event: IEvent = data.event;
	export let performance = data.performance;
	export let submission = data.submission;
</script>

<AgendaLayout {event} {performance} {submission} />
