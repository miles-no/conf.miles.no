<script lang="ts">
    import Button, {Icon, Label} from "@smui/button";
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import {pending, displayModal, performances} from "../../stores/stores.ts";
    import {
	    perfDescription,
	    perfTime,
	    perfTimeIsSet,
	    perfDuration,
	    perfType,
	    perfLocation,
	    perfTitle,
	    authorName, ProblemFields, problemFields
    } from "../../stores/performancesStore";
	import type {NewPerformance} from "../../stores/performancesStore";
    import darkTheme from "../../../../../stores/theme-store";
    import Spinner from "../../Spinner.svelte";
    import {getContext, onDestroy} from "svelte";
    import {makeid} from "../../../../../utils/conference-utils";
    import {getMinimalPortableText} from "../../../../../utils/sanityclient-utils";


    const toastContext = getContext('toastContext');
    let submit = () => {
		pending.set(true);

        const getVerifiedStringOrNull = (maybeString?) => ((maybeString ?? '') + '').trim() ? maybeString.trim() : null

        // Required fields validation and feedback: add all required data to an object, remove valid/completed fields
        // from it. If there are any fields remaining after that, use the object to provide user feedback. If not,
        // submit and proceed.
        const requiredData = {
	        [ProblemFields.title]: getVerifiedStringOrNull($perfTitle),
	        [ProblemFields.author]: getVerifiedStringOrNull($authorName),
		    [ProblemFields.description]: getVerifiedStringOrNull($perfDescription),
            [ProblemFields.dateAndTime]: $perfTimeIsSet ? $perfTime : null,
		    [ProblemFields.duration]: $perfDuration >= 0 ? $perfDuration : null,
	        [ProblemFields.type]: getVerifiedStringOrNull($perfType),
	        [ProblemFields.location]: getVerifiedStringOrNull($perfLocation),
        }
        const missingFields: ProblemFields[] = Object.keys(requiredData)
            .map( field => (requiredData[field] == null) ? field : undefined)
            .filter( field => !!field ) as ProblemFields[];

		if (!missingFields.length) {
			const newPerformance: NewPerformance = {
				_key: "IAMAPERFORMANCE-KEY-" + makeid(16),
                _type: "performance",
				date: $perfTime,
				dateAndTime: $perfTime?.toISOString(),
                location: $perfLocation,
                submission: {
					title: $perfTitle,
                    submissionType: $perfType,
                    authors: [$authorName],
                    // slug: "IAMAPERFORMANCE-SLUG-" + makeid(16),
                    description: $perfDescription ? getMinimalPortableText($perfDescription) : undefined,
                    duration: $perfDuration
                }
			}
			performances.write(newPerformance);
			displayModal.set(false);

        } else {
			problemFields.set(missingFields);
			console.log("problemFields:", $problemFields);
        }
		pending.set(false);
	};

    let disabled = false;

	onDestroy(()=>{
		problemFields.set([]);
		/*alert("Destroying the performance modal");*/
    })
</script>



<div class="submit-performance-row" class:dark-mode={$darkTheme}>
    <JustifiedRow>
        <div class:pending={$pending}>
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
        }

        :global(button) {
            color: #000;
            border: 1px solid #000;
            padding: 0 16px;
            cursor: pointer;
            position: relative;
        }

        &.dark-mode {
            :global(button) {
                background: #212121;
                color: #fff;
                border-color: #fff;

                &:focus,
                &:active,
                &:hover {
                    background: #555;
                }
            }
        }

        @media only screen and (max-width: 500px) {
            :global(.justified-row) {
                flex-direction: column;
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
