import {get, writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {IDescription} from "../../../../model/event";
import type {SubmissionType} from "../../../../enums/submission-type";
import {invalidFields} from "./performanceValidation";



///////////////////////// First, the store for all currently viewed performances to a conference

type Author = {
	name: string,
	email: string
}

export type NewPerformance = {
	date?: Date | null;
	dateAndTime: string | undefined;
	location: string;
	submission: {
		duration: number | null;
		submissionType: SubmissionType | undefined;
		description: IDescription[] | undefined;
		title: string;
		authors: Author[]
		slug?: string,
	};
	_key?: string,
	_type?: string;
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
				if (newPerformance.submission.slug) {
					const newSlug = newPerformance.submission.slug;
					const nonMatching = previousPerformances.filter(p => p.submission.slug !== newSlug);
					if (nonMatching.length !== previousPerformances.length) {
						console.log(`Overwriting the performance with slug '${newSlug}' in the store:`, performance);
						nonMatching.push(performance);
						return nonMatching;
					}
				}
	            console.debug('Adding a new performance to the store:', performance);
	            previousPerformances.push(performance);
	            return previousPerformances;
			})
        },

        // Remove performance with matching performance slug
        remove: (slug:string): void => {
            update( previousPerformances => {
                const nonMatching = previousPerformances.filter( p => p.submission.slug !== slug);
                const removedCount = previousPerformances.length - nonMatching.length;
                console.debug(`Removed from the store: ${removedCount} performance(s) matching the target slug '${slug}'`);
                return nonMatching;
            });
        },

        // Reset/wipe the performance store, may or may not supply the initialization state
        init: (newPerformances?: NewPerformance[]): void => {
            if (!newPerformances || !newPerformances.length) {
                console.debug("Initializing a new empty performance store.");
                set([]);

            } else {
				console.debug("Inserting newPerformances...", newPerformances);
                set(newPerformances.map(normalizeStorePerformance));
            }
        }
    }
}

const normalizeStorePerformance = (performance:NewPerformance): NewPerformance => {
    if (!performance.date && performance.dateAndTime) {
        performance.date = new Date(performance.dateAndTime);
    }
    return performance;
}


///////////////////////// Second, the stores for individual values when creating or editing one performance in a conference

export const perfTitle: Writable<string> = writable('');
export const authorName: Writable<string> = writable('');
export const authorEmail: Writable<string> = writable('');
export const perfType: Writable<SubmissionType|undefined> = writable(undefined);
export const perfLocation: Writable<string> = writable('');
export const perfTime: Writable<Date|null> = writable( null);
export const perfDuration: Writable<number|null> = writable(null);
export const perfDescription: Writable<string> = writable('');

export const _key: Writable<string|undefined> = writable();

export const perfTimeIsSet: Writable<boolean> = writable(false);



export const initPerformanceStore = (initValues?:NewPerformance):void => {
	const submission = initValues?.submission;
	perfTitle.set(submission?.title ?? '');
	authorName.set(((submission?.authors || [])[0] || {}).name);
	authorEmail.set(((submission?.authors || [])[0] || {}).email);
	perfType.set(submission?.submissionType);
	perfLocation.set(initValues?.location ?? '');
	perfTime.set(initValues?.date ?? null);
	perfDuration.set(submission?.duration ?? null);
	perfDescription.set(((((submission?.description || [])[0] || {}).children || [])[0] || {}).text ?? '');
	_key.set(initValues?._key ?? undefined);

	// TODO: true if some dateAndTime condition confirms incoming performance time is set?
	perfTimeIsSet.set(false);

	invalidFields.set([]);
};
