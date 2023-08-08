<script>
    import {endDate, intervalWarning, startDate} from "./stores.ts";
    import DatePicker from "../../form/DatePicker.svelte";
    import {addYears} from "../../../utils/date-time-utils.ts";

    let earliest = addYears(new Date(), -10);
    let latest = addYears(new Date(), 10);

    export let updateIntervalWarningFunc, startWidth, endWidth;

    let endDatePicker;
    function updateIntervalWarningAndSyncEndDate() {
        updateIntervalWarningFunc();
        if ($endDate === null) {
            endDatePicker.setDate($startDate);
        }
    }
</script>

<DatePicker
        label="Startdato"
        width={startWidth}
        required
        bind:date={$startDate}
        {earliest}
        {latest}
        on:refreshDate={updateIntervalWarningAndSyncEndDate}
        warning={$intervalWarning}
/>
<DatePicker
        label="Sluttdato"
        width={endWidth}
        required
        bind:date={$endDate}
        bind:this={endDatePicker}
        {earliest}
        {latest}
        on:refreshDate={updateIntervalWarningFunc}
        warning={$intervalWarning}
/>
