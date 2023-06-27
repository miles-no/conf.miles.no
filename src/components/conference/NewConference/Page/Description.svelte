<script>
import JustifiedRow from "../../../form/JustifiedRow.svelte";
import {description} from "../stores.ts";
import TextField from "../../../form/TextField.svelte";
</script>


<JustifiedRow>
    <TextField
            bind:value={$description}
            label="Beskrivelse"
            placeholder="Beskrivelse"
            multiline
            rows={4}
            width="100%"
            required
    />
</JustifiedRow>
