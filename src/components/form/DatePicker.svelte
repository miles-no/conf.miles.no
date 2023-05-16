<script>
    import { DateInput } from 'date-picker-svelte'
    import LabeledField from "./LabeledField.svelte";


    export let date = null, width, label, required;

</script>

<LabeledField label={label} required width={width}>
    <DateInput bind:value={date} />
</LabeledField>

<style>

</style>
