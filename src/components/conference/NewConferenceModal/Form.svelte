<script>
    import NameAndUrlLine from "./NameAndUrlLine.svelte";
    import DatePickerLine from "./DatePickerLine.svelte";
    import ButtonFooterLine from "./ButtonFooterLine.svelte";
    import CheckboxLine from "./CheckboxLine.svelte";

    export let formId;
</script>

<form id={formId}>
    <NameAndUrlLine />
    <DatePickerLine />
    <CheckboxLine />
    <ButtonFooterLine />
</form>

<style>
    form {
        width: 100%;
    }
</style>
