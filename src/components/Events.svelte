<script lang="ts">
	import type { IEvent } from '../model/event';
	import Event from './Event.svelte';
	import { endOfDay } from 'date-fns';
	export let events: IEvent[] = [];

	$: being = events.filter(
		(conf) =>
			new Date(conf.startDate).getTime() <= Date.now() && Date.now() <= endOfDay(new Date(conf.endDate)).getTime()
	);
	$: to_be = events.filter((conf) => new Date(conf.startDate).getTime() >= Date.now());
	$: done = events.filter((conf) => new Date(conf.endDate).getTime() < Date.now());
</script>

<div class="mb-5">
	<h1 class="visually-hidden">Arrangement</h1>
	<h2 class="heading">Pågående</h2>
	{#each being.reverse() as event (event.title)}
		<Event {event} />
	{/each}
	<h2 class="heading">Kommende</h2>
	{#each to_be.reverse() as event (event.title)}
		<Event {event} />
	{/each}
	<h2 class="heading">Tidligere</h2>
	{#each done as event (event.title)}
		<Event {event} />
	{/each}
</div>

<style>
	.heading {
		font-weight: 300;
		margin: 1em 0 0.25em 1vw;
		font-size: 300%;
	}
</style>
