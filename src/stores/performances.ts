import { browser } from '$app/environment';
import { writable } from 'svelte/store';

interface Performaces {
    [index: string]: boolean;
}

const defaultValue : Performaces = {};
const initialValue = browser
    ? JSON.parse(window.localStorage.getItem('performances') as string) as Performaces ?? defaultValue : defaultValue;

export const performances = writable<Performaces>(initialValue);

performances.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('performances', JSON.stringify(value) );
    }
});
