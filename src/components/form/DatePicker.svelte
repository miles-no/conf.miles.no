<script>
    import { afterUpdate, beforeUpdate, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { DateInput, DatePicker } from 'date-picker-svelte'
    import LabeledField from "./LabeledField.svelte";
    import {Icon} from "@smui/common";
    import Textfield from "@smui/textfield";

    export let date = null, width, label, required, placeholder, earliest, latest;

    let rawDate = null;
    let textDate = null;

    const norwegianLocale = {
        weekdays: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
        months: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']
    };

    let pickerVisible = false;
    function showPicker() {
        console.log("Show")
        pickerVisible = true;
    }
    function hidePicker() {
        console.log("Hide")
        setTimeout(()=>{
            pickerVisible = false;
        }, 100)
    }
    beforeUpdate(()=>{
        console.log("Before:", date)
        //hidePicker();
    });
    afterUpdate(()=>{
        console.log("After:", date)
        //hidePicker();
    });

    onMount(()=>{
        // Bound date selection between now and twenty years ahead
        earliest = earliest || new Date();
        latest = latest || new Date(new Date(earliest).setFullYear(earliest.getFullYear() + 20));
    })

    function handleKeyDown(event) {
        console.log("Event:", event);
    }

</script>

<LabeledField label={label} required width={width} on:blur={hidePicker}>
    <div class="datepicker" on:focus={showPicker}>
        <!--DateInput
                bind:value={date}
                min={earliest}
                max={latest}
                placeholder={placeholder}
                format="yyyy-MM-dd HH:mm"
        /-->
        <Textfield variant="outlined" bind:value={rawDate} label={placeholder} on:keyDown={handleKeyDown}>
            <Icon class="material-icons" slot="trailingIcon">today</Icon>
        </Textfield>

        {#if pickerVisible}
            <div class="calendar" out:fade={{duration:200}}>
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
    .datepicker :global(.date-time-picker) {
        width: 100%;
    }
    .datepicker input {
        z-index: 1;
        background-color: transparent;
    }

    .datepicker {
        position: relative;
    }

    .calendar {
        position: absolute;
        z-index: 50;
    }

    .datepicker i {
        z-index: 0;
        top: 6px;
        right: 12px;
    }
</style>
