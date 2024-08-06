import { error, json, type RequestEvent } from '@sveltejs/kit';
import { getPb, initiateSignUp } from '$lib/pocketbase/pb-utils';
import type Client from 'pocketbase';

const pb: Client = getPb();

export async function GET(event: RequestEvent) {
}

export async function POST(event: RequestEvent) {
	const { email, password } = await event.request.json();
	const addedUser = await initiateSignUp(email, password);

	return json(addedUser);
}
