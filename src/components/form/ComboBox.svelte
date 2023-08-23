<script>
    import {makeid} from "../../utils/conference-utils";
    import {ComboboxAutocomplete} from "./combobox-autocomplete.js";
    import {onMount} from "svelte";
    import LabeledField from "./LabeledField.svelte";
    export let value=undefined, label, placeholder, width, required=false, options=[
        {id:1, text:"One"},
        {id:2, text:"Two"},
        {id:3, text:"Three"},
        {id:4, text:"Four"},
    ];

    const uid = makeid(5);
    const comboId = "combobox-" + uid;
    const inputId = "input-cb-" + uid;
    const listId = "listbox-cb-" + uid;
    const buttonId = "button-cb-" + uid;

    onMount(() => {
        var comboboxNode = document.getElementById(inputId);
        var buttonNode = document.getElementById(buttonId);
        var listboxNode = document.getElementById(listId);
        new ComboboxAutocomplete(comboboxNode, buttonNode, listboxNode);
    });

    $: {
        console.log(value)
    }
</script>

<!-- Modified from https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-both/
     https://www.w3.org/copyright/software-license-2015/ -->

    <div id={comboId} class="combobox" style:width={width}>
        <div class="combobox combobox-list">
            <div class="group">
                <LabeledField {label} forId={inputId} width="100%">
                    <input
                            id={inputId}
                            class="cb-edit"
                            type="text"
                            role="combobox"
                            aria-autocomplete="both"
                            aria-expanded="false"
                            aria-controls={listId}
                            placeholder={placeholder}
                            bind:value={value}
                    />
                </LabeledField>
                <button
                    type="button"
                    id={buttonId}
                    aria-label={label}
                    aria-expanded="false"
                    aria-controls={listId}
                    tabindex="-1"
                >▾</button>
            </div>
            <ul
                    id={listId}
                    class="listbox"
                    role="listbox"
                    aria-label={label}
            >
                {#each options as option}
                    <li id={`item-${uid}-${option.id}`} data-id={option.id} role="option">{option.text}</li>
                {/each}
            </ul>
        </div>
    </div>


<style lang="scss">
    .cb-edit {
        border-radius: 4px;
        border: solid 1px rgb(0, 0, 0, .38);
        padding: 0 16px;
        height: 56px;
        font-family: Roboto, sans-serif;
        font-size: 16px;

      &:focus {
        outline: none;
        border: 2px solid rgb(168, 36, 36);
      }
    }
    .combobox {
        position: relative;
    }
    .group {
        position: relative;
        z-index: 10;
    }
    .combobox button {
        position: absolute;
        background-color: transparent;
        border: none;
        padding: 2px 5px;
        right: 11px;
        bottom: 11px;
        font-size: 20px;
        color: rgba(0,0,0, .7);
    }
    .listbox {
        display: none;
        position: absolute;
        background-color: white;
        width: 100%;
        border-radius: 0 0 4px 4px;
        padding: 14px 16px 16px;
        list-style-type: none;
        max-height: 50vh;
        overflow-y: scroll;
        border: 1px solid rgba(0,0,0, .25);
        top: 80px;
        border-top: none;
        z-index: 5;
    }
    .listbox li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 616px) {
        .combobox {
          width: 100% !important;
        }
    }
</style>
