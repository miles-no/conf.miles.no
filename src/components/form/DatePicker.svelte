<script>
    import { afterUpdate, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { DatePicker } from 'date-picker-svelte'
    import LabeledField from "./LabeledField.svelte";
    import {Icon} from "@smui/common";
    import Textfield from "@smui/textfield";
    import { getClickOutsideParentElementFunc } from "./clickOutsideParent.js";

    export let date = null, width, label, required, placeholder, earliest, latest;

    let rawDate = null;
    let textDate = '';
    let valid=false;

    const norwegianLocale = {
        weekdays: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
        months: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']
    };

    // Each datepicker gets a unique ID to isolate open/close behavior
    const uid = parseInt(Math.random()*Math.pow(36,8)).toString(36);
    const uniqueContainerClassName = "datepicker-" + uid;
    const clickOutsideDatepicker = getClickOutsideParentElementFunc(uniqueContainerClassName, "outsideDatepickerClick");

    let pickerVisible = false;
    function showPicker() {
        pickerVisible = true;
    }
    function hidePicker(event) {
        pickerVisible = false;
    }

    async function handleKeyDown(event) {
        if (event.key === 'Escape') {
            hidePicker();
        }
        if (event.key === 'Tab') {
            lastElement = document.querySelector("."+uniqueContainerClassName+" .calendar .dropdown.year select");
            if (event.target === lastElement) {
                hidePicker();
            }

        }
    }


    let displayedPlaceholder = placeholder;

    function hidePlaceholder() {
        displayedPlaceholder = undefined;
    }
    function handlePlaceholder() {
        displayedPlaceholder = !(textDate.trim())
            ? placeholder
            : undefined;
    }



    // TODO
    afterUpdate(()=>{
        // console.log("date:", date, "\ntextDate:", textDate, "\nrawDate:", rawDate, "\n", typeof rawDate)
        //hidePicker();
    });

    let lastElement;

    // TODO
    onMount(()=>{
        // Bound date selection between now and twenty years ahead
        earliest = earliest || new Date();
        latest = latest || new Date(new Date(earliest).setFullYear(earliest.getFullYear() + 20));

        handlePlaceholder();
    });

</script>

<LabeledField label={label} required width={width}>
    <div
            class="datepicker-root {uniqueContainerClassName}"
            on:focus={showPicker}
            use:clickOutsideDatepicker
            on:outsideDatepickerClick={hidePicker}
            on:keydown={handleKeyDown}
    >
        <Textfield
                variant="outlined"
                bind:value={textDate}
                label={displayedPlaceholder}
                on:focus={hidePlaceholder}
                on:blur={handlePlaceholder}
        >
            <Icon class="material-icons" slot="trailingIcon">today</Icon>
        </Textfield>

        {#if pickerVisible}
            <div class="calendar" out:fade={{duration:100}}>
                <DatePicker
                        bind:value={rawDate}
                        min={earliest}
                        max={latest}
                        locale={norwegianLocale}
                />
            </div>
        {/if}
    </div>
</LabeledField>

<style>
    .datepicker,
    .calendar,
    .datepicker-root :global(.date-time-picker) {
        width: 100%;
    }
    .datepicker-root input {
        z-index: 1;
        background-color: transparent;
    }

    .datepicker-root {
        position: relative;
        width: 100%;
    }

    .datepicker-root i {
        z-index: 0;
        top: 6px;
        right: 12px;
    }

    .calendar {
        position: absolute;
        z-index: 50;
    }

    .calendar :global(.cell.disabled) {
        visibility: visible !important;
        opacity: 7%;
    }
</style>
