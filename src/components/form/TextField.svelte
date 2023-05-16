<script>
    import Textfield from "@smui/textfield";
    import {afterUpdate, onMount} from "svelte";

    export let label, width, placeholder, value, required;

    let displayedPlaceholder = placeholder;

    function hidePlaceholder() {
        displayedPlaceholder = undefined;
    }
    function handlePlaceholder() {
        console.log("Handling placeholder... value='" + value + "', !(value.trim())=" + !(value.trim()))
        if (!(value.trim())) {
            displayedPlaceholder = placeholder
        } else {
            displayedPlaceholder = undefined;
        }
    }

    onMount(handlePlaceholder);
</script>

<div class="textfield" style:width={width}>
    <label class={"textfield-label" + (required ? ' required' : '')}>
        {label}
    </label>
    <Textfield
            variant="outlined"
            bind:value
            label={displayedPlaceholder}
            on:focus={hidePlaceholder}
            on:blur={handlePlaceholder}
    />
</div>

<style>
    .textfield {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: flex-start;
    }

    .textfield :global(label) {
        width: 100%;
        font-weight: 700;
        font-size: 15px;
        line-height: 150%;
        margin-bottom: 8px;
    }

    .textfield :global(label.required)::after {
        content: '*';
        color: #FF0000;
        font-size: 21pt;
        position: relative;
        top: 7px;
        right: -3px;
    }
</style>
