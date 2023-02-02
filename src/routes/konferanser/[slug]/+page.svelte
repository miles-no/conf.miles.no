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

	$: startDate = conference.startDate;
	$: endDate = conference.endDate;

	// Using all dates from start to end
	$: dates = getDaysArray(startDate, endDate).map((date) => [
		date.toDateString(),
		intlFormat(date, { weekday: 'long' }, { locale: 'nb-NO' }),
		intlFormat(date, { day: '2-digit', month: 'long' }, { locale: 'nb-NO' })
	]);

	/*
	//Using the dates with actual performances
	let dates = performances
		.map(({ dateAndTime }) => [
			new Date(dateAndTime).toDateString(),
			[
				intlFormat(new Date(dateAndTime), { weekday: 'long' }, { locale: 'nb-NO' }),
				intlFormat(new Date(dateAndTime), { day: '2-digit', month: 'long' }, { locale: 'nb-NO' })
			]
		])
		.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
	*/
	
	$: day = ((new Date() >= new Date(startDate)) && (new Date() < new Date(endDate)))
		? new Date().toDateString()
		: new Date(startDate).toDateString();
</script>

<svelte:head>
	<title>{conference.title} | Miles</title>
</svelte:head>

<div class="container-lg">
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
