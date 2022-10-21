<script>
	import Conference from './Conference.svelte';
	export let conferences = [];
</script>

<div class="mb-5">
	{#each conferences.sort((a,b) => {
		const diffA = Math.abs(Date.now() - new Date(a.startDate));
		const diffB = Math.abs(Date.now() - new Date(b.startDate))
		return diffA - diffB;
	 }) as conference (conference.title)}
		<Conference {conference} />
	{/each}
</div>
