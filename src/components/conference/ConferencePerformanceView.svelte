<script lang="ts">
    import ConferencePerformanceCard from "./conference-performance-card/ConferencePerformanceCard.svelte";
    import {formatDate} from "../../utils/date-time-utils";
    import type {IFormatOptions} from "../../utils/date-time-utils";
    import type {IPerformance} from "../../model/event";

    interface IPerformanceMapByDate {
	    [key: string]: IPerformance[];
    }

	export let performances: IPerformance[];
	export let onOpenModal: (key: string) => void;

    const formatOption: IFormatOptions = { weekday: 'long', day: '2-digit', month: 'long' };
    $: allDates = Array.from(
	    new Set((performances || []).map(
			(p) => formatDate(p.dateAndTime, formatOption))
        )
    );

    $: performanceMapByDate = allDates?.reduce((previousValue, currentValue) => {
	    const filtered = (performances || []).filter(
		    (p) => formatDate(p.dateAndTime, formatOption) === currentValue
	    );
	    if (filtered !== undefined) {
		    return {
			    ...previousValue,
			    [currentValue]: filtered
		    };
	    }
    }, undefined as IPerformanceMapByDate | undefined);

</script>


{#if allDates.length > 0 && performanceMapByDate}
    <div class="conference-details-main-content-miles-bidrag">
        <h2>Miles bidrag</h2>
        <div class="miles-bidrag-content light-gray-bg-color">
            {#each allDates as date}
                <h3 class="date">{date}</h3>
                <div class="miles-bidrag-content-per-day">
                    {#each performanceMapByDate[date] as performance}
                        <ConferencePerformanceCard {performance} handleModal={onOpenModal} />
                    {/each}
                </div>
            {/each}
        </div>
    </div>
{/if}


<style lang="scss">
	h2 {
		font-size: 1.3rem;
		font-weight: 500;
	}
	h3 {
		font-size: 1rem;
		margin: 0;
	}

	.conference-details-main-content-miles-bidrag {
		display: flex;
		flex-direction: column;

		.date {
			text-transform: uppercase;
			font-weight: 600;
		}

		.miles-bidrag-content {
			border-radius: 1rem;
			padding: 1.5rem;
			.miles-bidrag-content-per-day {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				padding-bottom: 1rem;
			}
		}
	}

	// Desktop
	@media (min-width: 900px) {
		.conference-details-main-content-miles-bidrag {
			.miles-bidrag-content {
				.miles-bidrag-content-per-day {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
				}
			}
		}
	}
</style>
