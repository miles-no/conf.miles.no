<script>
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import TextField from "../../../form/TextField.svelte";
    import {name, url} from "../newConferenceStores.ts";


</script>

<JustifiedRow>
    <TextField bind:value={$name} label="Navn på konferanse" placeholder="Navn" width="60%" required />
    <TextField bind:value={$url} label="URL" placeholder="www.url.no" width="36%" required />
</JustifiedRow>
