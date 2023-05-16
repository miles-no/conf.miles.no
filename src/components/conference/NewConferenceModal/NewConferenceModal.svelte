<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import IconButton from "@smui/icon-button";
    import Form from "./Form.svelte";
    import FooterButtons from "./FooterButtons.svelte";
    const dispatch = createEventDispatcher();

    function toggleModal() {
        dispatch("toggleNewConferenceModal");
    }
</script>


<div class="modal" transition:fade={{duration:100}} >
    <div class="modal-box">
        <IconButton on:click={toggleModal} class="modal-button material-icons">close</IconButton>
        <h2>Registrer en ny konferanse</h2>
        <Form />
        <FooterButtons />
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
    :global(.modal-button.material-icons) {
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

</style>

<!-- Close the modal when clicking the background?
Add to the .modal div:
   on:click={toggleModal}
And decorate the cursor in CSS? Eg.:
    cursor: s-resize
-->
