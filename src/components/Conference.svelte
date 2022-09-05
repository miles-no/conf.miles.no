<script>
	export let conference;
	export let active;
</script>

<a href="konferanser/{conference.title}">
	<div>
		{conference.slug}
		{#if active}
			{conference.startdate} - {conference.enddate}
		{/if}
	</div>
</a>

<style>
</style>
