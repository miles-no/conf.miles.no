<script>
    import JustifiedRow from "../../form/JustifiedRow.svelte";
    import TextField from "../../form/TextField.svelte";
    import DatePicker from "../../form/DatePicker.svelte";

    export let formId;

    let name='', url='';
</script>

<form id={formId}>
    <JustifiedRow>
        <TextField bind:value={name} label="Navn på konferanse" placeholder="Navn" width="60%" required />
        <TextField bind:value={url} label="URL" placeholder="www.url.no" width="36%" required />
    </JustifiedRow>

    <JustifiedRow>
        <DatePicker label="Startdato" width="48%" required placeholder="dd.mm yyyy" />
        <DatePicker label="Sluttdato" width="48%" required placeholder="dd.mm yyyy"/>
    </JustifiedRow>
</form>

<style>
    form {
        width: 100%;
    }
</style>
