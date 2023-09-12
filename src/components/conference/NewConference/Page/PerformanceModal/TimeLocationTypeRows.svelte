<script lang="ts">
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import StartTime from "./StartTime.svelte";
    import {perfDuration, perfLocation} from "../../stores/performancesStore";
    import TextField from "../../../../form/TextField.svelte";
    import PerformanceType from "./PerformanceType.svelte";
</script>

<div class="timelocationtype-rows">
    <JustifiedRow wrap>
        <StartTime width="62%"/>
        <TextField bind:value={$perfDuration} label="Varighet" width="34%" addClass="duration-field" />
        <TextField bind:value={$perfLocation} label="Lokasjon" width="34%" addClass="location-field" />
        <PerformanceType width="62%" />
    </JustifiedRow>
</div>


<style lang="scss">
    .timelocationtype-rows {

        :global(.location-field) {
		    margin-top: 20px;
	    }

	    @media (max-width: 616px) {
            :global(.starttimepicker) {
                width: 100% !important;
            }

            :global(.duration-field) {
	            width: 48% !important;
                margin-top: 20px;
            }

		    :global(.location-field) {
			    width: 48% !important;
		    }
        }

        @media (max-width: 500px) {
		    &>:global(.justified-row) {
			    flex-direction: column;
		    }

	        :global(.duration-field),
	        :global(.location-field) {
		        width: 100% !important;
	        }
	    }

        >:global(.justified-row) {
            align-items: flex-start;
        }
    }
</style>
