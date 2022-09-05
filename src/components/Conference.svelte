<script>
	export let conference;
	export let active;
	import cs from './../routes/_conferences';

	function isBeforeToday(date) {
		const today = new Date();

		today.setHours(0, 0, 0, 0);

		return date < today;
	}
	let date = conference.enddateformat.split(',');

	let conferenceDate = new Date(date[0], date[1], date[2]);
	conferenceDate.setHours(0, 0, 0, 0);

	let oldConference = isBeforeToday(conferenceDate);
</script>

<a href="konferanser/{conference.title}">
	<div class:oldConference>
		{conference.slug}
		{#if active}
			{conference.startdate} - {conference.enddate}
		{/if}
	</div>
</a>

<style>
	.oldConference {
		text-decoration: line-through;
	}
</style>
