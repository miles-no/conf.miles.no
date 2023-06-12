<script lang="ts">
	import type { IEvent } from '../model/event';
	import TextPill from './TextPill.svelte';
	import Hoverable from './Hoverable.svelte';
	import { formatEventDateRange } from '$lib';
	export let event: IEvent;
	
	const text = formatEventDateRange(event.startDate, event.endDate);
	const startOfDay = new Date();
	startOfDay.setDate(startOfDay.getDate());
	startOfDay.setHours(0,0,0,0);
	const isFinished = startOfDay.getTime() > new Date(event.endDate).getTime();
</script>

<Hoverable let:hovering={active}>
	<div class="mb-4" class:active>
		<a href="/arrangement/{event.slug}">
			<div class="box d-flex align-items-center flex-row">
				<h3 class:isFinished>
					{event.title}
				</h3>
				{#if active}
					<TextPill {text} />
				{/if}
			</div>
		</a>
	</div>
</Hoverable>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	.box {
		padding: 0 8px;
		height: 120px;
	}	
	h3 {
		margin: 0 1.5vw;
		color: inherit;
		text-decoration: underline;
		font-weight: 900;
		font-size: 200%;
		word-break: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		-moz-box-orient: vertical;
	}
	.active {
		background-color: black;
		color: white;
	}
	.isFinished {
		text-decoration: line-through;
	}
</style>
