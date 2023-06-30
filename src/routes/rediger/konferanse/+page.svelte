<script lang="ts">
    import {onMount} from "svelte";
    import Form from "../../../components/conference/NewConference/Page/Form.svelte";


    import {endDate, name, selectedCategoryTags, startDate, url, initStore} from "../../../components/conference/NewConference/stores";
    import type {NewConferenceStoreInitType} from "../../../components/conference/NewConference/stores";

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
</script>

<div class="edit-conf-main">
    <h1>Registrer en ny konferanse</h1>

    <Form />
</div>

<style>
  .edit-conf-main h1 {
    font-family: var(--mdc-typography-headline1-font-family, var(--mdc-typography-font-family, Inter, Roboto, sans-serif)); ;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
  }
</style>
