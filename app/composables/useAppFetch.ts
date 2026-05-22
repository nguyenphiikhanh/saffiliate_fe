export function useAppFetch() {
  const config = useRuntimeConfig();

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
    onResponse({ request, response, options }) {
      response._data = response._data.data;
    },
    onResponseError({ request, response, options }) {
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
