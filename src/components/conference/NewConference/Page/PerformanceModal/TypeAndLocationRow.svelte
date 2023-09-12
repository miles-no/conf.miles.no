<script lang="ts">
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import PerformanceType from "./PerformanceType.svelte";
    import TextField from "../../../../form/TextField.svelte";
    import {perfLocation} from "../../stores/performancesStore";
</script>

<div class="type-and-location-row">
    <JustifiedRow>
        <PerformanceType width="62%" />
        <TextField bind:value={$perfLocation} label="Lokasjon" width="34%" addClass="performance-location-field" />
    </JustifiedRow>
</div>


<style lang="scss">
    .type-and-location-row {
        >:global(.justified-row) {
            align-items: flex-start;
        }

        @media (max-width: 570px) {
            &>:global(.justified-row) {
                flex-direction: column;
            }

            :global(.performance-location-field) {
                width: 100% !important;
                margin-top: 13px;
            }
        }
    }
</style>
