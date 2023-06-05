<script>
    import Button, {Icon, Label} from "@smui/button";
    import JustifiedRow from "../../form/JustifiedRow.svelte";
    import {name, url, startDate, endDate, selectedCategoryTags, intervalWarning} from "./newConferenceStores.js";

    function submit() {
        alert("Implement me - submit data to sanity:\n" + JSON.stringify({
            name: $name,
            url: $url,
            startDate: $startDate,
            endDate: $endDate,
            selectedCategoryTags: $selectedCategoryTags
        }, null, 4));
    }

    let disabled = true;
    $: {
        disabled = !($name.trim()) || !($url.trim()) || !$startDate || !$endDate || !!$intervalWarning;
    }
</script>

<div class="footer-buttons">
    <JustifiedRow>
        <Button color="secondary" on:click={() => alert("Implement me!")}>
            <Icon class="material-icons">add</Icon>
            <Label>Legg til mer info</Label>
        </Button>

        <div class:disabled>
            <Button color="primary"
                    disabled={disabled}
                    on:click={!disabled && submit}>
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
    }

    @media (max-width: 480px) {
        .footer-buttons :global(.mdc-button__label) {
            font-size: .85em;
        }
    }

    .disabled {
        opacity: 30%;
    }
</style>
