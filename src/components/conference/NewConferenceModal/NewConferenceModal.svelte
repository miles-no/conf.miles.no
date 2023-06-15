<script>
    import {onMount} from 'svelte';
    import { fade } from 'svelte/transition';
    import IconButton from "@smui/icon-button";
    import Form from "./Form.svelte";
    import {displayNewConferenceModal, pending} from "./newConferenceStores.ts";


    function closeModal() {
        displayNewConferenceModal.set(false);
    }

    const formId = "newConferenceForm";
    const closeButtonId="newConferenceCloseButton"

    // Hack: https://stackoverflow.com/questions/45018047/prevent-background-items-from-receiving-focus-while-modal-overlay-is-covering-th
    function createTabCycle (first, last) {
        first.addEventListener('keydown', function(e) {
            if (e.key==='Tab' && e.shiftKey) {
                last.focus();
                e.preventDefault();
            }});
        last.addEventListener('keydown', function(e){
            if (e.key==='Tab' && !e.shiftKey) {
                first.focus();
                e.preventDefault();
            }});
    }
    function closeOnEsc(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    let firstElement, lastElement;

    onMount(() => {
        firstElement = document.querySelector("#"+formId+" .labeled-field .textfield input");
        lastElement = document.getElementById(closeButtonId);
        createTabCycle(firstElement, lastElement);
        firstElement.focus();
    })
</script>


<div
        class="modal"
        transition:fade={{duration:100}}
        role="dialog"
        aria-modal="true"
        on:keydown={closeOnEsc}
>
    <div class="modal-box">
        <h2>Registrer en ny konferanse</h2>

        <Form formId={formId} />

        <IconButton
                disabled={$pending}
                id={closeButtonId}
                on:click={closeModal}
                tabIndex="0"
                class="modal-button material-icons"
        >
            close
        </IconButton>
    </div>
</div>




<style>
    .modal {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,.5);
    }
    .modal-box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 34px;
        gap: 26px;
        isolation: isolate;

        width: 100vw;
        max-width: 616px;

        background: #FFFFFF;
        border-radius: 7px;
        position: relative;
    }
    /* FIXME: Global = bad, but how to do this better? */
    .modal-box :global(.modal-button.material-icons) {
        position: absolute;
        top: 27px;
        right: 18px;
        /*background-color: transparent;
        border: none;
        display: flex;
        padding: 4px;
        border-radius: 21px;*/
    }

    .modal-box h2 {
        font-family: var(--mdc-typography-headline1-font-family, var(--mdc-typography-font-family, Inter, Roboto, sans-serif)); ;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
    }

    .modal-box :global(.mdc-icon-button:active .mdc-icon-button__ripple::before),
    .modal-box :global(.mdc-icon-button:focus .mdc-icon-button__ripple::before) {
        background-color: black;
        opacity: 0.07;
    }
</style>
