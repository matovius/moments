import PocketBase from 'pocketbase';

// TODO: Change these environment variables to point to production variables
const pb = new PocketBase(import.meta.env.VITE_PB_LOCAL_URL);

export const checkIfLoggedIn = () => {
	return pb.authStore.isValid;
};

export async function initiateSignUp(email: string, password: string) {
	await pb.collection('users').authWithPassword(email, password);
}
export function logout() {
	pb.authStore.clear();
}
export function getPb() {
	return pb;
}
