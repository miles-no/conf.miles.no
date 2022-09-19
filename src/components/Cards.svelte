<script>
    import Card from '../components/Card.svelte';
    export let conference;
</script>

<style>
</style>

<div class="container d-flex flex-row justify-content-center">
  {#each conference.performances as performance}
    <Card performance={performance} conference={conference} />
  {/each}
</div>