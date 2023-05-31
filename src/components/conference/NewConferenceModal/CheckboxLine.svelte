<script>
    import JustifiedRow from "../../form/JustifiedRow.svelte";
    import LabeledField from "../../form/LabeledField.svelte";
    import FormField from "@smui/form-field";
    import Checkbox from "@smui/checkbox";
    import {ConferenceCategory} from "../../../enums/conference-category.ts";

    let categories = Object.keys(ConferenceCategory).map(enumKey => ConferenceCategory[enumKey]);
    let selected = [];
</script>

<div class="checkbox-line">
    <LabeledField label="Fagområde" width="100%">
        <JustifiedRow>
            {#each categories as category}
                <FormField>
                    <Checkbox
                            bind:group={selected}
                            value={category}
                    />
                    <span slot="label">{category}</span>
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
