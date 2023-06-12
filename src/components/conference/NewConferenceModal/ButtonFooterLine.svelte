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
        pending,
        initModal
    } from "./newConferenceStores.js";
    import Spinner from "./Spinner.svelte";


    const alertError = (message, error, submitData) => {
        alert(`😨 Something went wrong!\n\n${message}`);
        console.log("Error when trying to create a new conference:");
        console.error(error);
        console.log("Submitted conference data:", submitData);
        pending.set(false);
    }

    async function submit() {
        pending.set(true);

        const submitData = JSON.stringify({
            title: $name,
            url: $url,
            startDate: $startDate,
            endDate: $endDate,
            categoryTag: $selectedCategoryTags
        });

        try {
            const response = await fetch('/api/create-ext-conference', {
                method: 'POST',
                body: submitData
            });

            const result = await response.json();


            if (result?.ok) {
                if (!(result?.warnings) || !result.warnings.length) {
                    alert("👍 Success! The conference was created.");

                } else {
                    alert(`🤔 Better take a second look at things - the conference was created, but with result.warnings.length} warning message(s):\n\n- ` + result.warnings.join("\n- "));
                    console.log(`The conference was created, but with ${result.warnings.length} warning message(s):`);
                    result.warnings.forEach(warning => console.warn(`    - ${warning}`));
                    console.log("Submitted conference data:", submitData);
                }
                initModal();

            } else {
                alertError(result.statusText, result.statusText, submitData);
            }

        } catch (e) {
            alertError("See the console log for details.", e, submitData);
        }
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
