<script>
    import NameAndAuthorRow from "./NameAndAuthorRow.svelte";
    import TimeLocationTypeRows from "./TimeLocationTypeRows.svelte";
    import Description from "./Description.svelte";
</script>

<form>
    <NameAndAuthorRow />
    <TimeLocationTypeRows />
    <Description />
</form>

<style>
    form {
        width: 100%;
    }
</style>
