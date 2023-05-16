<script>
    export let className;
</script>

<div class={"justified-row" + (className ? ' ' + className : '')}><slot /></div>

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
