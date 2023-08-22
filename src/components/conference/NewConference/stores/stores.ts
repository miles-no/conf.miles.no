import {writable} from 'svelte/store';
import {parseDateYYYYMMDD} from "../../../../utils/date-time-utils";
import {createPerformancesStore} from "./performancesStore";
import type {Writable} from 'svelte/store';
import type {NewConferenceStoreInitType} from "./performancesStore";


export const name: Writable<string> = writable('');
export const url: Writable<string> = writable('');
export const location: Writable<string> = writable('');
export const price: Writable<string> = writable('');
export const startDate: Writable<Date|null> = writable(null);
export const endDate: Writable<Date|null> = writable(null);
export const callForPapersDate: Writable<Date|null> = writable(null);
export const selectedCategoryTags: Writable<string[]> = writable([]);
export const description: Writable<string> = writable('');



export const displayModal = writable(false);
export const pending = writable(false);
export const intervalWarning = writable(false);

export const callForPapersWarning = writable(false)

export const performances = createPerformancesStore();




function getParsedDate(date?: Date | string) {
    if (!!date && typeof date === 'object' && typeof date.setMinutes === 'function') {
        return date;

    } else if (typeof date === 'string') {
        return parseDateYYYYMMDD(date);
    }

    return null;
}

export const initStore = (initValues?: NewConferenceStoreInitType) => {
    startDate.set(getParsedDate(initValues?.startDate));
    endDate.set(getParsedDate(initValues?.endDate));
    callForPapersDate.set(getParsedDate(initValues?.callForPapersDate));
    name.set(initValues?.name ?? '');
    url.set(initValues?.url ?? '');
    selectedCategoryTags.set(
        initValues?.selectedCategoryTags?.length
            ? initValues?.selectedCategoryTags
            : []
    );

    location.set(initValues?.location ?? '');
    price.set(initValues?.price ?? '');
    description.set(initValues?.description ?? '');

    displayModal.set(false);
    pending.set(false);
    intervalWarning.set(false);
    callForPapersWarning.set(false);
    performances.init(initValues?.performances)
}

