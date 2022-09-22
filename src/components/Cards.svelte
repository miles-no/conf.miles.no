<script>
    import Card from '../components/Card.svelte';
    export let conference;
    export let performances = conference.performances || [];
</script>

<style>
</style>

<div class="container d-flex flex-row justify-content-center">
  {#if performances.length === 0}
    <h1>No performances</h1>
  {:else}
    {#each performances as performance}
      <Card performance={performance} conference={conference} />
    {/each}
  {/if}
</div>