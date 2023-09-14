<script>
	import {perfDescription} from "../../stores/performancesStore.ts";
    import DescriptionRow from "../../DescriptionRow.svelte";
	import {invalidFields, RequiredFields} from "../../stores/performanceValidation";
</script>

<DescriptionRow
        bind:value={$perfDescription}
        label="Beskrivelse"
        placeholder="Beskrivelse av bidraget"
        idPrefix="submission-description"
        rows={2}
        required invalid={$invalidFields.indexOf(RequiredFields.description) !== -1}
/>
