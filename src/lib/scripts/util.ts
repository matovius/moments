import { browser } from '$app/environment';

export function getLandingMessageInfo() {
	let info: boolean;
	const defaultInfo: boolean = false;

	if (browser) {
		const storedData: string | null = localStorage.getItem('userHasSeenLandingMessage');

		if (storedData !== null && storedData !== undefined) {
			if (storedData === 'false') {
				info = false;
				return info;
			} else {
				info = true;
				return info;
			}
		} else {
			localStorage.setItem('userHasSeenLandingMessage', `${defaultInfo}`);
			info = false;
			return info;
		}
	}
}
