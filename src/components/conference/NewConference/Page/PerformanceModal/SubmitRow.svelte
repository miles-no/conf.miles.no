<script lang="ts">
    import Button, {Icon, Label} from "@smui/button";
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import {pending, displayModal, performances} from "../../stores/stores.ts";
    import {
	    perfDescription,
	    perfTime,
	    perfDuration,
	    perfType,
	    perfLocation,
	    perfTitle,
	    authorName,
        authorEmail,
        _key
    } from "../../stores/performancesStore";
	import type {NewPerformance} from "../../stores/performancesStore";
    import darkTheme from "../../../../../stores/theme-store";
    import Spinner from "../../Spinner.svelte";
    import {getContext, onDestroy} from "svelte";
    import {getMinimalPortableText} from "../../../../../utils/sanityclient-utils";
    import {invalidFields, validateRequiredFields} from "../../stores/performanceValidation";
    import {makeid} from "../../../../../utils/conference-utils";


    const toastContext = getContext('toastContext');
    let submit = () => {
		pending.set(true);

		validateRequiredFields();

		if (!$invalidFields.length) {
			const newPerformance: NewPerformance = {
				_key: makeid(12),
				date: $perfTime,
				dateAndTime: $perfTime?.toISOString(),
                location: $perfLocation,
                submission: {
					title: $perfTitle,
                    submissionType: $perfType,
                    authors: [{name: $authorName, email: $authorEmail}],
                    // slug: "IAMAPERFORMANCE-SLUG-" + makeid(16),
                    description: $perfDescription ? getMinimalPortableText($perfDescription) : undefined,
                    duration: $perfDuration
                }
			}
			performances.write(newPerformance);
			displayModal.set(false);

        } else {
			console.warn("Mangelfullt utfylt skjema - sjekk felt:", $invalidFields.join(", "));
        }

		pending.set(false);
	};

    let disabled = false;

	onDestroy(()=>{
		invalidFields.set([]);
    })
</script>



<div class="submit-performance-row" class:dark-mode={$darkTheme}>
    <JustifiedRow>
        {#if ($invalidFields?.length)}
            <div class="validation-warning">
                Er all nødvendig info fylt riktig ut?<br />Sjekk følgende felt, og prøv igjen: {$invalidFields.join(", ")}.
            </div>
        {/if}
        <div class:pending={$pending} class="button-wrapper">
            <Button color="primary"
                    disabled={disabled}
                    on:click={!disabled && submit}
            >
                {#if $pending}
                    <Spinner strokeColor={$darkTheme ? "white" : "black"} />
                {/if}
                <Label>Legg til bidrag</Label>
            </Button>
        </div>
    </JustifiedRow>
</div>



<style lang="scss">
    .submit-performance-row {
        margin-top: 38px;
        width: 100%;

        :global(.justified-row) {
            margin-bottom: 0;
            justify-content: end;
            align-items: flex-start;
        }

        .button-wrapper {
            min-width: 155px;
            margin-left: 40px;
            margin-bottom: 20px;

            :global(button) {
                color: #000;
                border: 1px solid #000;
                padding: 0 16px;
                cursor: pointer;
                position: relative;
            }
        }

        .validation-warning {
            color: rgb(168, 36, 36);
        }

        &.dark-mode {
            .button-wrapper :global(button) {
                background: #212121;
                color: #fff;
                border-color: #fff;

                &:focus,
                &:active,
                &:hover {
                    background: #555;
                }
            }

            .validation-warning {
                color: #E78286;
            }
        }

        @media only screen and (max-width: 500px) {
	        .button-wrapper {
                margin-left: 0;
                margin-top: 20px;
                width: 100%
	        }
            :global(.justified-row) {
                flex-direction: column;
	            align-items: flex-end;
            }

            :global(.mdc-button),
            :global(.disabled),
            :global(.pending) {
                width:100% !important;
                margin-bottom: 20px;
            }
        }
        @media (max-width: 240px) {
            :global(.mdc-button__label) {
                font-size: .85em;
            }
        }
    }
    /*.dark-mode.submit-performance-row :global(button) {
        background: #212121;
        color: #fff;
        border-color: #fff;
    } */

    .disabled {
        opacity: 30%;
    }

    .pending :global(.mdc-button__label) {
        visibility: hidden;
    }
</style>
