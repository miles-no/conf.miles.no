export function isChildOfElement(targetParentClass, element) {
    if (element.classList.contains(targetParentClass)) {
        return true;
    }
    return (element.parentElement)
        ? isChildOfElement(targetParentClass, element.parentElement)
        : false;
}
