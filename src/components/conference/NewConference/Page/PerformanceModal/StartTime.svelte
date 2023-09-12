<script lang="ts">
    import SveltyPicker from "svelty-picker";
    import LabeledField from "../../../../form/LabeledField.svelte";
    import {makeid} from "../../../../../utils/conference-utils";
    import {Clock4} from 'lucide-svelte';
    // import {perfTime} from "../../stores/performancesStore";
    import {endDate, startDate} from "../../stores/stores";
    import DatePicker from "../../../../form/DatePicker.svelte";
    import {addYears} from "../../../../../utils/date-time-utils";

    let pickedDay=$startDate;
    let pickedTime=undefined;
	let needsDatePicker = false;
	export let width="100%";

    const inputId = "timepicker-" + makeid(5);

    $: {
	    needsDatePicker = ($endDate > $startDate);
    }


</script>

<LabeledField
        label="Starttidspunkt"
        forId={inputId}
        addClass="starttimepicker"
        width={width}
>
    <DatePicker
            width="50%"
            label=""
            bind:date={pickedDay}
            earliest={$startDate || addYears(new Date(), -10)}
            latest={$endDate || addYears(new Date(), 10)}
            on:refreshDate={e => {console.log(e)}}
    />
    <SveltyPicker
            {inputId}
            bind:value={pickedTime}
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
        {#if (pickedTime && pickedTime.trim().length)}
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

    :global(.starttimepicker.labeled-field) {
        display: flex;
        flex-flow: row wrap;
        justify-content: start;

        :global(.timepickerinput) {
            border-radius: 4px;
            border: solid 1px rgba(0, 0, 0, .38);
            padding: 0 44px 0 44px;
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

	    :global(.date-time-field input) {
		    border-radius: 4px 0 0 4px;
            border: solid 1px rgba(0, 0, 0, .38);
		    border-right: 0;

            &:focus {
	            border: 2px solid rgb(168, 36, 36);
                outline: none;
                box-shadow: none;
            }
	    }

        :global(.std-component-wrap) {
            width: 50%;

	        :global(.timepickerinput) {
		        border-radius: 0 4px 4px 0;
		        border-left: solid 1px rgba(0, 0, 0, .1);

                &:focus {
	                border-left: 2px solid rgb(168, 36, 36);
                    padding-left: 42px;
                }
	        }
        }

	    .ornaments {
		    position: relative;
		    top: -40px;
		    pointer-events: none;
		    width: 50%;
            left: 50%;
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
	        border-left-width: 1px;
            border-left-style: solid;
        }

        :global(.std-calendar-wrap) {
            border-radius: 4px;
            border: solid 1px rgba(0, 0, 0, .25);
            top: 56px !important;
        }
    }

    @media (max-width: 615px){
	    :global(.starttimepicker.labeled-field) {
		    width: 100% !important;
	    }

    }
    @media (max-width: 500px){
	    :global(.starttimepicker.labeled-field) {
		    :global(.std-component-wrap) {
			    width: 100%;

			    :global(.timepickerinput) {
				    border-radius: 0 0 4px 4px;
				    border-top: 0;
                    border-left: 1px solid rgba(0,0,0,.38);

				    &:focus {
					    border-top: 2px solid rgb(168, 36, 36);
				    }
			    }
		    }

		    :global(.labeled-field) {
                width: 100% !important;

			    :global(.date-time-field input) {
				    border-radius: 4px 4px 0 0;
				    border-right: solid 1px rgba(0, 0, 0, .38);
				    border-bottom: solid 1px rgba(0, 0, 0, .1);

				    &:focus {
					    border-bottom: 2px solid rgb(168, 36, 36);
					    border-right: 2px solid rgb(168, 36, 36);
				    }
			    }
		    }

		    .ornaments {
			    width: 100%;
			    left: 0;
		    };
	    }
    }

    @media (max-width: 345px) {
	    :global(.starttimepicker.labeled-field) {
		    :global(.std-component-wrap .std-calendar-wrap) {
			    left: -34px;
			    width: 100%;
                margin-bottom: 40px;
		    }

            :global(.sdt-widget) {
	            min-width: 100px;
            }
        }
    }

    @media (max-width: 230px) {
	    :global(.starttimepicker.labeled-field) .ornaments :global(.lucide-icon) {
            display: none;
	    }
    }

    /*
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
    }*/
</style>
