<script>
    import Button, {Icon, Label} from "@smui/button";
</script>

<div class="footer-buttons">
    <Button color="secondary" on:click={() => clicked++}>
        <Icon class="material-icons">add</Icon>
        <Label>Legg til mer info</Label>
    </Button>

    <Button color="secondary" on:click={() => clicked++}>
        <Label>Registrer konferanse</Label>
    </Button>
</div>

<style>
    .footer-buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
    }
    .footer-buttons :global(button) {
        color: #000;
        border: 1px solid #000;
        padding: 0px 16px;
        cursor: pointer;
    }
</style>
