<script lang="ts">
    import {onMount} from "svelte";
    import Form from "../../../components/conference/NewConference/Page/Form.svelte";


    import {
        endDate,
        name,
        selectedCategoryTags,
        startDate,
        url,
        initStore,
        description,
        location
    } from "../../../components/conference/NewConference/stores";
    import type {NewConferenceStoreInitType} from "../../../components/conference/NewConference/stores";
    import ButtonFooterRow from "../../../components/conference/NewConference/Page/ButtonFooterRow.svelte";
    import Preview from "../../../components/conference/NewConference/Page/Preview.svelte";
    import type {IPreviewConference} from "../../../components/conference/NewConference/Page/IPreviewConference";

    function getUrlParamNew() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams && urlParams.has('new')) {
                return urlParams.get('new') || true;
            }
        } catch (e) {
            console.warn("Error trying to get url parameter '?new=...'");
        }
    };

    function getTransferredData(): NewConferenceStoreInitType {
        let transferredData: NewConferenceStoreInitType;
        const newconfkey = getUrlParamNew();
        try {
            if (typeof sessionStorage !== 'undefined') {

                if (newconfkey) {
                    const sessionStorageKey = `newconf_${newconfkey}`;
                    transferredData = JSON.parse(sessionStorage.getItem(sessionStorageKey));
                    sessionStorage.removeItem(sessionStorageKey);
                }
            }

        } catch (e) {
            console.error(e);
            console.log("Transferred data:", transferredData);
        }

        // If nothing was picked up from session store, but there was a "new" parameter, see if anything exists in the store
        if ((!transferredData || !Object.keys(transferredData).length) && newconfkey) {
            transferredData = {
                name: $name ?? undefined,
                url: $url ?? undefined,
                startDate: $startDate ?? undefined,
                endDate: $endDate ?? undefined,
                selectedCategoryTags: $selectedCategoryTags ?? []
            }
        }

        return transferredData;
    }


    onMount(() => {
        const transferredData = getTransferredData();
        initStore(transferredData);
    });

    let conference: IPreviewConference = {
        title: $name,
        startDate: $startDate?.toDateString(),
        endDate: $endDate?.toDateString(),
        categoryTag: $selectedCategoryTags,
        description: $description,
        location: $location,
        url: $url
    };
    $: {
        conference.title = $name;
        conference.startDate = $startDate?.toDateString();
        conference.endDate = $endDate?.toDateString();
        conference.categoryTag = $selectedCategoryTags;
        conference.description = $description;
        conference.location = $location;
        conference.url = $url;
    }
</script>

<h1>Registrer en ny konferanse</h1>
<div class="edit-and-preview-row">
    <Form />
    <Preview {conference} />
</div>
<ButtonFooterRow />

<style>
  h1 {
    font-family: var(--mdc-typography-headline1-font-family, var(--mdc-typography-font-family, Inter, Roboto, sans-serif)); ;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 40px;
  }

  .edit-and-preview-row {
      display: flex;
      flex-flow: row;
      align-items: center;
  }
</style>
