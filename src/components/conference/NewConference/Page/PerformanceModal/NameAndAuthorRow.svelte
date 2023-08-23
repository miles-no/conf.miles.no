<script>
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import TextField from "../../../../form/TextField.svelte";

    import {authorName, perfTitle} from '../../stores/performancesStore'
    import ComboBox from "../../../../form/ComboBox.svelte";

    let authorItem;

    const options = [
        ]
</script>

<div class="textfield-row">
    <JustifiedRow>
        <TextField bind:value={$perfTitle} label="Tittel" placeholder="Tittel" width="62%" required />
        <ComboBox bind:selectedOption={authorItem} {options} label="Ansvarlig" width="34%" placeholder="Ansatt" />
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
