<script lang="ts">
    import Textfield from "@smui/textfield";
    import LabeledField from "./LabeledField.svelte";
    import {onMount} from "svelte";

    export let
        label,
        width,
        placeholder,
        value='',
        required=false,
        multiline=undefined,
        rows=undefined,
        addClass=undefined,
        invalid=false,
	    type: "text"|"number" = "text"

    let hidePlaceholderClass = '';

    function hidePlaceholder() {
        hidePlaceholderClass = ' hide-placeholder';
    }
    function handlePlaceholder() {
        if (!(((value ?? '') + "").trim())) {
            hidePlaceholderClass = '';
        } else {
            hidePlaceholder();
        }
    }

    function preventEnter(event) {
        if (event.key==='Enter' && !multiline) {
            event.preventDefault();
        }
    }

    onMount(handlePlaceholder);
</script>

<LabeledField addClass={(addClass ?? '') + hidePlaceholderClass} label={label} {required} {invalid} width={width}>
    <Textfield
            variant="outlined"
            bind:value
            label={placeholder}
            on:focus={hidePlaceholder}
            on:blur={handlePlaceholder}
            on:keydown={preventEnter}
            class="textfield"
            textarea={multiline}
            input$rows={rows}
            {type}
    />
</LabeledField>

