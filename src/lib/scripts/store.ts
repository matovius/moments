import { writable, type Writable } from 'svelte/store';
import { type Entry } from './types';
import { getEntries } from './localEntries';
import { getLandingMessageInfo } from './util';

export const AllEntries: Writable<Entry[]> = writable<Entry[]>(getEntries());
export const HeaderHeight: Writable<number> = writable<number>(0);
export const UserHasSeenLandingMessage: Writable<boolean> =
	writable<boolean>(getLandingMessageInfo());
