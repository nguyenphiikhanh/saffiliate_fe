export const getFriendlyErrorMessage = (error: any, defaultMessage: string = "Đã có lỗi xảy ra, vui lòng thử lại sau."): string => {
  const errString = typeof error === "string" ? error : String(error?.message || error);
  const status = error?.status || 500;

  // Lỗi xác thực hoặc đăng nhập (Auth / Google Login / User)
  if (errString.includes('/auth/google') || errString.includes('xác thực') || errString.includes('OAuth') || errString.includes('Google') || errString.includes('token')) {
    if (status === 500 || errString.includes('500') || errString.includes('Internal Server Error')) {
      return "Hệ thống xác thực đang bảo trì hoặc gặp sự cố đồng bộ với Google. Vui lòng thử lại sau ít phút nhé!";
    }
    if (status === 401 || errString.includes('401') || errString.includes('Unauthorized')) {
      return "Xác thực không thành công. Tài khoản của bạn không được phép truy cập hoặc token đã hết hạn.";
    }
    if (status === 400 || errString.includes('400') || errString.includes('invalid_request')) {
      return "Yêu cầu xác thực không hợp lệ. Vui lòng thử đăng nhập lại từ đầu hoặc đổi trình duyệt.";
    }
  }

  // Xử lý các lỗi mạng cơ bản từ fetch/axios
  if (
    errString.includes('/convert') || 
    errString.includes('Failed to fetch') || 
    errString.includes('<no response>') ||
    errString.includes('Network Error')
  ) {
    return "Có lỗi khi chuyển đổi link, vui lòng kiểm tra lại link hoặc thử lại.";
  }
  
  if (errString.includes('500') || errString.includes('Internal Server Error')) {
    return "Hệ thống đang gặp sự cố nhỏ. Bạn vui lòng kiểm tra lại đường dẫn sản phẩm hoặc thử lại sau ít phút nhé!";
  }

  return defaultMessage;
};
