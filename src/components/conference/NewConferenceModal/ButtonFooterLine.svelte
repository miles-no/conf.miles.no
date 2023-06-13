<script>
    import Button, {Icon, Label} from "@smui/button";
    import JustifiedRow from "../../form/JustifiedRow.svelte";
    import {
        name,
        url,
        startDate,
        endDate,
        selectedCategoryTags,
        intervalWarning,
        pending
    } from "./newConferenceStores.ts";
    import Spinner from "./Spinner.svelte";
    import {submitAndHandleModal} from "./modalSubmitHandler.ts";
    import {getContext} from "svelte";
    import {formatDateYYYYMMDD} from "../../../utils/date-time-utils";


    const toastContext = getContext('toastContext');




    function submit() {
        const submitData = {
            title: $name,
            url: $url,
            startDate: formatDateYYYYMMDD($startDate),
            endDate: formatDateYYYYMMDD($endDate),
            categoryTag: $selectedCategoryTags
        };

        submitAndHandleModal(JSON.stringify(submitData), toastContext);
    }

    let disabled = true;
    $: {
        disabled = !($name.trim()) || !($url.trim()) || !$startDate || !$endDate || !!$intervalWarning;
    }
</script>



<div class="footer-buttons">
    <JustifiedRow>
        <Button color="secondary"
                on:click={() => alert("Implement me!")}
                disabled={$pending}
        >
            <Icon class="material-icons">add</Icon>
            <Label>Legg til mer info</Label>
        </Button>

        <div class:disabled class:pending={$pending}>
            <Button color="primary"
                    disabled={disabled}
                    on:click={!disabled && submit}
            >
                {#if $pending}
                    <Spinner/>
                {/if}
                <Label>Registrer konferanse</Label>
            </Button>
        </div>
    </JustifiedRow>
</div>



<style>
    .footer-buttons :global(button) {
        color: #000;
        border: 1px solid #000;
        padding: 0 16px;
        cursor: pointer;
        position: relative;
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
