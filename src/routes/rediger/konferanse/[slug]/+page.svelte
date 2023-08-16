<script lang="ts">
    import type { IConference } from '../../../../model/conference';
    import {initStore} from "../../../../components/conference/NewConference/stores";
    import ConferenceEditor from "../../../../components/conference/NewConference/Page/ConferenceEditor.svelte";
    import {submitEditedConference} from "../../../../components/conference/NewConference/submit";
    import ButtonFooterRow from "../../../../components/conference/NewConference/Page/ButtonFooterRow.svelte";
    import Heading from "../../../../components/conference/NewConference/Heading.svelte";

    export let data: IConference|undefined;

    initStore({
        name: data?.title,
        startDate: data?.startDate,
        endDate: data?.endDate,
        selectedCategoryTags: data?.categoryTag || [],
        description: data?.description ? data.description[0].children[0].text : undefined,
        location: data?.location,
        callForPapersDate: data?.callForPapersDate,
        url: data?.url
    });
</script>



<Heading>Redigere konferanse</Heading>
<ConferenceEditor/>
<ButtonFooterRow submitText="Oppdater konferanse" submit={submitEditedConference} />

