export const getFriendlyErrorMessage = (error: any, defaultMessage: string = "Đã có lỗi xảy ra, vui lòng thử lại sau."): string => {
  const errString = typeof error === "string" ? error : String(error?.message || error);
  
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
