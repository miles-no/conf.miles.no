<script>
  import { Home } from 'lucide-svelte';
  export let conference;
  export let submission = false;
</script>

<div class="d-flex justify-content-center mb-5">
  <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/"><Home /></a></li>
      {#if conference}
        <li class="breadcrumb-item" class:active="{!submission}" aria-current={submission ? null : "page"}>
          <a href={`/konferanser/${conference.slug}`}>{conference.title}</a>
        </li>
      {/if}
      {#if submission}
        <li class="breadcrumb-item" aria-current="page" class:active="{submission}">
          <a href={`/konferanser/${conference.slug}/agenda/${submission.slug}`}>{submission.title}</a>
        </li>
      {/if}
    </ol>
  </nav>
</div>

<style>
  .breadcrumb li > a {
    color: inherit;
    font-weight: 700;
    text-decoration: none;
  }

  .breadcrumb li:before {
    font-weight: 900;
    color: #000;
  }

</style>