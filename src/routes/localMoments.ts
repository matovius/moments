import { browser } from '$app/environment';
import type { Moment } from './types';

export function getMoments(): Moment[] {
	let allMoments: Moment[] = [];

	if (browser) {
		let storedData: string | null = localStorage.getItem('allMoments');

		if (storedData !== null && storedData !== undefined) {
			allMoments = JSON.parse(storedData);
		} else {
			localStorage.setItem('allMoments', JSON.stringify([]));

			storedData = localStorage.getItem('allMoments');
			// @ts-expect-error Argument of type 'string | null' is not assignable to parameter of type 'string'
			allMoments = JSON.parse(storedData);
		}
	}

	return allMoments;
}

export function setMoments(value: Moment[]) {
	if (browser) {
		const data: string = JSON.stringify(value);
		localStorage.setItem('all-moments', data);
	}
}
