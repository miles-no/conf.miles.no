<script>
    export let className;
</script>

<div class={"form-line" + (className ? ' ' + className : '')}><slot /></div>

<style>
    .form-line {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
    }
</style>
