<script>
    import Textfield from "@smui/textfield";
    import LabeledField from "./LabeledField.svelte";
    import {onMount} from "svelte";

    export let label, width, placeholder, value='', required;

    let displayedPlaceholder = placeholder;

    function hidePlaceholder() {
        displayedPlaceholder = undefined;
    }
    function handlePlaceholder() {
        displayedPlaceholder = !(value.trim()) ? placeholder : undefined;
    }

    function preventEnter(event) {
        if (event.key==='Enter') {
            event.preventDefault();
        }
    }

    onMount(handlePlaceholder);
</script>

<LabeledField label={label} required width={width}>
    <Textfield
            variant="outlined"
            bind:value
            label={displayedPlaceholder}
            on:focus={hidePlaceholder}
            on:blur={handlePlaceholder}
            on:keydown={preventEnter}
            class="textfield"
    />
</LabeledField>
