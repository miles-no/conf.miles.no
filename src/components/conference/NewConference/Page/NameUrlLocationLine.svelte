<script>
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import TextField from "../../../form/TextField.svelte";
    import {name, url, location} from "../newConferenceStores.ts";
</script>

<JustifiedRow>
    <TextField bind:value={$name} label="Navn på konferanse" placeholder="Navn" width="40%" required />
    <TextField bind:value={$url} label="URL" placeholder="www.url.no" width="22%" required />
    <TextField bind:value={$location} label="Lokasjon" placeholder="Sted" width="30%" />
</JustifiedRow>
