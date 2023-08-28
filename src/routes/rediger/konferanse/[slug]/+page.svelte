<script lang="ts">
    import type { IConference } from '../../../../model/conference';
    import {initStore} from "../../../../components/conference/NewConference/stores/stores";
    import ConferenceEditor from "../../../../components/conference/NewConference/Page/ConferenceEditor.svelte";
    import {getEditedConferenceSubmitter} from "../../../../components/conference/NewConference/submit";
    import ButtonFooterRow from "../../../../components/conference/NewConference/Page/ButtonFooterRow.svelte";
    import Heading from "../../../../components/conference/NewConference/Heading.svelte";

    import {getContext, setContext} from "svelte";
    import type {IToastContextProps} from "../../../../components/toast/toast-context";
	import { urlFor } from '../../../../utils/sanityclient-utils';
    import type {EditConferenceData} from "./+page.server";
    const toastContext: IToastContextProps = getContext('toastContext');


    export let data: EditConferenceData;

    const conference: IConference = data.conference;
    setContext('usersByOffice', data.usersByOffice);

    if (!conference?.slug) {
        throw Error("Can't edit conference data, missing slug for source conference in fetched data");
    }

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



<Heading>Redigere konferanse</Heading>
<ConferenceEditor/>
<ButtonFooterRow submitText="Oppdater konferanse" submit={submitEditedConference} />

