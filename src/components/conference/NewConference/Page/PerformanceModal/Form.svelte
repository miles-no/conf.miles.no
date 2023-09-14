<script>
    import NameAndAuthorRow from "./NameAndAuthorRow.svelte";
    import TimeLocationTypeRows from "./TimeLocationTypeRows.svelte";
    import Description from "./Description.svelte";
    import SubmitRow from "./SubmitRow.svelte";
</script>

<div>
    <form>
        <NameAndAuthorRow />
        <TimeLocationTypeRows />
        <Description />
        <SubmitRow />
    </form>
</div>

<style>
    form {
        width: 100%;
    }
</style>
