import {type Writable, writable} from 'svelte/store';
import {parseDateYYYYMMDD} from "../../../utils/date-time-utils";


export const name: Writable<string> = writable('');
export const url: Writable<string> = writable('');
export const location: Writable<string> = writable('');
export const image: Writable<string> = writable('');
export const price: Writable<string> = writable('');
export const startDate: Writable<Date|null> = writable(null);
export const endDate: Writable<Date|null> = writable(null);
export const callForPapersDate: Writable<Date|null> = writable(null);
export const selectedCategoryTags: Writable<string[]> = writable([]);
export const description: Writable<string> = writable('');



export const displayNewConferenceModal = writable(false);
export const pending = writable(false);
export const intervalWarning = writable(false);

export const callForPapersWarning = writable(false)






export type NewConferenceStoreInitType = {
    startDate?: Date | string,
    endDate?: Date | string,
    callForPapersDate?: Date | string,
    name?: string,
    url?: string,
    selectedCategoryTags?: string[],
    location?: string,
    price?: string,
    description?: string,
    image?: string
}

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

    image.set(initValues?.image ?? '');
    location.set(initValues?.location ?? '');
    price.set(initValues?.price ?? '');
    description.set(initValues?.description ?? '');

    displayNewConferenceModal.set(false);
    pending.set(false);
    intervalWarning.set(false);
    callForPapersWarning.set(false);
}

