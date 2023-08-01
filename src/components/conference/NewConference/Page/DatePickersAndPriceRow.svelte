<script>
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import DatePicker from "../../../form/DatePicker.svelte";
    import {startDate, endDate, callForPapersDate, intervalWarning, callForPapersWarning} from "../stores.ts";



    function addYears(originalDate, yearsToAdd) {
        return new Date(new Date(originalDate).setFullYear(originalDate.getFullYear() + yearsToAdd));
    }
    let earliest = new Date();
    let latest = addYears(earliest, 10);

    function updateIntervalWarning() {
        intervalWarning.set(!!$startDate && !!$endDate && $startDate > $endDate);
        callForPapersWarning.set(!!$callForPapersDate && !!$endDate && $callForPapersDate > $endDate)
    }
</script>

<JustifiedRow>
    <DatePicker
            label="Startdato"
            width="31%"
            required
            bind:date={$startDate}
            {earliest}
            {latest}
            on:refreshDate={updateIntervalWarning}
            warning={$intervalWarning}
    />
    <DatePicker
            label="Sluttdato"
            width="31%"
            required
            bind:date={$endDate}
            {earliest}
            {latest}
            on:refreshDate={updateIntervalWarning}
            warning={$intervalWarning}
    />
    <DatePicker
            label="Frist: call for papers"
            width="31%"
            bind:date={$callForPapersDate}
            earliest={addYears(earliest, -1)}
            {latest}
            on:refreshDate={updateIntervalWarning}
            warning={$callForPapersWarning}
    />
</JustifiedRow>

<style>
    /* .datepicker-root*/
</style>
