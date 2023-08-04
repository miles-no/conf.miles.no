<script>
    import Button, {Icon, Label} from "@smui/button";
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import {
        name,
        url,
        startDate,
        endDate,
        callForPapersDate,
        selectedCategoryTags,
        intervalWarning,
        pending,
        description,
        location
    } from "../stores.ts";
    import darkTheme from "../../../../stores/theme-store";
    import Spinner from "../Spinner.svelte";
    import {submitAndHandleModal} from "../submitHandler";
    import {getContext} from "svelte";
    import {formatDateYYYYMMDD} from "../../../../utils/date-time-utils";

    const toastContext = getContext('toastContext');




    function submit() {
        const submitData = {
            title: $name,
            url: $url,
            startDate: formatDateYYYYMMDD($startDate),
            endDate: formatDateYYYYMMDD($endDate),
            callForPapersDate: formatDateYYYYMMDD($callForPapersDate),
            location: $location,
            categoryTag: $selectedCategoryTags,
            description: $description
        };

        submitAndHandleModal(submitData, toastContext);
    }




    let disabled = true;
    $: {
        disabled = (
            !($name.trim()) ||
            !($url.trim()) ||
            !($description.trim()) ||
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
                <Label>Registrer konferanse</Label>
            </Button>
        </div>
    </JustifiedRow>
</div>



<style>
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

    @media (max-width: 480px) {
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
