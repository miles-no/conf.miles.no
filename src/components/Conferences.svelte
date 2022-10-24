<script>
	import Conference from './Conference.svelte';
	import {endOfDay} from 'date-fns';
	export let conferences = [];
	$: being = conferences.filter(conf => new Date(conf.startDate) <= Date.now() && Date.now() <= endOfDay(new Date(conf.endDate)));
	$: to_be = conferences.filter(conf => new Date(conf.startDate) >= Date.now());
	$: done = conferences.filter(conf => new Date(conf.endDate) < Date.now());
</script>

<div class="mb-5">
	<h1 class="visually-hidden">Konferanser</h1>
	<h2 class="heading">Pågående</h2>
	{#each being.reverse() as conference (conference.title)}
		<Conference {conference} />
	{/each}
	<h2 class="heading">Kommende</h2>
	{#each to_be.reverse() as conference (conference.title)}
		<Conference {conference} />
	{/each}
	<h2 class="heading">Tidligere</h2>
	{#each done as conference (conference.title)}
		<Conference {conference} />
	{/each}
</div>

<style>
	.heading {
		font-weight: 300;
		font-size: 300%;
	}
</style>