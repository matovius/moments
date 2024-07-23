import { writable, type Writable } from 'svelte/store';
import { type Moment } from './types';
import { getMoments } from './demo/localMoments';

export const AllMoments: Writable<Moment[]> = writable<Moment[]>(getMoments());
export const HeaderHeight: Writable<number> = writable<number>(0);
