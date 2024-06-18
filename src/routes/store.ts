import { writable, type Writable } from 'svelte/store';
import { type Moment } from './types';
import { getMoments } from './localMoments';

export const AllMoments: Writable<Moment[]> = writable<Moment[]>(getMoments());
