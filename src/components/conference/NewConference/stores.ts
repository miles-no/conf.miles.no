import type {Writable} from 'svelte/store';
import {writable} from 'svelte/store';
import {parseDateYYYYMMDD} from "../../../utils/date-time-utils";
import type {IPerformance} from "../../../model/event";


export const name: Writable<string> = writable('');
export const url: Writable<string> = writable('');
export const location: Writable<string> = writable('');
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

const normalizeStorePerformance = (p:NewPerformance): NewPerformance => {
    console.log(`Init performance from data:\n\ttitle: ${p.submission.title}\n\tdateAndTime: ${p.dateAndTime}`);
    if (!p.date) {
        p.date = new Date(p.dateAndTime);
        console.log(`\t--> date:    ${p.date}`);
    }
    return p;
}

const createPerformancesStore = () => {
    const performances: Writable<NewPerformance[]> = writable([]);
    const { subscribe, set, update } = performances;

    return {
        subscribe,

        // Add a new performance or overwrite an existing one, by performanxce slug
        write: (newPerformance: NewPerformance): void => {
            update( (performances) => {
                const performance = normalizeStorePerformance(newPerformance);
                const newSlug = newPerformance.submission.slug;
                const nonMatching = performances.filter( p => p.submission.slug !== newSlug);
                if ( nonMatching.length === performances.length ) {
                    console.debug(`Adding a new performance with slug '${newSlug}' to the store`);
                    performances.push(performance);
                    return performances;
                } else {
                    console.debug(`Overwriting the performance with slug '${newSlug}' in the store`);
                    nonMatching.push(performance);
                    return nonMatching;
                }
            })
        },

        // Remove performance with matching performance slug
        remove: (slug:string): void => {
            update( performances => {
                const nonMatching = performances.filter( p => p.submission.slug !== slug);
                const removedCount = performances.length - nonMatching.length;
                console.log(`Removed from the store: ${removedCount} performance(s) matching the target slug '${slug}'`);
                return nonMatching;
            });
        },

        // Reset/wipe the performance store, may or may not supply the initialization state
        init: (newPerformances?: NewPerformance[]): void => {
            if (!newPerformances || !newPerformances.length) {
                console.debug("Initializing a new empty performance store.");
                set([]);

            } else {
                set(newPerformances.map(normalizeStorePerformance));
            }
        }
    }
}
export const performances = createPerformancesStore();


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
    performances?: NewPerformance[],
}

export type NewPerformance = IPerformance & {
    date?: Date
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

    location.set(initValues?.location ?? '');
    price.set(initValues?.price ?? '');
    description.set(initValues?.description ?? '');

    displayNewConferenceModal.set(false);
    pending.set(false);
    intervalWarning.set(false);
    callForPapersWarning.set(false);
    performances.init(initValues?.performances)
}

