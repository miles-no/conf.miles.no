<script>
	import TextPill from './TextPill.svelte';
	import Hoverable from '../components/Hoverable.svelte';
	import { formatConferenceDateRange } from '../lib';
	export let conference;
	
	const text = formatConferenceDateRange(conference.startDate, conference.endDate);
	const isFinished = new Date().getTime() > new Date(conference.endDate).getTime();
</script>

<Hoverable let:hovering={active}>
	<div class="mb-2" class:active>
		<a href="konferanser/{conference.slug}">
			<div class="box px-2 d-flex align-items-center flex-row">
				<h3 class="link" class:isFinished>
					{conference.title}
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
	h3 {
		font-weight: 900;
		font-size: 300%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		line-clamp: 2;
		-webkit-box-orient: vertical;
		-moz-box-orient: vertical;
	}
	.box {
		height: 120px;
	}	
	.link {
		font-weight: 700;
		padding: 0 1.5vw;
		margin: 0;
		color: inherit;
		word-break: break-all;
		text-decoration: underline;
	}
	.active {
		background-color: black;
		color: white;
	}
	.isFinished {
		text-decoration: line-through;
	}
</style>
