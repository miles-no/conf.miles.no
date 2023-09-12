<script>
    export let justify=undefined, addClass=null, id=undefined, wrap=false;
</script>

<div class={`justified-row ${addClass || ''} ${justify ? 'justify-' + justify : ''} ${wrap ? 'flex-wrap' : ''}`} {id}>
    <slot />
</div>


<style lang="scss">
    .justified-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        margin-bottom: 26px;

        &.justify-start {
            justify-content: flex-start;
        }
        &.justify-end {
            justify-content: flex-end;
        }

        &.flex-wrap {
            flex-wrap: wrap;
        }
    }
</style>
