<script>
    import FormField from "@smui/form-field";
    import Checkbox from "@smui/checkbox";
    import {ConferenceCategory} from "../../../enums/conference-category";
    import {selectedCategoryTags} from "./stores";
    import JustifiedRow from "../../form/JustifiedRow.svelte";

    let categories = Object.keys(ConferenceCategory)
        .map(enumKey => ConferenceCategory[enumKey]);

</script>

<fieldset class="checkbox-line">
    <legend class="textfield-label">Fagområde</legend>
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
</fieldset>


<style>
    .checkbox-line :global(.checkbox-justified-row) {
        width: calc(100% + 11px);
        margin-left: -11px;
        flex-wrap: wrap;
    }
    .checkbox-line :global(label) {
        padding-left: 0;
    }
    .textfield-label {
        font-weight: 700;
        font-size: 15px;
        line-height: 150%;
        margin-bottom: 8px;
    }
</style>
