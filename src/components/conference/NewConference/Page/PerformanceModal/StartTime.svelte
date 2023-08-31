<script lang="ts">
    import SveltyPicker from "svelty-picker";
    import LabeledField from "../../../../form/LabeledField.svelte";
    import {makeid} from "../../../../../utils/conference-utils";
    import {Clock4} from 'lucide-svelte';
    import {perfTime} from "../../stores/performancesStore";
    import {endDate, startDate} from "../../stores/stores";
    import DatePicker from "../../../../form/DatePicker.svelte";

    let startDay=undefined;
    let startTime=undefined;
	let needsDatePicker = false;

    const inputId = "timepicker-" + makeid(5);

    $: {
	    needsDatePicker = ($endDate > $startDate);
    }

    $: {
		if (needsDatePicker) {
			console.log("Start-dag:", startDay);
        }
	    console.log("Starttid:", startTime);
    }

</script>

{#if (needsDatePicker)}
    <DatePicker
            label="Dag"
            width="42%"
            bind:date={startDay}
            earliest={$startDate}
            latest={$endDate}
            warning={false}
    />

                                                                                                                        <!--
                                                                                                                        bind:this={callForPapersDatePicker}
                                                                                                                        on:refreshDate={updateCallForPapersWarning}
                                                                                                                        -->
{/if}
<LabeledField label="Starttidspunkt" forId={inputId} addClass="starttimepicker"  width="25%">
    <SveltyPicker
            {inputId}
            bind:value={startTime}
            mode="time"
            startView=3
            clearBtn={false}
            manualInput={true}
            autocommit={true}
            format="hh:ii"
            displayFormat="hh:ii"
            placeholder="tt:mm"
            inputClasses="timepickerinput"
    ></SveltyPicker>

    <div class="ornaments">
        {#if (startTime && startTime.trim().length)}
            <div class="label-kl">kl.</div>
        {/if}
        <Clock4 />
    </div>
</LabeledField>

<style lang="scss">
    :root {
        --sdt-primary: #A82424;
        --sdt-clock-bg: #f4f4f4;
        --sdt-wrap-shadow: none;
        --sdt-shadow-color: rgba(0, 0, 0, .2);
    }

    :global(.starttimepicker) {
        :global(.timepickerinput) {
            border-radius: 4px;
            border: solid 1px rgba(0, 0, 0, .38);
            padding: 0 44px 0 41px;
            height: 56px;
            font-family: Roboto, sans-serif;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            box-sizing: border-box;

            &:focus {
                outline: none;
                border: 2px solid rgb(168, 36, 36);
                padding-right: 16px;
                padding-left: 40px;
            }
        }

	    .ornaments {
		    position: relative;
		    top: -40px;
		    pointer-events: none;
		    width: 100%;
		    font-size: 16px;
		    color: #888;

            .label-kl {
                position: absolute;
                left: 16px;
                color: #888;
                padding-top: .5px;
            }

            :global(.lucide-icon) {
                position: absolute;
                right: 16px;
            }
	    }

        :global(.sdt-time-btn):focus {
            outline-color: rgb(168, 36, 36);
        }

        :global(.std-calendar-wrap) {
            border-radius: 4px;
            border: solid 1px rgba(0, 0, 0, .25);
            top: 56px !important;
        }
    }

    :global(.dark-mode) {
        :global(.starttimepicker .std-calendar-wrap) {
            background-color: #212121 !important;
            border-color: rgba(255, 255, 255, .2);
        }

        :global(.sdt-clock) {
	        background-color: #333 !important;
	        color: white;
        }
	    :global(.sdt-time-btn) {
		    color: white !important;

            &:focus {
	            outline-color: rgb(233, 114, 118);
            }
	    }
    }
</style>
