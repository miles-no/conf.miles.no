<script>
    import {description} from "../stores/stores.ts";
    import DescriptionRow from "../DescriptionRow.svelte";
</script>

<DescriptionRow
        bind:value={$description}
        label="Beskrivelse"
        placeholder="Beskrivelse av konferansen"
        idPrefix="conf-description"
/>
