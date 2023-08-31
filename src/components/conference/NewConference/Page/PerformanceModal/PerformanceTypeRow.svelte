<script lang="ts">
    import Radio from '@smui/radio';
    import {Submission} from "../../../../../enums/submission-type";
    import type {SubmissionType} from "../../../../../enums/submission-type";
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import FormField from "@smui/form-field";
    import {perfType} from "../../stores/performancesStore";

    const types: SubmissionType[] = Object.values(Submission) as SubmissionType[];

    $: {
        console.log($perfType);
    }
</script>


<fieldset class="radiobutton-row">
    <legend class="textfield-label">Type</legend>
    <JustifiedRow addClass="radiobutton-justified-row" justify="start">
        {#each types as type}
            <FormField>
                <Radio
                        bind:group={$perfType}
                        value={type}
                />
                <span slot="label">
                    {type}
                </span>
            </FormField>
        {/each}
    </JustifiedRow>
</fieldset>


<style lang="scss">
    .radiobutton-row {
        :global(.radiobutton-justified-row) {
            width: calc(100% + 11px);
            margin-left: -11px;
            flex-wrap: wrap;
        }
        :global(.mdc-form-field) {

          align-items: start;
          vertical-align: top;

          &>:global(label) {
            padding-left: 0;
          }
        }

        :global(.mdc-radio) {
          padding: 2px 11px 11px 11px;

          :global(input):focus {
            outline-color: rgb(168, 36, 36);
            accent-color: rgb(168, 36, 36);
          }
        }
    }

    .textfield-label {
        font-weight: 700;
        font-size: 15px;
        line-height: 150%;
        margin-bottom: 8px;
    }
</style>
