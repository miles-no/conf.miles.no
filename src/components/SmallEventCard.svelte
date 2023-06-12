<script lang="ts">
	import type { IEvent } from '../model/event';
	import Hoverable from './Hoverable.svelte';
	import { formatEventDateRange } from '$lib';
	/**
	 * @type {{ startDate: any; endDate: string | number | Date; title: any; }}
	 */
	export let event: IEvent;

	const dateRange = formatEventDateRange(event.startDate, event.endDate);
	const startOfDay = new Date();
	startOfDay.setDate(startOfDay.getDate());
	startOfDay.setHours(0, 0, 0, 0);
	const isFinished = startOfDay.getTime() > new Date(event.endDate).getTime();
</script>

<Hoverable let:hovering={active}>
	<a href="/arrangement/{event.slug}">
		<div class="wrapper mdc-card">
			<div class="titleWrapper">
				<h5 style="margin-bottom: 0px;">
					{event.title}
				</h5>
			</div>
			<div class="dateRange">
				<h5 style="margin-bottom: 0px;">{dateRange}</h5>
			</div>
		</div>
	</a>
</Hoverable>

<style>
	.wrapper {
		display: flex;
		flex-direction: row;
		align-content: center;
		margin: 0.5rem 0;
	}
	.titleWrapper {
		display: flex;
		width: 66%;
		align-items: center;
		justify-content: start;
		border-radius: 1rem;
		padding: 1rem;
	}

	.dateRange {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		width: 33%;
	}
</style>
