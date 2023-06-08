<script lang="ts">
  	import type { IEvent } from '../model/event';
    import Card from '../components/Card.svelte';
    export let event: IEvent;
    export let performances = event.performances || [];
</script>

<style>
</style>

<div class="container d-flex flex-row justify-content-center">
  {#if performances.length === 0}
    <h1>No performances</h1>
  {:else}
    {#each performances as performance}
      <Card performance={performance} event={event} />
    {/each}
  {/if}
</div>