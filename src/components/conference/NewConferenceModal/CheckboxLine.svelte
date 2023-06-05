<script>
    import JustifiedRow from "../../form/JustifiedRow.svelte";
    import LabeledField from "../../form/LabeledField.svelte";
    import FormField from "@smui/form-field";
    import Checkbox from "@smui/checkbox";
    import {ConferenceCategory} from "../../../enums/conference-category.ts";
    import {selectedCategoryTags} from "./newConferenceStores.js";

    let categories = Object.keys(ConferenceCategory)
        .map(enumKey => ConferenceCategory[enumKey]);

</script>

<div class="checkbox-line">
    <LabeledField label="Fagområde" width="100%">
        <JustifiedRow addClass="checkbox-justified-row">
            {#each categories as category}
                <FormField>
                    <Checkbox
                            bind:group={$selectedCategoryTags}
                            value={category}
                    />
                    <span slot="label">{category}</span>
                </FormField>
            {/each}
        </JustifiedRow>
    </LabeledField>
</div>

<style>
    .checkbox-line :global(.checkbox-justified-row) {
        width: calc(100% + 11px);
        margin-left: -11px;
        flex-wrap: wrap;
    }
    .checkbox-line :global(label) {
        padding-left: 0;
    }
</style>
