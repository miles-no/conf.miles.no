import { writable } from 'svelte/store';

export const startDate = writable(null);
export const endDate = writable(null);

export const selectedCategoryTags = writable([]);

export const name= writable('');
export const url= writable('');


export const intervalWarning = writable(false);
