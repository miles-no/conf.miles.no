<script>
	import {perfDescription, ProblemFields, problemFields} from "../../stores/performancesStore.ts";
    import DescriptionRow from "../../DescriptionRow.svelte";
</script>

<DescriptionRow
        bind:value={$perfDescription}
        label="Beskrivelse"
        placeholder="Beskrivelse av bidraget"
        idPrefix="submission-description"
        rows={2}
        invalid={$problemFields.indexOf(ProblemFields.author) !== -1}
/>
