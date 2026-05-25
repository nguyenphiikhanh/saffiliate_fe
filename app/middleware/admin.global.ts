import { authClient } from '~/utils/auth-client'
import { ROLES } from '../utils/role'

export default defineNuxtRouteMiddleware(async (to) => {
	const { data: session } = await authClient.useSession(useFetch);

	if (session.value && session.value.user?.role === ROLES.ADMIN) {
		// Logged in as Admin: Only allow access to admin routes
		if (!to.path.startsWith('/admin')) {
			return navigateTo('/admin');
		}
	} else {
		// Regular user or Guest: Block access to admin routes
		if (to.path.startsWith('/admin')) {
			return navigateTo('/');
		}
	}
});
