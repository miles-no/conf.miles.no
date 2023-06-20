<script>
    import {Icon} from "@smui/common";

    export let onClick;
</script>

<button class="icon-btn" on:click={onClick}>
    <Icon class="material-icons"><slot/></Icon>
</button>

<style>
    .icon-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background-color: transparent;
        border: none;
        display: flex;
        padding: 4px;
        border-radius: 21px;
    }
    .icon-btn:hover, .icon-btn:focus {
        background-color: #eee;
    }
    .icon-btn :global(.material-icons) {
        font-size: 36px;
        margin: auto;
    }
</style>
