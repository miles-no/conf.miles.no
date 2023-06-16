<script>
    import Textfield from "@smui/textfield";
    import LabeledField from "./LabeledField.svelte";
    import {onMount} from "svelte";

    export let label, width, placeholder, value='', required=false;

    let hidePlaceholderClass = undefined;

    function hidePlaceholder() {
        hidePlaceholderClass = 'hide-placeholder';
    }
    function handlePlaceholder() {
        if (!(value.trim())) {
            hidePlaceholderClass = undefined;
        } else {
            hidePlaceholder();
        }
    }

    function preventEnter(event) {
        if (event.key==='Enter') {
            event.preventDefault();
        }
    }

    onMount(handlePlaceholder);
</script>

<LabeledField addClass={hidePlaceholderClass} label={label} {required} width={width}>
    <Textfield
            variant="outlined"
            bind:value
            label={placeholder}
            on:focus={hidePlaceholder}
            on:blur={handlePlaceholder}
            on:keydown={preventEnter}
            class="textfield"
    />
</LabeledField>

<style>
    :global(.hide-placeholder .mdc-notched-outline__notch)  {
        width: 0 !important;
        padding-right: 0;
    }
</style>
