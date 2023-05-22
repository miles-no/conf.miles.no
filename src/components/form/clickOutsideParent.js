import { isChildOfElement } from "./isChildOfElement.js";


export function getClickOutsideParentElementFunc(targetParentClass, customEvent="clickOutsideParent") {

    return function clickOutsideDatepicker(node) {
        const outsideDatepickerClick = (event) => {
            const clickIsInsideDatepicker = isChildOfElement(targetParentClass, event.target);
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
