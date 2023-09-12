<script lang="ts">
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import StartTime from "./StartTime.svelte";
    import {perfDuration} from "../../stores/performancesStore";
    import TextField from "../../../../form/TextField.svelte";
</script>

<div class="timelocationtype-rows">
    <JustifiedRow>
        <StartTime width="62%"/>
        <TextField bind:value={$perfDuration} label="Varighet" width="34%" addClass="performance-duration-field" />
    </JustifiedRow>
</div>


<style lang="scss">
    .timelocationtype-rows {
	    @media (max-width: 616px) {
		    &>:global(.justified-row) {
                flex-flow: column nowrap;
		    }

            :global(.starttimepicker) {
                width: 100% !important;
            }

            :global(.performance-duration-field) {
	            width: 100% !important;
                margin-top: 20px;
            }
        }
    }
</style>
