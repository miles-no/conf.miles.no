<script>
    import JustifiedRow from "../../form/JustifiedRow.svelte";
    import LabeledField from "../../form/LabeledField.svelte";
    import FormField from "@smui/form-field";
    import Checkbox from "@smui/checkbox";

    let options = ['UX/Design','Smidig','Utvikling','Prosjektledelse','Admin'];
    let selected = [];
</script>

<div class="checkbox-line">
    <LabeledField label="Fagområde" width="100%">
        <JustifiedRow>
            {#each options as option}
                <FormField>
                    <Checkbox
                            bind:group={selected}
                            value={option}
                    />
                    <span slot="label">{option}</span>
                </FormField>
            {/each}
        </JustifiedRow>
    </LabeledField>
</div>

<style>
    .checkbox-line :global(label) {
        padding-left: 0;
    }
</style>
