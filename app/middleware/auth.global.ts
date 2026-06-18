export default defineNuxtRouteMiddleware(async (to) => {
	const { token, user, fetchUser, isAdmin } = useAuth();

	// 1. Phục hồi thông tin người dùng nếu có token (khi reload F5 hoặc chuyển trang để giữ session mới nhất)
	if (token.value) {
		await fetchUser();
	}

	// Danh sách các route phục vụ đăng nhập
	const authRoutes = ['/dang-nhap', '/login'];
	const isAuthRoute = authRoutes.includes(to.path);

	// 2. Nếu đã đăng nhập
	if (token.value) {
		// Cố gắng truy cập trang đăng nhập -> đưa về trang chủ thích hợp
		if (isAuthRoute) {
			return navigateTo(isAdmin.value ? '/admin' : '/');
		}

		// Nếu là Admin nhưng truy cập trang của User -> đưa về trang admin
		if (isAdmin.value && !to.path.startsWith('/admin')) {
			return navigateTo('/admin');
		}

		// Nếu là User thường nhưng cố truy cập trang Admin -> đưa về trang chủ '/'
		if (!isAdmin.value && to.path.startsWith('/admin')) {
			return navigateTo('/');
		}
	} else {
		// 3. Nếu chưa đăng nhập mà truy cập các trang khác -> đưa về trang đăng nhập
		if (!isAuthRoute) {
			return navigateTo('/dang-nhap');
		}
	}
});
