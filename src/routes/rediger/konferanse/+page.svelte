<script>
    import {onMount} from "svelte";
    import {
        name,
        url,
        startDate,
        endDate,
        selectedCategoryTags, initModal
    } from "../../../components/conference/NewConference/newConferenceStores";
    import {formatDateYYYYMMDD} from "../../../utils/date-time-utils";

    
    let filledData;

    function getUrlParamNew() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams && urlParams.has('new')) {
                return urlParams.get('new');
            }
        } catch (e) {
            console.warn("Error trying to get url parameter '?new=...'");
        }
    };

    function getTransferredData() {
        let transferredData;
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
        }

        if (!transferredData) {
            try {
                if (!newconfkey) {
                    // console.log("No transferred data. Init store.");
                    initModal();
                } else {
                    // console.log("Couldn't get data from sessionStorage. Trying store.");
                }

                transferredData = {
                    title: $name || '',
                    url: $url || '',
                    startDate: $startDate ? formatDateYYYYMMDD($startDate) : null,
                    endDate: $endDate ? formatDateYYYYMMDD($endDate) : null,
                    categoryTag: $selectedCategoryTags || []
                };

            } catch (e) {
                console.error(e);
            }
        }

        return transferredData;
    }

    onMount(() => {
        filledData = getTransferredData();
        // console.log("FilledData:", filledData);
    });
</script>

<div class="edit-conf-main">
    <h1>Registrer en ny konferanse</h1>

    <pre>filledData: {JSON.stringify(filledData, null, 4)}</pre>
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
