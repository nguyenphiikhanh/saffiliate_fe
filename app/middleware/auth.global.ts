export default defineNuxtRouteMiddleware(async (to) => {
	const { token, user, fetchUser } = useAuth();

	// 1. Phục hồi thông tin người dùng nếu có token nhưng chưa có state user (khi reload F5)
	if (token.value && !user.value) {
		await fetchUser();
	}

	// Danh sách các route phục vụ đăng nhập
	const authRoutes = ['/dang-nhap', '/login'];
	const isAuthRoute = authRoutes.includes(to.path);

	// 2. Nếu đã đăng nhập mà cố gắng truy cập trang đăng nhập -> đưa về trang chủ '/'
	if (token.value && isAuthRoute) {
		return navigateTo('/');
	}

	// 3. Nếu chưa đăng nhập mà truy cập các trang khác -> đưa về trang đăng nhập
	if (!token.value && !isAuthRoute) {
		return navigateTo('/dang-nhap');
	}
});
