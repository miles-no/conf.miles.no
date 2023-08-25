<script>
    import {callForPapersDate, endDate, intervalWarning, startDate} from "./stores/stores.ts";
    import DatePicker from "../../form/DatePicker.svelte";
    import {addYears} from "../../../utils/date-time-utils.ts";
    import {onMount} from "svelte";

    let earliest = addYears(new Date(), -10);
    let latest = addYears(new Date(), 10);

    export let updateIntervalWarningFunc, startWidth, endWidth;

    let startDatePicker, endDatePicker;

    function updateIntervalWarningAndSyncEndDate() {
        updateIntervalWarningFunc();
        if ($endDate === null) {
            endDatePicker.setDate($startDate);
        }
    }

    // FIXME: these init' variables are a workaround for lifecycle quirk:
    //  store values (like $startDate) are available here, but are null during onMount (!?)
    //  - and setDate() needs to happen during onMount
    const initStartDate = $startDate;
    const initEndDate = $endDate;

    onMount(()=> {
        if (initStartDate) {
            startDatePicker.setDate(initStartDate);
            startDate.set(initStartDate);
        }
        if (initEndDate) {
            endDatePicker.setDate(initEndDate);
            endDate.set(initEndDate);
        }
    })
</script>

<DatePicker
        label="Startdato"
        width={startWidth}
        required
        bind:date={$startDate}
        bind:this={startDatePicker}
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
