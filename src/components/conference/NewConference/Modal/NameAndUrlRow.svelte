<script>
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import TextField from "../../../form/TextField.svelte";
    import {location, name, url} from "../stores.ts";
</script>

<JustifiedRow>
    <TextField bind:value={$name} label="Navn på konferanse" placeholder="Navn" width="100%" required />
</JustifiedRow>

<div class="textfield-row">
    <JustifiedRow>
        <TextField bind:value={$url} label="URL" placeholder="www.url.no" width="48%" required />
        <TextField bind:value={$location} label="Lokasjon" placeholder="Sted" width="48%" />
    </JustifiedRow>
</div>

<style lang="scss">
  @media only screen and (max-width: 616px) {
    .textfield-row {
      :global(.justified-row) {
        flex-direction: column;
      }
      :global(.labeled-field) {
        width:100% !important;
        margin-bottom: 20px;
      }
    }
  }
</style>
