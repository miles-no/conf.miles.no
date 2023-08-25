<script>
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import TextField from "../../../form/TextField.svelte";
    import {name, url, location} from "../stores/stores.ts";
</script>

<div class="textfield-row">
    <JustifiedRow>
        <TextField bind:value={$name} label="Navn på konferanse" placeholder="Navn" width="40%" addClass="conference-name-field" required />
        <TextField bind:value={$url} label="URL" placeholder="www.url.no" width="22%" addClass="url-location-field" required />
        <TextField bind:value={$location} label="Lokasjon" placeholder="Sted" width="30%" addClass="url-location-field" />
    </JustifiedRow>
</div>

<style lang="scss">
  @media only screen and (max-width: 400px) {
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

  @media only screen and (min-width: 401px) and (max-width: 760px) {
    .textfield-row {
      :global(.justified-row) {
        flex-wrap: wrap;
      }
      :global(.conference-name-field) {
        width:100% !important;
        margin-bottom: 20px;
      }
      :global(.url-location-field) {
        width:48% !important;
      }
    }
  }
</style>
