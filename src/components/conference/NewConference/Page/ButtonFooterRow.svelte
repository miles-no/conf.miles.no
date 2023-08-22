<script lang="ts">
    import type {IToastContextProps} from "../../../toast/toast-context";
    import Button, {Icon, Label} from "@smui/button";
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import {
        name,
        url,
        startDate,
        endDate,
        intervalWarning,
        pending,
    } from "../stores/stores.ts";
    import darkTheme from "../../../../stores/theme-store";
    import Spinner from "../Spinner.svelte";

    export let submitText: string;
    export let submit: (toastContext:IToastContextProps) => void;



    let disabled = true;
    $: {
        disabled = (
            !($name.trim()) ||
            !($url.trim()) ||
            !$startDate ||
            !$endDate ||
            !!$intervalWarning
        );
    }
</script>



<div class="footer-buttons" class:dark-mode={$darkTheme}>
    <JustifiedRow>
        <Button color="secondary"
                on:click={()=>alert("Implement me!")}
                disabled={true || $pending}
        >
            <Icon class="material-icons">add</Icon>
            <Label>Legg til bidrag</Label>
        </Button>

        <div class:disabled class:pending={$pending}>
            <Button color="primary"
                    disabled={disabled}
                    on:click={!disabled && submit}
            >
                {#if $pending}
                    <Spinner strokeColor={$darkTheme ? "white" : "black"} />
                {/if}
                <Label>{submitText}</Label>
            </Button>
        </div>
    </JustifiedRow>
</div>



<style lang="scss">
    .footer-buttons {
        margin-top: 30px;
    }
    .footer-buttons :global(button) {
        color: #000;
        border: 1px solid #000;
        padding: 0 16px;
        cursor: pointer;
        position: relative;
    }
    .dark-mode.footer-buttons :global(button) {
        background: #212121;
        color: #fff;
        border-color: #fff;
    }
    .dark-mode.footer-buttons :global(button) {
        background: #212121;
        color: #fff;
        border-color: #fff;
    }
    .dark-mode.footer-buttons :global(button:focus),
    .dark-mode.footer-buttons :global(button:active),
    .dark-mode.footer-buttons :global(button:hover) {
        background: #555;
    }

    @media only screen and (max-width: 500px) {
        .footer-buttons {
            :global(.justified-row) {
                flex-direction: column;
            }
            :global(.mdc-button),
            :global(.disabled),
            :global(.pending) {
                width:100% !important;
                margin-bottom: 20px;
            }
        }
    }
    @media (max-width: 240px) {
      .footer-buttons :global(.mdc-button__label) {
        font-size: .85em;
      }
    }

    .disabled {
        opacity: 30%;
    }

    .pending :global(.mdc-button__label) {
        visibility: hidden;
    }
</style>
