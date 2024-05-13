import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';
import type { Theme } from '$lib/scripts/types';

export const theme: Writable<Theme> = writable<Theme>(getTheme('theme'));

function getTheme(key: string): Theme | undefined {
	if (browser) {
		const DefaultValue: Theme = 'system';
		const storedData: string | null = localStorage.getItem(key);

		if (storedData !== null && storedData !== undefined) {
			return storedData;
		}

		setTheme(key, DefaultValue);
	}
}

function setTheme(key: string, value: Theme) {
	if (browser) {
		localStorage.setItem(key, value);
	}
}

theme.subscribe((currentTheme: Theme) => {
	localStorage.setItem('theme', currentTheme);
});
