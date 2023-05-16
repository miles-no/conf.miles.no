<script>
    import Button, {Icon, Label} from "@smui/button";
    import JustifiedRow from "./JustifiedRow.svelte";
</script>

<JustifiedRow className="footer-buttons">
    <Button color="secondary" on:click={() => clicked++}>
        <Icon class="material-icons">add</Icon>
        <Label>Legg til mer info</Label>
    </Button>

    <Button color="secondary" on:click={() => clicked++}>
        <Label>Registrer konferanse</Label>
    </Button>
</JustifiedRow>

<style>
    /* FIXME: Global = bad, but how to do this better? */
    :global(.footer-buttons button) {
        color: #000;
        border: 1px solid #000;
        padding: 0 16px;
        cursor: pointer;
    }
</style>
