import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { getStateAsObj, setStateInLocalStrage } from './localstorage_util';

interface Accordions {
    [index: string]: boolean;
}

const defaultValue : Accordions = {};
const initialValue = browser
    ? JSON.parse(window.localStorage.getItem('accordions') as string) as Accordions ?? defaultValue 
    : defaultValue;

function createAccordionStore () {
    const { subscribe, set, update } = writable<Accordions>(initialValue);

    return {
        subscribe,
        flip: (key: string) => {
            const accordionState: boolean = Boolean(getStateAsObj<Accordions>('accordions')?.[key]);
            update(() => setStateInLocalStrage<Accordions>('accordions', key, !accordionState));
        },
        set,
    }
}

export const accordionStore = createAccordionStore();
