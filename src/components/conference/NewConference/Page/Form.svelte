<script>
    import NameUrlLocationLine from "./NameUrlLocationLine.svelte";
    //import ButtonFooterLine from "./ButtonFooterLine.svelte";
    import CheckboxLine from "../CheckboxLine.svelte";
    import {pending} from "../stores.ts";
    import DatePickersAndPriceLine from "./DatePickersAndPriceLine.svelte";
    import DescriptionLine from "./DescriptionLine.svelte";

    export let formId=undefined;


</script>

<form id={formId} class:pending={$pending}>
    <NameUrlLocationLine />
    <DatePickersAndPriceLine />
    <DescriptionLine />
    <CheckboxLine />
    <!--ButtonFooterLine /-->
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
