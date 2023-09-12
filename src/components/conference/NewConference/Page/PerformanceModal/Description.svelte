<script>
    import {perfDescription} from "../../stores/performancesStore.ts";
    import DescriptionRow from "../../DescriptionRow.svelte";
</script>

<DescriptionRow
        bind:value={$perfDescription}
        label="Beskrivelse"
        placeholder="Beskrivelse av bidraget"
        idPrefix="submission-description"
        rows={2}
/>
