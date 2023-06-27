<script>
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import DatePicker from "../../../form/DatePicker.svelte";
    import {startDate, endDate, intervalWarning, price} from "../stores.ts";
    import TextField from "../../../form/TextField.svelte";



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
            width="35%"
            required
            bind:date={$startDate}
            {earliest}
            {latest}
            on:refreshDate={updateIntervalWarning}
            intervalWarning={$intervalWarning}
    />
    <DatePicker
            label="Sluttdato"
            width="35%"
            required
            bind:date={$endDate}
            {earliest}
            {latest}
            on:refreshDate={updateIntervalWarning}
            intervalWarning={$intervalWarning}
    />
    <TextField bind:value={$price} label="Pris" placeholder="Kr" width="22%" />
</JustifiedRow>

<style>
    /* .datepicker-root*/
</style>
