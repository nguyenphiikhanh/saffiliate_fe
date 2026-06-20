export const getFriendlyErrorMessage = (error: any, defaultMessage: string = "Đã có lỗi xảy ra, vui lòng thử lại sau."): string => {
  const errString = typeof error === "string" ? error : String(error?.message || error || "");
  const status = error?.status || 500;

  // Lỗi xác thực hoặc đăng nhập (Auth / Google Login / User)
  if (
    errString.includes('/auth/google') || 
    errString.includes('xác thực') || 
    errString.includes('OAuth') || 
    errString.includes('Google') || 
    errString.includes('token') ||
    errString.includes('auth')
  ) {
    if (status === 500 || errString.includes('500') || errString.includes('Internal Server Error') || errString.includes('Failed to fetch')) {
      return "Hệ thống xác thực gặp sự cố hoặc không thể kết nối tới máy chủ. Vui lòng thử lại sau ít phút!";
    }
    if (status === 401 || errString.includes('401') || errString.includes('Unauthorized')) {
      return "Xác thực không thành công. Tài khoản của bạn không được phép truy cập hoặc phiên đăng nhập đã hết hạn.";
    }
    if (status === 400 || errString.includes('400') || errString.includes('invalid_request')) {
      return "Yêu cầu xác thực không hợp lệ. Vui lòng đăng nhập lại hoặc thử bằng trình duyệt khác.";
    }
  }

  // Xử lý các lỗi mạng hoặc lỗi hệ thống từ fetch/axios khi convert link
  if (
    errString.toLowerCase().includes('internal server error') ||
    errString.includes('/link/convert') ||
    errString.includes('Failed to fetch') ||
    errString.includes('<no response>') ||
    errString.includes('Network Error')
  ) {
    if (errString.includes('/link/convert')) {
      return "Đã xảy ra lỗi, vui lòng thử lại hoặc sử dụng link sản phẩm khác";
    }
    return "Đã xảy ra lỗi kết nối, vui lòng thử lại sau.";
  }

  if (errString.includes('500') || errString.includes('Internal Server Error')) {
    return "Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.";
  }

  return defaultMessage;
};
