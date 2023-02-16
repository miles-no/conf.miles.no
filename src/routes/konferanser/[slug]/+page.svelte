<script>
	import BreadCrumb from '../../../components/BreadCrumb.svelte';
	import { intlFormat } from 'date-fns';
	import DaySelect from '../../../components/DaySelect.svelte';
	import ExternalConferenceProgram from '../../../components/ExternalConferenceProgram.svelte';
	import InternalConferenceProgram from '../../../components/InternalConferenceProgram.svelte';
	export let data = {};
	export let conference = data.conference;

	const getDaysArray = (s, e) => {
		for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
			a.push(new Date(d));
		}
		return a;
	};

	console.log(conference);

	// Using all dates from start to end
	$: performanceDays = conference.performances == null ? 
		conference.itinerary == null ? [] : conference.itinerary.map((m) => { return new Date(m.itineraryDate) }).sort().reverse().map((m) => { return new Date(m).toDateString() })
		: conference.performances.map((m) => { return new Date(m.dateAndTime) }).sort().map((m) => { return new Date(m).toDateString(); });

	$: startDate = performanceDays.length > 0 ? performanceDays[0] : conference.startDate;
	$: endDate = performanceDays.length > 0 ? performanceDays[performanceDays.length-1] : conference.endDate;

	$: dates = getDaysArray(startDate, endDate).filter((f) => performanceDays.includes(f.toDateString())).map((date) => [
		date.toDateString(),
		intlFormat(date, { weekday: 'long' }, { locale: 'nb-NO' }),
		intlFormat(date, { day: '2-digit', month: 'long' }, { locale: 'nb-NO' })
	]);
	
	// $: day = ((new Date() >= new Date(startDate)) && (new Date() < new Date(endDate)) && (performanceDays.includes(new Date().toDateString())))
	// 	? new Date().toDateString()
	// 	: new Date(performanceDays[0]).toDateString();
	$: day = ((new Date() >= new Date(startDate)) && (new Date() < new Date(endDate)))
		? new Date().toDateString()
		: new Date(startDate).toDateString();		
</script>

<svelte:head>
	<title>{conference.title} | Miles</title>
</svelte:head>

<div class="container-lg">
	<!-- {@debug performanceDays} -->
	<BreadCrumb {conference} />
	<DaySelect options={dates} bind:selected={day}/>
	<div class="pt-4">
		{#if conference.internal}
			<InternalConferenceProgram {conference} {day} />
		{:else}
			<ExternalConferenceProgram {conference} {day} />
		{/if}
	</div>
</div>
