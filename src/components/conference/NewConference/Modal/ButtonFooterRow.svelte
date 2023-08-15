<script>
    import Button, {Icon, Label} from "@smui/button";
    import JustifiedRow from "../../../form/JustifiedRow.svelte";
    import {
        name,
        url,
        startDate,
        endDate,
        selectedCategoryTags,
        intervalWarning,
        pending,
        location
    } from "../stores.ts";
    import darkTheme from "../../../../stores/theme-store";
    import Spinner from "../Spinner.svelte";
    import {formatDateYYYYMMDD} from "../../../../utils/date-time-utils";
    import {makeid} from "../../../../utils/conference-utils";
    import {submit} from "../submit";

    import {getContext} from "svelte";
    const toastContext = getContext('toastContext');





    async function gotoAddMoreDetailsPage() {
        const enteredData = {
            name: $name,
            url: $url,
            location: $location,
            startDate: formatDateYYYYMMDD($startDate),
            endDate: formatDateYYYYMMDD($endDate),
            categoryTag: $selectedCategoryTags
        };

        // Store entered data in sessionStorage for picking it back up after navigating to the created item:
        if (typeof sessionStorage !== "undefined") {
            const sessionStorageKey =  makeid(6);
            sessionStorage.setItem(`newconf_${sessionStorageKey}`, JSON.stringify(enteredData));
            window.location.href = `/rediger/konferanse/?new=${sessionStorageKey}`;

        } else {
            // TODO: Confirm, will svelte stores always retain the entered data this way?
            window.location.href = `/rediger/konferanse/?new=true`;
        }
    }


    let disabled = true;
    $: {
        disabled = !($name.trim()) || !($url.trim()) || !$startDate || !$endDate || !!$intervalWarning;
    }
</script>



<div class="footer-buttons" class:dark-mode={$darkTheme}>
    <JustifiedRow>
        <Button color="secondary"
                on:click={gotoAddMoreDetailsPage}
                disabled={$pending}
        >
            <Icon class="material-icons">add</Icon>
            <Label>Legg til mer info</Label>
        </Button>

        <div class:disabled class:pending={$pending}>
            <Button color="primary"
                    disabled={disabled}
                    on:click={() => {!disabled && submit(toastContext)} }
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
