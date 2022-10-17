<script>
	import TextPill from './TextPill.svelte';
  import { formatConferenceDateRange } from '../lib';
  export let conference;
	export let active;

  const text = formatConferenceDateRange(conference.startDate, conference.endDate);
  const isFinished = new Date().getTime() > new Date(conference.endDate).getTime();
</script>

<div class:active>
  <a href="konferanser/{conference.slug}">
    <div class="d-flex mr-auto p-2 align-items-center flex-row">
      <div class="link" class:isFinished>
        {conference.title}
      </div>
      {#if active}
	  <div class="p-2">
        <TextPill text={text} />
	  </div>
      {/if}
    </div>
  </a>
</div>


<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	.link {
		font-weight: 700;
		font-size: min(5vw, 100px);
		padding: 0 1.5vw;
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
