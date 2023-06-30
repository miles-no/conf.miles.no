<script>
    export let width, label, addClass, required=false;
</script>

<div class={'labeled-field' + (addClass ? ` ${addClass}` : '')} style:width={width}>
    {#if label}
        <label class="textfield-label" class:required>
            {label}
        </label>
    {/if}
    <slot />
</div>

<style>
    .labeled-field {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: flex-start;
    }

    .labeled-field :global(label),
    .labeled-field :global(input)
    {
        width: 100%;
    }

    .textfield-label {
        font-weight: 700;
        font-size: 15px;
        line-height: 150%;
        margin-bottom: 8px;
    }

    .textfield-label.required::after {
        content: '*';
        color: #FF0000;
        font-size: 21pt;
        position: relative;
        top: 7px;
        right: -3px;
    }

    /* TODO: Hides the placeholder too. Bad. */
    .labeled-field :global(.mdc-notched-outline__notch)  {
        width: 0 !important;
        padding-right: 0;
        display: none;
    }
</style>
