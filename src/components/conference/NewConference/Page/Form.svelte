<script>
    import NameUrlLocationRow from "./NameUrlLocationRow.svelte";
    import CheckboxRow from "../CheckboxRow.svelte";
    import {pending} from "../stores/stores.ts";
    import DatePickersAndPriceRow from "./DatePickersRow.svelte";
    import Description from "./Description.svelte";

</script>

<form class="new-conf-edit" class:pending={$pending}>
    <NameUrlLocationRow />
    <DatePickersAndPriceRow />
    <Description />
    <CheckboxRow />
</form>

<style>
    form {
        width: 100%;
        border-right: 1px solid #BCBCBC;
        padding-right: 42px;
    }

    .pending {
        pointer-events: none;
        opacity: 45%;
    }
</style>
