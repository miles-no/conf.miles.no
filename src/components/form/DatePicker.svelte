<script>
    import { afterUpdate, onMount } from 'svelte';
    import { DateInput } from 'date-picker-svelte'
    import LabeledField from "./LabeledField.svelte";
    import {Icon} from "@smui/common";
    import { createEventDispatcher } from 'svelte';


    export let date = null, format="dd.MM yyyy HH:mm";
    export let width, label, required, earliest, latest, intervalWarning=false;

    let valid;

    const dispatch = createEventDispatcher();

    const norwegianLocale = {
        weekdays: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
        months: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']
    };

    afterUpdate( () => {
        dispatch("refreshDate");
    });
</script>

<LabeledField label={label} required width={width}>
    <div
            class="datepicker-root"
            class:warning={intervalWarning}
            class:valid={!intervalWarning && valid && date}
    >
        <DateInput
                bind:value={date}
                bind:valid={valid}
                min={earliest}
                max={latest}
                locale={norwegianLocale}
                format={format}
                placeholder={format.replace(/y/g, 'Å').replace(/d/g, "D").replace(/[H]/g, "t")}
                closeOnSelection
        />
        <Icon class="material-icons" slot="trailingIcon">{intervalWarning ? "warning" : (valid && date) ? "check" : "today"}</Icon>
    </div>
</LabeledField>

<style>
    .datepicker-root {
        position: relative;
        width: 100%;
    }

    .datepicker-root :global(.date-time-field) {
        width: 100%;
        height: 56px;
    }

    .datepicker-root :global(.picker.visible) {
        width: 100%;
    }
    .datepicker-root :global(.picker.visible > *) {
        width: 100%;
    }

    .datepicker-root :global(input) {
        z-index: 1;
        background-color: transparent;
        height: 100%;
        padding-left: 16px
    }

    .datepicker-root :global(i) {
        position: absolute;
        z-index: 0;
        top: 16px;
        right: 12px;
        opacity: 50%;
    }
    .datepicker-root.valid :global(i) {
        color: darkgreen;
    }
    .datepicker-root.warning :global(i) {
        color: darkred;
    }

    .datepicker-root :global(.cell.disabled) {
        visibility: visible !important;
        opacity: 7%;
    }

    @media (max-width: 450px) {
        .datepicker-root :global(.material-icons) {
            display: none;
        }
    }
</style>
