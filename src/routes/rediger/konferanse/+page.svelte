<script lang="ts">
    import {onMount} from "svelte";

    import {
        endDate,
        name,
        selectedCategoryTags,
        startDate,
        url,
        initStore,
        location,
        description,
        callForPapersDate
    } from "../../../components/conference/NewConference/stores";
    import type {NewConferenceStoreInitType} from "../../../components/conference/NewConference/stores";
    import {submitNewConference} from "../../../components/conference/NewConference/submit";
    import ConferenceEditor from "../../../components/conference/NewConference/Page/ConferenceEditor.svelte";

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

        if ((!transferredData || !Object.keys(transferredData).length)) {
            transferredData = {
                selectedCategoryTags: $selectedCategoryTags ?? []
            }
        }

        return transferredData;
    }

    const transferredData = getTransferredData();
    initStore(transferredData);
</script>

<h1>Registrer en ny konferanse</h1>
<ConferenceEditor submitText="Registrer konferanse" submit={submitNewConference} />
