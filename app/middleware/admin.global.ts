export default defineNuxtRouteMiddleware((to) => {
	const { isAdmin } = useAuth();

	if (isAdmin.value) {
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
