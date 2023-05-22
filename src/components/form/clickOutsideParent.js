function isChildOf(targetParentClass, element) {
    if (element.classList.contains(targetParentClass)) {
        return true;
    }
    return (element.parentElement)
        ? isChildOf(targetParentClass, element.parentElement)
        : false;
}

export function getClickOutsideParentElementFunc(targetParentClass, customEvent="clickOutsideParent") {

    return function clickOutsideDatepicker(node) {
        const outsideDatepickerClick = (event) => {
            const clickIsInsideDatepicker = isChildOf(targetParentClass, event.target);
            if (!clickIsInsideDatepicker) {
                node.dispatchEvent(new CustomEvent(customEvent));
            }
        };

        document.addEventListener("click", outsideDatepickerClick, true);

        // Returns an action object with a destroy function that's called when the element is unmounted.
        return {
            destroy() {
                document.removeEventListener("click", outsideDatepickerClick, true);
            },
        };
    }
}
