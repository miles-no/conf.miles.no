<script>
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import {startDate, endDate, intervalWarning} from "../stores.ts";
    import DurationDatePickers from "../DurationDatePickers.svelte";

    function updateIntervalWarningFunc() {
        intervalWarning.set(!!$startDate && !!$endDate && $startDate > $endDate);
    }
</script>

<JustifiedRow>
    <DurationDatePickers {updateIntervalWarningFunc} startWidth="48%" endWidth="48%" />
</JustifiedRow>
