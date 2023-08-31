<script lang="ts">
    import {
        initStore,
    } from "../../../components/conference/NewConference/stores/stores";
    import type {NewConferenceStoreInitType} from "../../../components/conference/NewConference/stores/stores";
    import {getNewConferenceSubmitter} from "../../../components/conference/NewConference/submit";
    import ConferenceEditor from "../../../components/conference/NewConference/Page/ConferenceEditor.svelte";
    import ButtonFooterRow from "../../../components/conference/NewConference/Page/ButtonFooterRow.svelte";
    import Heading from "../../../components/conference/NewConference/Heading.svelte";

    import {getContext, setContext} from "svelte";
    import type {IToastContextProps} from "../../../components/toast/toast-context";
    const toastContext: IToastContextProps = getContext('toastContext');

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
                selectedCategoryTags: []
            }
        }

        return transferredData;
    }

    const transferredData = getTransferredData();
    initStore(transferredData);

    const submitNewConference = getNewConferenceSubmitter(toastContext);

    export let data;
    setContext('usersByOffice', data.usersByOffice);
</script>



<Heading>Registrer en ny konferanse</Heading>
<ConferenceEditor />
<ButtonFooterRow submitText="Registrer konferanse" submit={submitNewConference} />

