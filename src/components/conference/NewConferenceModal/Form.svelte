<script>
    import JustifiedRow from "../../form/JustifiedRow.svelte";
    import HelperText from "@smui/textfield/helper-text";
    import TextField from "../../form/TextField.svelte";

    let name='', url=''
</script>

<form>
    <JustifiedRow>
        <TextField bind:value={name} label="Navn på konferanse" placeholder="Navn" required width="60%"/>
        <TextField bind:value={url} label="URL" placeholder="www.url.no" required width="36%"/>
    </JustifiedRow>

    <JustifiedRow>
        <!-- 2 x DATE FIELDS! -->
    </JustifiedRow>
</form>

<style>
    form {
        width: 100%;
    }
</style>
