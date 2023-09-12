<script lang="ts">
    import Radio from '@smui/radio';
    import {Submission} from "../../../../../enums/submission-type";
    import type {SubmissionType} from "../../../../../enums/submission-type";
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import FormField from "@smui/form-field";
    import {perfType} from "../../stores/performancesStore";

    const types: SubmissionType[] = Object.values(Submission) as SubmissionType[];

	export let width="100%";

    $: {
        console.log($perfType);
    }
</script>


<fieldset class="perftype-radiobuttons" style:width={width}>
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
    .perftype-radiobuttons {
	    display: flex;
	    flex-flow: column nowrap;
	    justify-content: space-between;
	    align-items: flex-start;
	    margin-top: 20px;

        :global(.radiobutton-justified-row) {
            width: calc(100% + 11px);
            margin-left: -11px;
            flex-wrap: wrap;
            margin-bottom: 0;
	        margin-top: 13px;
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
    @media (max-width: 616px) {
	    .perftype-radiobuttons {
            width: 100% !important;

		    :global(.radiobutton-justified-row) {
			    margin-top: 0;
		    }
	    }
    }

    @media (max-width: 385px) {
	    .perftype-radiobuttons {
		    :global(.radiobutton-justified-row) {
                flex-flow: column nowrap;
                align-items: flex-start;
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
