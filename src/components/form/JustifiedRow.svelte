<script>
    export let addClass=null;
</script>

<div class={`justified-row ${addClass || ''}`}><slot /></div>

<style>
    .justified-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        margin-bottom: 26px;
    }
</style>
