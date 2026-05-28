import { ref } from "vue";
import { useAppFetch } from "@/composables/useAppFetch";

interface ProductInfo {
  itemId: number;
  productName: string;
  shopName: string;
  price: number;
  sales: number;
  imageUrl: string;
  productLink: string;
  rating: string;
  commission: number;
  sellerComFinal: number;
  shopeeComFinal: number;
  isXtra: boolean;
  hasSellerCommission: boolean;
  hasShopeeCommission: boolean;
  isCapped: boolean;
  isLimitCap: boolean;
  cap: number;
  capRaw: number;
  capAfterRate: number;
  lastUpdate: string;
  dataSource: string;
  priceStats?: {
    currentPrice: number;
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
    priceChange7d: number;
    priceChange30d: number;
    lastPriceUpdate: string;
    lowestPriceDate: string | null;
    highestPriceDate: string | null;
  };
  latestPriceHistory?: {
    price: number;
    originalPrice: number;
    discountPercent: number;
    currency: string;
    flashSale: boolean;
    promotionId: string | null;
    stockAvailable: number;
    recordedDate: string;
    recordedTime: string;
  };
  commission_min_rate?: number;
  commission_max_rate?: number;
}

interface ConvertResponse {
  success?: boolean;
  shortLink?: string;
  affiliateLink?: string;
  data?: {
    shortLink?: string;
  };
  productInfo?: ProductInfo;
  message?: string;
}

export function useShopeeApi() {
  const resultLink = ref<string>("");
  const affiliateLink = ref<string>("");
  const productInfo = ref<ProductInfo | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Validation function for Shopee link formats
  const validateShopeeUrl = (url: string): boolean => {
    if (!url || url.trim() === "") return false;

    // Check if it's a valid URL structure or a Shopee short link pattern
    const shopeeRegex = /(shopee\.vn|shp\.ee|shope\.ee|shopee\.co\.id|shopee\.sg)/i;

    return shopeeRegex.test(url);
  };

  // Validation function for TikTok link formats
  const validateTiktokUrl = (url: string): boolean => {
    if (!url || url.trim() === "") return false;

    // Check if it's a valid TikTok domain pattern
    const tiktokRegex = /(tiktok\.com|vt\.tiktok\.com|v\.tiktok\.com)/i;

    return tiktokRegex.test(url);
  };

  const convertUrl = async (rawUrl: string, type?: number) => {
    // Reset states
    resultLink.value = "";
    affiliateLink.value = "";
    error.value = null;

    const trimmedUrl = rawUrl.trim();

    // Validate link based on platform type
    if (type === 2) {
      if (!validateTiktokUrl(trimmedUrl)) {
        error.value = "Vui lòng nhập đường dẫn TikTok hợp lệ! (Ví dụ: tiktok.com/... hoặc vt.tiktok.com/...)";
        return false;
      }
    } else {
      if (!validateShopeeUrl(trimmedUrl)) {
        error.value = "Vui lòng nhập đường dẫn Shopee hợp lệ! (Ví dụ: shopee.vn/... hoặc shp.ee/...)";
        return false;
      }
    }

    isLoading.value = true;

    try {
      const { api } = useAppFetch();

      // Formulate request payload
      const payload: Record<string, any> = {
        originalLink: trimmedUrl,
      };

      // Only send type if it's not Shopee (type 1) or is explicitly requested (TikTok type 2)
      if (type && type !== 1) {
        payload.type = type;
      }

      // Call Elysia API via Axios instance (relative path triggers Nitro proxy to bypass CORS)
      const response = await api.post<ConvertResponse>("/convert", payload);

      const responseData = response.data;

      // Flexible extraction to handle various response structures
      const extractedShortLink = responseData.shortLink || responseData.data?.shortLink;
      const extractedLongLink = responseData.affiliateLink;

      if (extractedShortLink || extractedLongLink) {
        resultLink.value = extractedShortLink || extractedLongLink || "";
        affiliateLink.value = extractedLongLink || extractedShortLink || "";
        productInfo.value = responseData.productInfo || null;
        return true;
      } else {
        throw new Error(responseData.message || "Không thể lấy được link từ máy chủ.");
      }
    } catch (err: any) {
      console.error("API error:", err);
      
      let errMsg = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau!";
      
      if (err?.response) {
        const status = err.response.status;
        const responseData = err.response.data;
        
        if (status === 500) {
          errMsg = "Hệ thống đang gặp sự cố nhỏ khi xử lý liên kết này. Bạn vui lòng kiểm tra lại đường dẫn sản phẩm hoặc thử lại sau ít phút nhé!";
        } else if (status === 404) {
          errMsg = "Không tìm thấy máy chủ xử lý quy đổi. Vui lòng liên hệ quản trị viên!";
        } else if (status === 400 || status === 422) {
          errMsg = responseData?.message || "Đường dẫn sản phẩm không hợp lệ hoặc không được hỗ trợ.";
        } else {
          errMsg = responseData?.message || err.message || "Đã xảy ra lỗi không xác định trong quá trình xử lý.";
        }
      } else if (err?.message) {
        if (err.message.includes("Network Error")) {
          errMsg = "Không thể kết nối mạng. Vui lòng kiểm tra lại đường truyền internet!";
        } else if (err.message === "Internal Server Error" || err.message.includes("500")) {
          errMsg = "Hệ thống đang gặp sự cố nhỏ khi xử lý liên kết này. Bạn vui lòng kiểm tra lại đường dẫn sản phẩm hoặc thử lại sau ít phút nhé!";
        } else {
          errMsg = err.message;
        }
      }
      
      error.value = `Lỗi chuyển đổi: ${errMsg}`;
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const clearStates = () => {
    resultLink.value = "";
    affiliateLink.value = "";
    productInfo.value = null;
    error.value = null;
    isLoading.value = false;
  };

  return {
    resultLink,
    affiliateLink,
    productInfo,
    isLoading,
    error,
    convertUrl,
    clearStates,
    validateShopeeUrl,
    validateTiktokUrl,
  };
}
