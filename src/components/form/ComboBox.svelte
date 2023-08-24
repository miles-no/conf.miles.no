<script lang="ts">
    import {makeid} from "../../utils/conference-utils";
    import {ComboboxAutocomplete} from "./combobox-autocomplete.js";
    import {onMount} from "svelte";
    import LabeledField from "./LabeledField.svelte";
    import {Icon} from "@smui/common";

    export interface IOption {
        id: string|number,
        text: string

    }
    export let
        label: string|undefined,
        placeholder: string|undefined,
        width: string|undefined,
        required:boolean = false,
        selectedOption: IOption|undefined = undefined,
        options:IOption[] = [];

    const uid = makeid(5);
    const comboId = "combobox-" + uid;
    const inputId = "input-cb-" + uid;
    const listId = "listbox-cb-" + uid;
    const buttonId = "button-cb-" + uid;

    let tmpInnerValue: string|undefined = undefined,
        isTyping: boolean = false,
        hasFocus: boolean = false,
        hideIcon: boolean = false,
        hasMatch: boolean = false;

    function checkValueAndUpdate(currentValue?:string) {
        const matchingIndex = Object.keys(options).find( (key) => options[key].text === currentValue );
        const matchingOption = options[matchingIndex];

        selectedOption = matchingOption;
        hasMatch = !!matchingOption;
        hideIcon = hasFocus && currentValue?.length > 11
        isTyping = hasFocus && !hasMatch && !!currentValue && !!currentValue.length;
    }

    onMount(() => {
        var comboboxNode = document.getElementById(inputId);
        var buttonNode = document.getElementById(buttonId);
        var listboxNode = document.getElementById(listId);

        new ComboboxAutocomplete(comboboxNode, buttonNode, listboxNode, checkValueAndUpdate);
    });

    $: {
        checkValueAndUpdate(tmpInnerValue);
    }
</script>

<!-- Modified from https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-both/
     https://www.w3.org/copyright/software-license-2015/ -->

    <div id={comboId} class="combobox" style:width={width}>
        <div class="combobox combobox-list" class:hasMatch class:isTyping>
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
                            bind:value={tmpInnerValue}
                            on:focus={()=>{
                                hasFocus=true;
                                hideIcon = tmpInnerValue?.length > 11
                            }}
                            on:blur={()=>{
                                hasFocus=false;
                                hideIcon=false;
                            }}
                    />
                </LabeledField>
                <button
                    type="button"
                    id={buttonId}
                    aria-label={label}
                    aria-expanded="false"
                    aria-controls={listId}
                    tabindex="-1"
                >
                    {#if (!(hasFocus && hideIcon))}
                        {#if (hasMatch)}
                            <Icon class="material-icons" slot="trailingIcon">check</Icon>
                        {:else if (!hasFocus && tmpInnerValue?.length)}
                            <Icon class="material-icons problem" slot="trailingIcon">clear</Icon>
                        {:else if isTyping}
                            <Icon class="material-icons" slot="trailingIcon">search</Icon>
                        {:else}
                            ▾
                        {/if}
                    {/if}
                </button>
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
        padding: 0 44px 0 16px;
        height: 56px;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

      &:focus {
        outline: none;
        border: 2px solid rgb(168, 36, 36);
        padding-right: 16px;
      }
    }

    .combobox :global(.material-icons) {
      position: absolute;
      bottom: 5px;
      right: 4px;
    }

    .hasMatch {
      .cb-edit:focus {
        border-color: rgb(36, 168, 36);
      }

      :global(.material-icons) {
          color: rgb(36, 168, 36);
      }
    }

    :global(.material-icons.problem) {
      color: rgb(168, 36, 36);;
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
        padding: 14px 0 8px;
        list-style-type: none;
        max-height: 50vh;
        overflow-y: scroll;
        border: 1px solid rgba(0,0,0, .25);
        top: 80px;
        border-top: none;
        z-index: 5;

        &:global(.empty):after {
          display: block;
          width: 100%;
          color: #bbb;
          content: "(Ingen treff)";
          padding: 2px 16px 0 16px;
        }
    }
    .listbox li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 2px 16px;

        &:global(.selected) {
            background-color: #ddd;
        }
    }

    @media (max-width: 616px) {
        .combobox {
          width: 100% !important;
        }
    }
</style>
