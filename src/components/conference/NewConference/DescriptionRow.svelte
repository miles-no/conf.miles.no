<script>
import JustifiedRow from "../../form/JustifiedRow.svelte";
import TextField from "../../form/TextField.svelte";
import {onMount} from "svelte";
import {makeid} from "../../../utils/conference-utils.ts";

export let label, value, idPrefix="description", placeholder='', rows=4, width="100%", invalid=false, required=false;

function OnInput() {
    this.style.height = 0;
    this.style.height = (Math.max(this.scrollHeight, minHeight)) + "px";
}

const id = idPrefix + "-" + makeid(5);
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
            bind:value={value}
            {label}
            {placeholder}
            {rows}
            {width}
            {invalid}
            {required}
            multiline
    />
</JustifiedRow>

