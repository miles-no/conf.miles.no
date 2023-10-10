<script lang="ts">
	import type { IConference } from '../../../../model/conference';
	import {
		initStore,
		performances,
		selectedPerformance,
		displayModal,
        displayPerformanceModal,
	} from '../../../../components/conference/NewConference/stores/stores';
	import ConferenceEditor from '../../../../components/conference/NewConference/Page/ConferenceEditor.svelte';
	import { getEditedConferenceSubmitter } from '../../../../components/conference/NewConference/submit';
	import ButtonFooterRow from '../../../../components/conference/NewConference/Page/ButtonFooterRow.svelte';
	import Heading from '../../../../components/conference/NewConference/Heading.svelte';

	import { getContext, setContext } from 'svelte';
	import type { IToastContextProps } from '../../../../components/toast/toast-context';
	import { urlFor } from '../../../../utils/sanityclient-utils';
	import type { EditConferenceData } from './+page.server';
	import { Icon } from '@smui/common';
	import NewPerformanceModal
		from "../../../../components/conference/NewConference/Page/PerformanceModal/NewPerformanceModal.svelte";
	import ConferencePerformanceView from "../../../../components/conference/ConferencePerformanceView.svelte";
	import PerformanceModal from "../../../../components/modal/performance-modal/PerformanceModal.svelte";
	const toastContext: IToastContextProps = getContext('toastContext');

	export let data: EditConferenceData;

	const conference: IConference = data.conference;
	setContext('usersByOffice', data.usersByOffice);

	if (!conference?.slug) {
		throw Error("Can't edit conference data, missing slug for source conference in fetched data");
	}

	const onOpenModal = (key: string) => {
		const foundPerformance = ($performances || []).find((p) => p._key === key);
		if (foundPerformance) {
			selectedPerformance.set(foundPerformance);
			displayPerformanceModal.set(!$displayPerformanceModal);
		}
	};

	initStore({
		name: conference?.title,
		startDate: conference?.startDate,
		endDate: conference?.endDate,
		selectedCategoryTags: conference?.categoryTag || [],
		description: conference?.description ? conference.description[0].children[0].text : undefined,
		location: conference?.location,
		callForPapersDate: conference?.callForPapersDate,
		url: conference?.url,
		performances: conference?.performances || [],
		image: conference?.imageUrl ? urlFor(conference.imageUrl).url() : ''
	});

	const submitEditedConference = getEditedConferenceSubmitter(toastContext, conference.slug);
</script>

<div class="conference-link-to-overview">
    <a href={`/konferanser/${conference.slug}`} title="Tilbake til konferansen">
        <Icon class="material-icons" alt="Tilbake">arrow_back</Icon> {conference.title}
    </a>
</div>
<Heading>Redigere konferanse</Heading>
<ConferenceEditor />
<ConferencePerformanceView performances={$performances} onOpenModal={onOpenModal} />
<ButtonFooterRow submitText="Oppdater konferanse" submit={submitEditedConference} />
{#if $displayModal}
    <NewPerformanceModal />
{/if}
{#if $selectedPerformance}
    <PerformanceModal
            performance={$selectedPerformance}
            bind:open={$displayPerformanceModal}
    />
{/if}

<style>
	.conference-link-to-overview {
		padding-bottom: 1rem;
		font-size: 1rem;
	}

	.conference-link-to-overview a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
	}

	.conference-link-to-overview a:hover {
		text-decoration: none;
	}
</style>

