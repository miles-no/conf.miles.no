<script>
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import DatePicker from "../../../form/DatePicker.svelte";
    import {startDate, endDate, intervalWarning} from "../stores.ts";



    function addYears(originalDate, yearsToAdd) {
        return new Date(new Date(originalDate).setFullYear(originalDate.getFullYear() + yearsToAdd));
    }
    let earliest = new Date();
    let latest = addYears(earliest, 10);

    function updateIntervalWarning() {
        intervalWarning.set(!!$startDate && !!$endDate && $startDate > $endDate);
    }
</script>

<JustifiedRow>
    <DatePicker
            label="Startdato"
            width="48%"
            required
            bind:date={$startDate}
            {earliest}
            {latest}
            on:refreshDate={updateIntervalWarning}
            warning={$intervalWarning}
    />
    <DatePicker
            label="Sluttdato"
            width="48%"
            required
            bind:date={$endDate}
            {earliest}
            {latest}
            on:refreshDate={updateIntervalWarning}
            warning={$intervalWarning}
    />
</JustifiedRow>

<style>
    /* .datepicker-root*/
</style>
