<script>
    import {addYears} from "../../../../utils/date-time-utils.ts";
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import DatePicker from "../../../form/DatePicker.svelte";

    import {callForPapersDate, callForPapersWarning, endDate, intervalWarning, startDate} from "../stores.ts";

    import DurationDatePickers from "../DurationDatePickers.svelte";
    import {onMount} from "svelte";

    let callForPapersDatePicker;

    let earliest = addYears(new Date(), -10);
    let latest = addYears(new Date(), 10);

    function updateCallForPapersWarning() {
        callForPapersWarning.set(!!$callForPapersDate && !!$endDate && $callForPapersDate > $endDate)
    }
    function updateIntervalWarningFunc() {
        intervalWarning.set(!!$startDate && !!$endDate && $startDate > $endDate);
        callForPapersWarning.set(!!$callForPapersDate && !!$endDate && $callForPapersDate > $endDate)
    }

    // FIXME: this init variable is a workaround for a lifecycle quirk:
    //  store values (like $callForPapersDate) are available here, but are null during onMount (!?)
    //  - and setDate() needs to happen during onMount
    const initCallForPapersDate = $callForPapersDate;

    onMount(()=> {
        if (initCallForPapersDate) {
            callForPapersDatePicker.setDate(initCallForPapersDate);
            callForPapersDate.set(initCallForPapersDate);
        }
    })

</script>

<div class="datepickers-row">
    <JustifiedRow>
        <DurationDatePickers {updateIntervalWarningFunc} startWidth="31%" endWidth="31%" />
        <DatePicker
                label="Frist: call for papers"
                width="31%"
                bind:date={$callForPapersDate}
                bind:this={callForPapersDatePicker}
                {earliest}
                {latest}
                on:refreshDate={updateCallForPapersWarning}
                warning={$callForPapersWarning}
        />
    </JustifiedRow>
</div>

<style lang="scss">
    @media only screen and (max-width: 760px) {
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
