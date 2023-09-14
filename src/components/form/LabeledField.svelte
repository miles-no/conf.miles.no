<script>
    export let label, addClass=undefined, required=false, forId=undefined, width="100%";
</script>

<div class={`labeled-field${addClass ? ' ' + addClass : ''}`} style:width={width}>
    {#if label}
        {#if forId}
            <label class="textfield-label" class:required for={forId}>{label}</label>
        {:else}
            <label class="textfield-label" class:required>{label}</label>
        {/if}
    {/if}
    <slot />
</div>

<style lang="scss">
    .labeled-field {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: flex-start;

        :global(label),
        :global(input) {
            width: 100%;
        }

        .textfield-label {
            font-weight: 700;
            font-size: 15px;
            line-height: 150%;
            margin-bottom: 8px;

            &.required::after {
                content: '*';
                color: rgb(168, 36, 36);
                font-size: 21pt;
                position: relative;
                top: 7px;
                right: -3px;
            }
        }

        &:global(.invalid) {
            .textfield-label {
                color: rgb(168, 36, 36);
            }

            :global(*) {
                /*border-color: rgb(168, 36, 36) !important;*/
            }

        }

        /* FIXME: Hides the placeholder too... */
        :global(.mdc-notched-outline__notch)  {
            width: 0 !important;
            padding-right: 0;
            display: none;
        }
    }



</style>
