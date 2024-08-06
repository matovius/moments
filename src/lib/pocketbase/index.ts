import PocketBase from 'pocketbase';

// TODO: Change this environment variables to point to production variables
const pb = new PocketBase(import.meta.env.VITE_PB_LOCAL_URL);

export const createAdminClient = async () => {
	await pb.admins.authWithPassword(
		import.meta.env.VITE_AUTH_ADMIN_EMAIL,
		import.meta.env.VITE_AUTH_ADMIN_PASS,
		{
			autoRefreshThreshold: 30 * 60
		}
	);
	pb.autoCancellation(false);
	return pb;
};
