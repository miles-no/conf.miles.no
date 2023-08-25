<script lang="ts">
    import type { IConference } from '../../../../model/conference';
    import {initStore} from "../../../../components/conference/NewConference/stores";
    import ConferenceEditor from "../../../../components/conference/NewConference/Page/ConferenceEditor.svelte";
    import {getEditedConferenceSubmitter} from "../../../../components/conference/NewConference/submit";
    import ButtonFooterRow from "../../../../components/conference/NewConference/Page/ButtonFooterRow.svelte";
    import Heading from "../../../../components/conference/NewConference/Heading.svelte";

    import {getContext} from "svelte";
    import type {IToastContextProps} from "../../../../components/toast/toast-context";
	import { urlFor } from '../../../../utils/sanityclient-utils';
    const toastContext: IToastContextProps = getContext('toastContext');


    export let data: IConference|undefined;

    if (!data?.slug) {
        throw Error("Can't edit conference data, missing slug for source conference in fetched data");
    }

    initStore({
        name: data?.title,
        startDate: data?.startDate,
        endDate: data?.endDate,
        selectedCategoryTags: data?.categoryTag || [],
        description: data?.description ? data.description[0].children[0].text : undefined,
        location: data?.location,
        callForPapersDate: data?.callForPapersDate,
        url: data?.url,
        image: data?.imageUrl ? urlFor(data.imageUrl).url() : ''

    });
    const submitEditedConference = getEditedConferenceSubmitter(toastContext, data.slug);
</script>



<Heading>Redigere konferanse</Heading>
<ConferenceEditor/>
<ButtonFooterRow submitText="Oppdater konferanse" submit={submitEditedConference} />

