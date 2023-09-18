import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {IPerformance} from "../../../../model/event";
import type {SubmissionType} from "../../../../enums/submission-type";



///////////////////////// First, the store for all currently viewed performances to a conference

export type NewPerformance = IPerformance & {
    date?: Date
}




export const createPerformancesStore = () => {
    const performances: Writable<NewPerformance[]> = writable([]);
    const { subscribe, set, update } = performances;

    return {
        subscribe,

        // Add a new performance or overwrite an existing one, by performanxce slug
        write: (newPerformance: NewPerformance): void => {
            update( (previousPerformances) => {
                const performance = normalizeStorePerformance(newPerformance);
                const newSlug = newPerformance.submission.slug;
                const nonMatching = previousPerformances.filter( p => p.submission.slug !== newSlug);
                if ( nonMatching.length === previousPerformances.length ) {
                    console.debug(`Adding a new performance with slug '${newSlug}' to the store`);
                    previousPerformances.push(performance);
                    return previousPerformances;
                } else {
                    console.debug(`Overwriting the performance with slug '${newSlug}' in the store`);
                    nonMatching.push(performance);
                    return nonMatching;
                }
            })
        },

        // Remove performance with matching performance slug
        remove: (slug:string): void => {
            update( previousPerformances => {
                const nonMatching = previousPerformances.filter( p => p.submission.slug !== slug);
                const removedCount = previousPerformances.length - nonMatching.length;
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

const normalizeStorePerformance = (p:NewPerformance): NewPerformance => {
    console.log(`Init performance from data:\n\ttitle: ${p.submission.title}\n\tdateAndTime: ${p.dateAndTime}`);
    if (!p.date) {
        p.date = new Date(p.dateAndTime);
        console.log(`\t--> date:    ${p.date}`);
    }
    return p;
}


///////////////////////// Second, the stores for individual values when creating or editing one performance in a conference

export const perfTitle: Writable<string> = writable('');
export const authorName: Writable<string> = writable('');
export const perfType: Writable<SubmissionType|undefined> = writable(undefined);
export const perfLocation: Writable<string> = writable('');
export const perfTime: Writable<Date|null> = writable( null);
export const perfDuration: Writable<number|null> = writable(null);
export const perfDescription: Writable<string> = writable('');


export const initPerformanceStore = (initValues?:NewPerformance):void => {
    perfTitle.set(initValues?.submission?.title ?? '');
    authorName.set(((initValues?.submission?.authors || [])[0] || {}).name);
    perfType.set(initValues?.submission?.submissionType);
	perfLocation.set(initValues?.location ?? '');
    perfTime.set(initValues?.date ?? null);
    perfDuration.set(initValues?.submission?.duration ?? null);
    perfDescription.set(((((initValues?.submission?.description || [])[0] || {}).children || [])[0] || {}).text ?? '');
};
