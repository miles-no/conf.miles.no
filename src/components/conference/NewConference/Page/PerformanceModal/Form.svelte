<script>
    import NameAndAuthorRow from "./NameAndAuthorRow.svelte";
    import PerformanceTypeRow from "./PerformanceTypeRow.svelte";
    import TimeLocationRow from "./TimeLocationRow.svelte";
</script>

<form>
    <NameAndAuthorRow />
    <PerformanceTypeRow />
    <TimeLocationRow />
</form>

<style>
    form {
        width: 100%;
    }
</style>
