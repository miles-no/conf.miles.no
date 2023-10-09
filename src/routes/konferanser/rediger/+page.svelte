<script lang="ts">
	import {
		displayModal,
		initStore,
	} from "../../../components/conference/NewConference/stores/stores";
    import type {NewConferenceStoreInitType} from "../../../components/conference/NewConference/stores/stores";
    import {getNewConferenceSubmitter} from "../../../components/conference/NewConference/submit";
    import ConferenceEditor from "../../../components/conference/NewConference/Page/ConferenceEditor.svelte";
    import ButtonFooterRow from "../../../components/conference/NewConference/Page/ButtonFooterRow.svelte";
    import Heading from "../../../components/conference/NewConference/Heading.svelte";

    import {getContext, setContext} from "svelte";
    import type {IToastContextProps} from "../../../components/toast/toast-context";
	import NewPerformanceModal
		from "../../../components/conference/NewConference/Page/PerformanceModal/NewPerformanceModal.svelte";
	import {makeid} from "../../../utils/conference-utils";
	import {getMinimalPortableText} from "../../../utils/sanityclient-utils";
    const toastContext: IToastContextProps = getContext('toastContext');

	export let data;

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
			/** For faster testing, prefill some semi-random data by setting "?new=test" : */
			if ("test" === newconfkey) {
				transferredData = {
					name: "Test: " + Math.floor(Math.random()*100000),
                    url: "miles.no",
                    selectedCategoryTags: ['Admin', 'AI'],
					startDate: new Date(),
					endDate: new Date(),
					callForPapersDate: new Date(),
                    description: "Description randomness: \n\n" + Array.from(
						{length: 80 + Math.floor(Math.random()*Math.random()*Math.random()*Math.random()*Math.random()*2000)},
                        () => 1 + Math.floor(Math.random() * Math.random() * Math.random() * 30)
                    )
                        .map(length => makeid(length).toLowerCase())
                        .join(" ")
                    ,
                    location: "Oslo",
                    performances: [{
					    dateAndTime: (new Date().getFullYear() + 1) + "-01-01T15:15:00.000Z",
                        location: "Rom 42",
                        submission: {
							title: "Test-bidrag: " + Math.floor(Math.random()*10000),
                            description: getMinimalPortableText("Bidragbeskrivelse: " + Math.random()*1000000),
                            authors: [{
	                            name: data.user.name,
	                            email: data.user.email
                            }],
                            duration: 60,
                            submissionType: "presentation"
                        }
                    }]
                }

            } else if ('undefined' !== typeof sessionStorage) {

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

    setContext('usersByOffice', data.usersByOffice);
</script>



<Heading>Registrer en ny konferanse</Heading>
<ConferenceEditor />
<ButtonFooterRow submitText="Registrer konferanse" submit={submitNewConference} />
{#if $displayModal}
    <NewPerformanceModal />
{/if}
