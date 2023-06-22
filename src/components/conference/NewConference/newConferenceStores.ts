import { writable } from 'svelte/store';


export const name= writable('');
export const url= writable('');
export const location= writable('');
export const startDate = writable(null);
export const endDate = writable(null);
export const selectedCategoryTags = writable([]);



export const displayNewConferenceModal = writable(false);
export const pending = writable(false);
export const intervalWarning = writable(false);


export const initModal = () => {
    startDate.set(null);
    endDate.set(null);
    name.set('');
    url.set('');
    location.set('');
    selectedCategoryTags.set([]);

    displayNewConferenceModal.set(false);
    pending.set(false);
    intervalWarning.set(false);
}
