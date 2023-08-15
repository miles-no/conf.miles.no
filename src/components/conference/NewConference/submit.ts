import { get } from 'svelte/store';

import {callForPapersDate, description, endDate, location, name, selectedCategoryTags, startDate, url} from "./stores";
import {formatDateYYYYMMDD} from "../../../utils/date-time-utils";
import {getMinimalPortableText} from "../../../utils/sanityclient-utils";
import {submitAndHandleModal} from "./submitHandler";

export function submit(toastContext) {
    const descr = get(description);
    const submitData = {
        title: get(name),
        url: get(url),
        location: get(location),
        startDate: formatDateYYYYMMDD(get(startDate)),
        endDate: formatDateYYYYMMDD(get(endDate)),
        callForPapersDate: formatDateYYYYMMDD(get(callForPapersDate)),
        categoryTag: get(selectedCategoryTags),
        description: descr ? getMinimalPortableText(descr) : undefined
    };

    submitAndHandleModal(submitData, toastContext);
}

