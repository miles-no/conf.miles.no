<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    import { DateInput } from 'date-picker-svelte'
    import LabeledField from "./LabeledField.svelte";
    import {Icon} from "@smui/common";
    import { createEventDispatcher } from 'svelte';
    import {makeid} from "../../utils/conference-utils";
    import darkTheme from "../../stores/theme-store";
    import {norwegianLocale} from "./norwegianLocale";
    import {parseDateYYYYMMDD, formatDateYYYYMMDD} from "../../utils/date-time-utils";

    export let
        date: Date|null = null,
        format: string = "dd.MM yyyy";

    export let
        width: string|undefined,
        label: string|undefined,
        required: boolean|undefined = false,
        earliest: Date|undefined,
        latest: Date|undefined,
        warning: boolean|undefined=false;

    let valid, inputField, visible;
    let innerDate: Date|null = null;

    const id = `datepicker-${makeid(5)}`;

    const dispatch = createEventDispatcher();



    onMount( ()=> {
        inputField = document.querySelector(`#${id} input[type=text]`)
    });

    afterUpdate( () => {
        date = parseDateYYYYMMDD(formatDateYYYYMMDD(innerDate));
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

    export function setDate(newDate: Date|null) {
        innerDate = newDate;
    }
</script>

<LabeledField {label} {required} {width}>
    <div
            id={id}
            class="datepicker-root"
            class:warning={warning}
            class:valid={!warning && valid && date}
            on:keydown={doSelect}
            style={$darkTheme ? '/* TODO: Should be theme variables: */ --date-picker-background: #212121;--date-picker-foreground: #fff;' : '' }
    >
        <DateInput
                bind:visible={visible}
                bind:value={innerDate}
                bind:valid={valid}
                min={earliest}
                max={latest}
                locale={norwegianLocale}
                format={format}
                placeholder={format.replace(/y/g, 'Å').replace(/d/g, "D").replace(/[H]/g, "t")}
                closeOnSelection
        />
        <Icon class="material-icons" slot="trailingIcon">{warning ? "warning" : (valid && date) ? "check" : "today"}</Icon>
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

    @media (max-width: 230px) {
        .datepicker-root :global(.material-icons) {
            display: none;
        }
    }
</style>
