<script>
    import {addYears} from "../../../../utils/date-time-utils.ts";
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import DatePicker from "../../../form/DatePicker.svelte";

    import {callForPapersDate, callForPapersWarning, endDate, intervalWarning, startDate} from "../stores.ts";

    import DurationDatePickers from "../DurationDatePickers.svelte";


    let earliest = addYears(new Date(), -10);
    let latest = addYears(new Date(), 10);

    function updateCallForPapersWarning() {
        callForPapersWarning.set(!!$callForPapersDate && !!$endDate && $callForPapersDate > $endDate)
    }
    function updateIntervalWarningFunc() {
        intervalWarning.set(!!$startDate && !!$endDate && $startDate > $endDate);
        callForPapersWarning.set(!!$callForPapersDate && !!$endDate && $callForPapersDate > $endDate)
    }


</script>

<JustifiedRow>
    <DurationDatePickers {updateIntervalWarningFunc} startWidth="31%" endWidth="31%" />
    <DatePicker
            label="Frist: call for papers"
            width="31%"
            bind:date={$callForPapersDate}
            {earliest}
            {latest}
            on:refreshDate={updateCallForPapersWarning}
            warning={$callForPapersWarning}
    />
</JustifiedRow>

<style>
    /* .datepicker-root*/
</style>
