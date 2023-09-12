<script lang="ts">
    import JustifiedRow from "../../../../form/JustifiedRow.svelte";
    import TextField from "../../../../form/TextField.svelte";

    import {perfTitle} from '../../stores/performancesStore';
    import Author from "./Author.svelte";
</script>

<div class="textfield-row">
    <JustifiedRow>
        <TextField bind:value={$perfTitle} label="Tittel" placeholder="Tittel" width="62%" required />
        <Author />
    </JustifiedRow>
</div>

<style lang="scss">
    @media only screen and (max-width: 616px) {
        .textfield-row {
            :global(.justified-row) {
                flex-direction: column;
                margin-bottom: 0;
            }
            :global(.labeled-field) {
                width:100% !important;
                margin-bottom: 20px;
            }
        }
    }
</style>
