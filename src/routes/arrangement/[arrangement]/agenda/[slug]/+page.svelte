<script lang="ts">
	import type { IEvent } from '../../../../../model/event';
	import AgendaLayout from '../../../../../components/agenda/AgendaLayout.svelte';
	export let data;
	export let event: IEvent = data.event;
	export let performance = data.performance;
	export let submission = data.submission;
</script>

<AgendaLayout {event} {performance} {submission} />
