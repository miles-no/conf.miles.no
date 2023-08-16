<script>
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import {startDate, endDate, intervalWarning} from "../stores.ts";
    import DurationDatePickers from "../DurationDatePickers.svelte";

    function updateIntervalWarningFunc() {
        intervalWarning.set(!!$startDate && !!$endDate && $startDate > $endDate);
    }
</script>

<div class="datepickers-row">
    <JustifiedRow>
        <DurationDatePickers {updateIntervalWarningFunc} startWidth="48%" endWidth="48%" />
    </JustifiedRow>
</div>


<style lang="scss">
  @media only screen and (max-width: 800px) {
    .datepickers-row {
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
