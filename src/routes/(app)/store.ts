import { writable, type Writable } from 'svelte/store';
import { type Entry } from './types';
import { getEntries } from './demo/localEntries';

export const AllEntries: Writable<Entry[]> = writable<Entry[]>(getEntries());
export const HeaderHeight: Writable<number> = writable<number>(0);
