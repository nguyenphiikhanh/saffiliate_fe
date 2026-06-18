import { usePromiseTracker } from "./usePromiseTracker";

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

export function useAppFetch() {
  const config = useRuntimeConfig();
  const { startLoading, stopLoading } = usePromiseTracker();

  // On the browser (client-side), we use '/api' to trigger Nuxt's Nitro dev proxy, bypassing CORS.
  // On the server-side (SSR), we call the backend API directly using public runtime configs.
  const baseURL = process.client ? "/api" : config.public.apiBase;

  const fetcher = $fetch.create({
    baseURL,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    onRequest({ options }) {
      const token = useCookie("auth_token").value;
      const headers = new Headers(options.headers || {});
      headers.set('Accept', 'application/json');
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      options.headers = headers;

      if (process.client) startLoading();
    },
    onRequestError() {
      if (process.client) stopLoading();
    },
    onResponse({ request, response, options }) {
      if (process.client) stopLoading();
      if (response._data && typeof response._data === 'object' && 'data' in response._data) {
        response._data = response._data.data;
      }
    },
    onResponseError({ request, response, options }) {
      if (process.client) stopLoading();

      if (response.status === 401) {
        const tokenCookie = useCookie("auth_token");
        tokenCookie.value = null;
        if (process.client) {
          window.location.href = "/dang-nhap";
        }
      }

      const parsedError = {
        message: response._data?.message || response.statusText || "Kết nối mạng hoặc API gặp sự cố.",
        status: response.status || 500,
        data: response._data || null,
      };
      return Promise.reject(parsedError);
    }
  });

  // Mock axios-like interface using Nuxt's built-in $fetch 
  // This is required because 'axios' breaks Cloudflare Workers/Pages edge runtime
  const api = {
    get: <T = any>(url: string, opts?: any) => fetcher<T>(url, { ...opts, method: 'GET' }).then(data => ({ data })),
    post: <T = any>(url: string, body?: any, opts?: any) => fetcher<T>(url, { ...opts, method: 'POST', body }).then(data => ({ data })),
    put: <T = any>(url: string, body?: any, opts?: any) => fetcher<T>(url, { ...opts, method: 'PUT', body }).then(data => ({ data })),
    delete: <T = any>(url: string, opts?: any) => fetcher<T>(url, { ...opts, method: 'DELETE' }).then(data => ({ data })),
    // Interceptors mockup if needed elsewhere
    interceptors: {
      request: { use: () => { } },
      response: { use: () => { } }
    }
  };

  return {
    api,
    baseURL,
  };
}
