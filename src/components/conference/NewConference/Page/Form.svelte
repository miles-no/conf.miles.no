<script>
    import NameUrlLocationRow from "./NameUrlLocationRow.svelte";
    import CheckboxRow from "../CheckboxRow.svelte";
    import {pending} from "../stores.ts";
    import DatePickersAndPriceRow from "./DatePickersAndPriceRow.svelte";
    import Description from "./Description.svelte";

    export let formId=undefined;


</script>

<form id={formId} class:pending={$pending}>
    <NameUrlLocationRow />
    <DatePickersAndPriceRow />
    <Description />
    <CheckboxRow />
</form>

<style>
    form {
        width: 100%;
    }

    .pending {
        pointer-events: none;
        opacity: 45%;
    }
</style>
