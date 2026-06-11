import { ROLES } from '../utils/role'

export default defineNuxtRouteMiddleware((to) => {
	const { user } = useAuth();

	if (user.value && user.value.role === ROLES.ADMIN) {
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
