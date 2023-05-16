<script>
    import JustifiedRow from "../../form/JustifiedRow.svelte";
    import TextField from "../../form/TextField.svelte";
    import DatePicker from "../../form/DatePicker.svelte";

    let name='', url=''
</script>

<form>
    <JustifiedRow>
        <TextField bind:value={name} label="Navn på konferanse" placeholder="Navn" width="60%" required />
        <TextField bind:value={url} label="URL" placeholder="www.url.no" width="36%" required />
    </JustifiedRow>

    <JustifiedRow>
        <DatePicker label="Startdato" width="48%" required />
        <DatePicker label="Sluttdato" width="48%" required />
    </JustifiedRow>
</form>

<style>
    form {
        width: 100%;
    }
</style>
