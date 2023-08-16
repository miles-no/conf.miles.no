<script lang="ts">
    import type { IConference } from '../../../../model/conference';
    import {initStore} from "../../../../components/conference/NewConference/stores";
    import ConferenceEditor from "../../../../components/conference/NewConference/Page/ConferenceEditor.svelte";
    import {submitEditedConference} from "../../../../components/conference/NewConference/submit";

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


<h1>Redigere konferanse</h1>
<ConferenceEditor submitText="Oppdater konferanse" submit={submitEditedConference} />

<style lang="scss">
  h1 {
    font-family: var(--mdc-typography-headline1-font-family, var(--mdc-typography-font-family, Inter, Roboto, sans-serif)); ;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 40px;
  }
</style>
