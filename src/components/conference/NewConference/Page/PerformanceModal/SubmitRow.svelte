<script lang="ts">
    import type {IToastContextProps} from "../../../../toast/toast-context";
    import Button, {Icon, Label} from "@smui/button";
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import {
        name,
        url,
        startDate,
        endDate,
        intervalWarning,
        pending,
        displayModal,
    } from "../../stores/stores.ts";
    import darkTheme from "../../../../../stores/theme-store";
    import Spinner from "../../Spinner.svelte";
    import {getContext} from "svelte";

    export let submitText: string;


    const toastContext = getContext('toastContext');
    let submit = (toastContext:IToastContextProps) => {alert("Klikky");};

    function openModal() {
        displayModal.set(true);
    }

    let disabled = false;
    /*$: {
        disabled = (
            !($name.trim()) ||
            !($url.trim()) ||
            !$startDate ||
            !$endDate ||
            !!$intervalWarning
        );
    }*/
</script>



<div class="submit-performance-row" class:dark-mode={$darkTheme}>
    <JustifiedRow>
        <div class:pending={$pending}>
            <Button color="primary"
                    disabled={disabled}
                    on:click={!disabled && submit}
            >
                {#if $pending}
                    <Spinner strokeColor={$darkTheme ? "white" : "black"} />
                {/if}
                <Label>Legg til bidrag</Label>
            </Button>
        </div>
    </JustifiedRow>
</div>



<style lang="scss">
    .submit-performance-row {
        margin-top: 38px;
        width: 100%;

        :global(.justified-row) {
            margin-bottom: 0;
            justify-content: end;
        }

        :global(button) {
            color: #000;
            border: 1px solid #000;
            padding: 0 16px;
            cursor: pointer;
            position: relative;
        }

        &.dark-mode {
            :global(button) {
                background: #212121;
                color: #fff;
                border-color: #fff;

                &:focus,
                &:active,
                &:hover {
                    background: #555;
                }
            }
        }

        @media only screen and (max-width: 500px) {
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
        @media (max-width: 240px) {
            :global(.mdc-button__label) {
                font-size: .85em;
            }
        }
    }
    /*.dark-mode.submit-performance-row :global(button) {
        background: #212121;
        color: #fff;
        border-color: #fff;
    } */



    .disabled {
        opacity: 30%;
    }

    .pending :global(.mdc-button__label) {
        visibility: hidden;
    }
</style>
