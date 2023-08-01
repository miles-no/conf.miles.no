<script>
    export let justify=undefined, addClass=null, id=undefined;
</script>

<div class={`justified-row ${addClass || ''} ${justify ? 'justify-' + justify : ''}`} {id}>
    <slot />
</div>


<style>
    .justified-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        margin-bottom: 26px;
    }
    .justified-row.justify-start {
        justify-content: flex-start;
    }
    .justified-row.justify-end {
        justify-content: flex-end;
    }
</style>
