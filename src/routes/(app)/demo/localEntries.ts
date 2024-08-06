import { browser } from '$app/environment';
import type { Entry } from '../types';

export function getEntries(): Entry[] {
	let allEntries: Entry[] = [];

	if (browser) {
		let storedData: string | null = localStorage.getItem('allEntries');

		if (storedData !== null && storedData !== undefined) {
			allEntries = JSON.parse(storedData);
		} else {
			localStorage.setItem('allEntries', JSON.stringify([]));

			storedData = localStorage.getItem('allEntries');
			// @ts-expect-error Argument of type 'string | null' is not assignable to parameter of type 'string'
			allEntries = JSON.parse(storedData);
		}
	}

	return allEntries;
}

export function setEntries(value: Entry[]) {
	if (browser) {
		const data: string = JSON.stringify(value);
		localStorage.setItem('allEntries', data);
	}
}
