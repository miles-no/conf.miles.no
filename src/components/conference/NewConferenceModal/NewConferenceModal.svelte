<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import IconButton from "./IconButton.svelte";
    const dispatch = createEventDispatcher();

    function toggleModal() {
        dispatch("toggleNewConferenceModal");
    }
</script>


<div class="modal" transition:fade={{duration:100}} >
    <div class="modal-box">
        <IconButton onClick={toggleModal}>close</IconButton>
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
        align-items: flex-end;
        padding: 25px 34px 81px;
        gap: 26px;
        isolation: isolate;

        width: 100vw;
        height: 100vh;
        max-width: 616px;
        max-height: 514px;

        background: #FFFFFF;
        border-radius: 7px;
        position: relative;
    }

</style>

<!-- Close the modal when clicking the background?
Add to the .modal div:
   on:click={toggleModal}
And decorate the cursor in CSS? Eg.:
    cursor: s-resize
-->
