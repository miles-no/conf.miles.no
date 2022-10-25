import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { getStateAsObj, setStateInLocalStrage } from './localstorage_util';

interface Checkboxes {
    [index: string]: boolean;
}

const defaultValue : Checkboxes = {};
const initialValue = browser
    ? JSON.parse(window.localStorage.getItem('checkboxes') as string) as Checkboxes ?? defaultValue : defaultValue;

function createCheckboxStore () {
    const { subscribe, set, update } = writable<Checkboxes>(initialValue);

    return {
        subscribe,
        flip: (key: string) => {
            const checboxState: boolean = Boolean(getStateAsObj<Checkboxes>('checkboxes')?.[key]);
            update(() => setStateInLocalStrage<Checkboxes>('checkboxes', key, !checboxState));
        },
        set,
    }
}

export const checkboxStore = createCheckboxStore();
