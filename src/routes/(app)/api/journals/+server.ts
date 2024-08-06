import { json } from '@sveltejs/kit';
import { getPb, initiateSignUp } from '$lib/pocketbase/pb-utils';
import type Client from 'pocketbase';

const pb: Client = getPb();

export async function GET(event) {}

export async function POST(event) {
	const { email, password } = await event.request.json();
	const addedUser = await initiateSignUp(email, password);

	return json(addedUser);
}
