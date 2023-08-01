<script>
import JustifiedRow from "../../../form/JustifiedRow.svelte";
import {description} from "../stores.ts";
import TextField from "../../../form/TextField.svelte";
import {onMount} from "svelte";
import {makeid} from "../../../../utils/conference-utils.ts";


function OnInput() {
    this.style.height = 0;
    this.style.height = (Math.max(this.scrollHeight, minHeight)) + "px";
}

const id = "description-field-" + makeid(5);
let minHeight;

onMount(() => {
    const textareaElement = document.querySelector(`#${id} textarea`);

    minHeight = textareaElement.scrollHeight;

    textareaElement.setAttribute("style", `overflow-y:hidden;`);
    textareaElement.addEventListener("input", OnInput, false);
});

</script>


<JustifiedRow {id}>
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

