<script>
	export let conference;
	export let active;
	import DatePill from './DatePill.svelte';

	function isBeforeToday(date) {
		const today = new Date();

		today.setHours(0, 0, 0, 0);

		return date < today;
	}
	let date = conference.enddateformat.split(',');

	let conferenceDate = new Date(date[0], date[1], date[2]);
	conferenceDate.setHours(0, 0, 0, 0);

	let oldConference = isBeforeToday(conferenceDate);	

	//TODO: should be removed after CMS change
	function fmtDate(sdate, edate){
		let [sday, smonth] = sdate.split('.');
		let [eday, emonth] = edate.split('.');
		if (smonth = emonth) {
			return `${sday}-${eday} ${smonth}`;
		}
		return `${sday} ${smonth.slice(0,4)} - ${eday} ${emonth.slice(0,4)}`
	}
	let text = fmtDate(conference.startdate, conference.enddate);
</script>

<div class="container-md">
	<div class:active>
		<a href="konferanser/{conference.slug}">
			<div class="d-flex align-items-center flex-row">
				<div class="link" class:oldConference>
					{conference.title}
				</div>
				{#if active}
					<DatePill text={text} />
				{/if}
			</div>
		</a>
	</div>

</div>


<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	.link {
		font-weight: 700;
		font-size: min(10vw, 100px);
		padding: 0em 0.5em;
		background-color: none;
		color: inherit;
		text-decoration: underline;
	}
	.active {
		background-color: black;
		color: white;
	}
	.oldConference {
		text-decoration: line-through;
	}
</style>
