<script>
    import NameAndUrlLine from "./NameAndUrlLine.svelte";
    import DatePickerLine from "./DatePickerLine.svelte";
    import ButtonFooterLine from "./ButtonFooterLine.svelte";
    import CheckboxLine from "./CheckboxLine.svelte";
    import {pending} from "../newConferenceStores.ts";

    export let formId;
</script>

<form id={formId} class:pending={$pending}>
    <NameAndUrlLine />
    <DatePickerLine />
    <CheckboxLine />
    <ButtonFooterLine />
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
