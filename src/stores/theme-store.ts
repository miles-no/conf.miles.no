import { writable } from 'svelte/store';

type Theme = boolean | undefined;

const darkTheme = writable<Theme>(undefined);

export default darkTheme;
