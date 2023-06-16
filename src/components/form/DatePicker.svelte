<script>
    import { afterUpdate, onMount } from 'svelte';
    import { DateInput } from 'date-picker-svelte'
    import LabeledField from "./LabeledField.svelte";
    import {Icon} from "@smui/common";
    import { createEventDispatcher } from 'svelte';
    import {makeid} from "../../utils/conference-utils.ts";
    import darkTheme from "../../stores/theme-store";
    /*

    */

    export let date = null, format="dd.MM yyyy";
    export let width, label, required, earliest, latest, intervalWarning=false;

    let valid, inputField, visible;

    const id = `datepicker-${label}-${makeid(3)}`;

    const dispatch = createEventDispatcher();

    const norwegianLocale = {
        weekdays: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
        months: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']
    };

    onMount( ()=> {
        inputField = document.querySelector(`#${id} input[type=text]`)
    });

    afterUpdate( () => {
        dispatch("refreshDate");
    });

    const doSelect = (event) => {
        if (event.key === "Enter") {
            const willHide = (document.activeElement !== inputField);
            inputField.focus();
            if (willHide) {
                visible=false;
            }
            event.preventDefault();
        }
    }
</script>

<LabeledField label={label} required width={width}>
    <div
            id={id}
            class="datepicker-root"
            class:warning={intervalWarning}
            class:valid={!intervalWarning && valid && date}
            on:keydown={doSelect}
            style={$darkTheme ? '/* TODO: Should be theme variables: */ --date-picker-background: #212121;--date-picker-foreground: #fff;' : '' }
    >
        <DateInput
                bind:visible={visible}
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
        pointer-events: none;
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