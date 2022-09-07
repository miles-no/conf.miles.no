<script>
    import Card from '../components/Card.svelte';
    export let workshops = [];
    export let conferenceName;
</script>

<style>
</style>

<div class="container">
  <div class="row g-5 justify-content-center">
    <!--<Card author="Olav" title="Analyser forbruket ditt med bankens API" cssClass="odd" linkUrl="https://conf.miles.no/" datelocation="<25. mars / Dræggen>" slug="analyser-forbruket-ditt-med-bankens-api" />
    <Card author="Dag Erik og Alexander" title="Gather your party with svelte" cssClass="even" linkUrl="https://github.com/miles-no/booster2022-gather-your-party-with-svelte" datelocation="<24. mars / Dræggen>" slug="gather-your-party-with-svelte" />-->
    {#each workshops as workshop}
      <Card agenda="{workshop}" {conferenceName} />
    {/each}
  </div>
</div>