<svg class="spinner" width="22px" height="24px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" stroke="black" fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
</svg>

<style>
    .spinner {
        animation: rotator 1.4s linear infinite;
        position: absolute
    }

    @keyframes rotator {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .path {
        stroke-dasharray: 187;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: dash 1.4s ease-in-out infinite;
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: 187;
            transform:rotate(0deg);
        }
        50% {
            stroke-dashoffset: 47;
            transform:rotate(135deg);
        }
        100% {
            stroke-dashoffset: 187;
            transform:rotate(360deg);
        }
    }
</style>
