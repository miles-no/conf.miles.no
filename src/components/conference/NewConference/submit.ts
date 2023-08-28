import { get } from 'svelte/store';

import {name, url, location, startDate, endDate, callForPapersDate, description, selectedCategoryTags, image} from "./stores/stores";
import {formatDateYYYYMMDD} from "../../../utils/date-time-utils";
import {getMinimalPortableText} from "../../../utils/sanityclient-utils";
import {submitEditedConferenceAndHandleModal, submitNewConferenceAndHandleModal} from "./submitHandler";
import type {ISubmitData} from "./submitHandler";
import type {IToastContextProps} from "../../toast/toast-context";

function getSubmitData(slug?: string): ISubmitData {
    const descr = get(description);
    const submitData: ISubmitData = {
        title: get(name),
        url: get(url),
        location: get(location),
        startDate: formatDateYYYYMMDD(get(startDate)) as string,
        endDate: formatDateYYYYMMDD(get(endDate)) as string,
        callForPapersDate: formatDateYYYYMMDD(get(callForPapersDate)),
        categoryTag: get(selectedCategoryTags),
        description: descr ? getMinimalPortableText(descr) : undefined,
        image: get(image)
    };
    if (slug) {
        submitData.slug = slug
    }
    return submitData;
}
export function getNewConferenceSubmitter(toastContext:IToastContextProps): ()=>void {
    return ()=> {
        const submitData = getSubmitData();
        submitNewConferenceAndHandleModal(submitData, toastContext);
    }
}


export function getEditedConferenceSubmitter(toastContext:IToastContextProps, slug:string): ()=>void {
    return () => {
        const submitData = getSubmitData(slug);
        submitEditedConferenceAndHandleModal(submitData, toastContext);
    }
}
