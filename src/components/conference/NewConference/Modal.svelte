<script>
    import {onMount} from 'svelte';
    import { fade } from 'svelte/transition';
    import IconButton from "@smui/icon-button";
    import {displayModal, pending} from "./stores/stores";
    import darkTheme from "../../../stores/theme-store";
    import {makeid} from "../../../utils/conference-utils";

    function closeModal() {
        displayModal.set(false);
    }

    const modalId = "modal-"+makeid(4);
    const closeButtonId="newConferenceCloseButton"

    function closeOnEsc(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    let firstElement, lastElement;
    export let heading;


    // Hack: https://stackoverflow.com/questions/45018047/prevent-background-items-from-receiving-focus-while-modal-overlay-is-covering-th
    function createTabCycle(first, last) {
        if (last) {
            last.addEventListener('keydown', function (e) {
                if (e.key === 'Tab' && !e.shiftKey) {
                    first.focus();
                    e.preventDefault();
                }
            });
        }
        if (first) {
            first.addEventListener('keydown', function (e) {
                if (e.key === 'Tab' && e.shiftKey) {
                    last.focus();
                    e.preventDefault();
                }
            });

            first.focus();
        }
    }


    onMount(() => {
        firstElement = document.querySelector("#" + modalId + " .labeled-field .textfield input");
        lastElement = document.getElementById(closeButtonId);
        createTabCycle(firstElement, lastElement);
    })
</script>

<div
        class="modal"
        class:dark-mode={$darkTheme}
        transition:fade={{duration:100}}
        role="dialog"
        aria-modal="true"
        on:keydown={closeOnEsc}
>
    <div id={modalId} class="modal-box">
        <h2>{heading}</h2>
        <slot />

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




<style lang="scss">
  /* FIXME: :global = bad, and not really using themes/variables. */

    .modal {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,.5); /* TODO: Should be theme variable */
    }
    .dark-mode.modal {
        background-color: rgba(255,255,255,.5); /* TODO: Should be theme variable */
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

        border-radius: 7px;
        position: relative;

        /* TODO: Should be theme variables: */
        background: #fff;
        color: #000;

        h2 {
            font-family: var(--mdc-typography-headline1-font-family, var(--mdc-typography-font-family, Inter, Roboto, sans-serif)); ;
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 29px;
        }

        :global(.modal-button.material-icons) {
            position: absolute;
            top: 27px;
            right: 18px;
        }

        :global(.mdc-icon-button:hover .mdc-icon-button__ripple::before),
        :global(.mdc-icon-button:active .mdc-icon-button__ripple::before),
        :global(.mdc-icon-button:focus .mdc-icon-button__ripple::before) {
            /* TODO: Should be theme variable: */
            background-color: black;
            opacity: 0.1;
        }
    }

    .dark-mode .modal-box {
        /* TODO: Should be theme variables: */
        background: #212121;
        color: #fff;

        :global(.mdc-icon-button:hover .mdc-icon-button__ripple::before),
        :global(.mdc-icon-button:active .mdc-icon-button__ripple::before),
        :global(.mdc-icon-button:focus .mdc-icon-button__ripple::before) {
        /* TODO: Should be theme variable: */
            background-color: white;
        }

        :global(input) {
            background-color: transparent;
            border-color: rgba(255, 255, 255, 0.38);
            color: white;
        }
    }

</style>
