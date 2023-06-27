<script>
    import NameAndUrlRow from "./NameAndUrlRow.svelte";
    import DatePickerRow from "./DatePickerRow.svelte";
    import ButtonFooterRow from "./ButtonFooterRow.svelte";
    import CheckboxRow from "../CheckboxRow.svelte";
    import {pending} from "../stores.ts";

    export let formId;
</script>

<form id={formId} class:pending={$pending}>
    <NameAndUrlRow />
    <DatePickerRow />
    <CheckboxRow />
    <ButtonFooterRow />
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
