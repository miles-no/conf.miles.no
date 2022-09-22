<script>
	import DatePill from './DatePill.svelte';
  import { formatConferenceDateRange } from '../lib';
  export let conference;
	export let active;

  const text = formatConferenceDateRange(conference.startDate, conference.endDate);
  const isFinished = new Date().getTime() > new Date(conference.endDate).getTime();
</script>

<div class="container-md">
	<div class:active>
		<a href="konferanser/{conference.slug}">
			<div class="d-flex align-items-center flex-row">
				<div class="link" class:isFinished>
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
	.isFinished {
		text-decoration: line-through;
	}
</style>
